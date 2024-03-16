import {IUser, User} from "../models/User";
import {ITicket, Ticket} from "../models/ticket";
import mongoose from "mongoose";
import {Department, IDepartment} from "../models/department";

interface myObject {
    userId: mongoose.Schema.Types.ObjectId;
}

export const userTicketTable = async ({userId}: myObject) => {

    let myList: ITicket[] | [] = []
    // get userTicket List from user Model
    const foundUser: IUser | null = await User.findOne({userId: userId}).lean()
    let userTicketArray: mongoose.Schema.Types.ObjectId[] | undefined | [] = foundUser?.tickets
    if (!userTicketArray) {
        userTicketArray = []
    }


    myList = await Promise.all(userTicketArray?.map(async (ticketId) => {

        const foundTicket: ITicket = (await Ticket.findOne({_id: ticketId}).lean())!;

        const row: any = {...foundTicket}

        const lastDepartmentAssigned: IDepartment | null = await Department.findOne({_id: foundTicket.assignedToDepartmentId})
        row['lastDepartmentAssigned'] = lastDepartmentAssigned ? lastDepartmentAssigned?.name : ''

        const lastUserAssigned: IDepartment | null = await Department.findOne({_id: foundTicket.assignToUserId})
        row['lastUserAssigned'] = lastUserAssigned ? lastUserAssigned.name : ''

        return row
    }))


    const columnDefs = []

    columnDefs.push({minWidth: 150, headerName: "کد سفارش", field: "ticketNumber"})
    columnDefs.push({minWidth: 150, headerName: "عنوان سفارش", field: "title"})
    columnDefs.push({minWidth: 150, headerName: "آخرین دپارتمان", field: "lastDepartmentAssigned"})
    columnDefs.push({minWidth: 150, headerName: "آخرین کاربر", field: "lastUserAssigned"})
    columnDefs.push({minWidth: 150, headerName: "تاریخ ثبت ", field: "dateCreate"})
    columnDefs.push({minWidth: 150, headerName: "تاریخ آخرین تغییر ", field: "lastChangeDate"})
    columnDefs.push({minWidth: 150, headerName: "کاربر ثبت کننده سفارش", field: "userCreateThisOrder"})
    columnDefs.push({minWidth: 150, headerName: "تعداد فایل ضمیمه ", field: "numberOfAttachments"})


    const rowData = [...myList]

    return {columnDefs, rowData}

}