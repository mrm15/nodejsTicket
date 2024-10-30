import {IUser, User} from "../models/User";
import {ITicket, Ticket} from "../models/ticket";
import mongoose from "mongoose";
import {Department, IDepartment} from "../models/department";

interface myObject {
    userId: mongoose.Schema.Types.ObjectId;
}

export const userTicketTable = async ({userId}: myObject) => {


    // get userTicket List from user Model
    const foundUser: IUser | null = await User.findOne({_id: userId}).lean()
    let userTicketArray: any | undefined | [] = foundUser?.tickets
    if (!userTicketArray) {
        userTicketArray = []
    }


    console.log("userTicketArray:", userTicketArray);

    const myList = await Promise.all(userTicketArray.map(async (singleRow: any) => {
        try {
            const foundTicket: ITicket | null = await Ticket.findOne({_id: singleRow.ticketId}).lean();


            if (foundTicket) {
                const lastDepartmentAssigned: IDepartment | null = await Department.findOne({_id: foundTicket?._id});
                const lastUserAssigned: ITicket | null = await Ticket.findOne({_id: foundTicket?._id});

                const row: any = {...foundTicket};
                row['lastDepartmentAssigned'] = lastDepartmentAssigned ? lastDepartmentAssigned?.name : '';
                row['lastUserAssigned'] = lastUserAssigned ? lastUserAssigned.title : '';

                return row;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error fetching ticket:", error);
            return null;
        }
    }));


    const columnDefs = []

    columnDefs.push({minWidth: 150, headerName: "کد سفارش", field: "ticketNumber"})
    columnDefs.push({minWidth: 150, headerName: "عنوان سفارش", field: "title"})
    columnDefs.push({minWidth: 150, headerName: "آخرین دپارتمان", field: "lastDepartmentAssigned"})
    columnDefs.push({minWidth: 150, headerName: "آخرین کاربر", field: "lastUserAssigned"})
    columnDefs.push({minWidth: 150, headerName: "تاریخ ثبت ", field: "dateCreate"})
    columnDefs.push({minWidth: 150, headerName: "تاریخ آخرین تغییر ", field: "lastChangeDate"})
    columnDefs.push({minWidth: 150, headerName: "کاربر ثبت کننده سفارش", field: "userCreateThisOrder"})
    columnDefs.push({minWidth: 150, headerName: "تعداد فایل ضمیمه ", field: "numberOfAttachments"})


    const rowData = [...myList.reverse()]

    return {columnDefs, rowData}

}