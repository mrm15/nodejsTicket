import {ITicket, Ticket} from "../models/ticket";
import mongoose from "mongoose";
import {Department, IDepartment} from "../models/department";
import {IUser, User} from "../models/User";

interface myInterface {
    id: mongoose.Schema.Types.ObjectId
}

export const getDepartmentTicketList = async ({id}: myInterface) => {
    const ticketList: ITicket[] | null = await Ticket.find({assignedToDepartmentId: id}).lean();


    let lastDepartmentAssigned = ''
// چون همه ی این دپارتمان ها یکی هستند من اسم اولی رو میگیرم
    if (ticketList) {
        const foundDepartment: IDepartment | null = await Department.findOne({_id: id}).lean()
        lastDepartmentAssigned = foundDepartment ? foundDepartment.name : ''
    }

    let myList = [];
    if(ticketList!== null && ticketList.length > 0) {
        myList = await Promise.all(ticketList.map(async (singleTicket) => {
            const row: any = {...singleTicket}
            row['lastDepartmentAssigned'] = lastDepartmentAssigned
            const lastUserAssigned: IUser | null = await User.findOne({_id: singleTicket.firstUserId})
            row['lastUserAssigned'] = lastUserAssigned ? lastUserAssigned.name : ''
            return row
        }));
    }



    return myList || []
}

export const departmentTickets = async (id: myInterface) => {

    const rowData = await getDepartmentTicketList(id)

    const columnDefs = []

    columnDefs.push({minWidth: 150, headerName: "کد سفارش", field: "ticketNumber"})
    columnDefs.push({minWidth: 150, headerName: "عنوان سفارش", field: "title"})
    columnDefs.push({minWidth: 150, headerName: "آخرین دپارتمان", field: "lastDepartmentAssigned"})
    columnDefs.push({minWidth: 150, headerName: "آخرین کاربر", field: "lastUserAssigned"})
    columnDefs.push({minWidth: 150, headerName: "توضیح", field: "description"})
    columnDefs.push({minWidth: 150, headerName: "تاریخ ثبت ", field: "dateCreate"})
    columnDefs.push({minWidth: 150, headerName: "تاریخ آخرین تغییر ", field: "lastChangeDate"})
    columnDefs.push({minWidth: 150, headerName: "کاربر ثبت کننده سفارش", field: "userCreateThisOrder"})
    columnDefs.push({minWidth: 150, headerName: "تعداد فایل ضمیمه ", field: "numberOfAttachments"})


    const list = {columnDefs, rowData}

    return list


}



