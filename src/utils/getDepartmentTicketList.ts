import {ITicket, Ticket} from "../models/ticket";
import mongoose from "mongoose";

interface myInterface {
    id: mongoose.Schema.Types.ObjectId
}

export const getDepartmentTicketList = async ({id}: myInterface) => {
    const ticketList: ITicket[] | null = await Ticket.find({_id: id}).lean()
    return ticketList || []
}

export const departmentTickets = async (id: myInterface) => {

    const rowData = await getDepartmentTicketList(id)

    const columnDefs = []

    columnDefs.push({minWidth: 150, headerName: "کد سفارش", field: "ticketNumber"})
    columnDefs.push({minWidth: 150, headerName: "عنوان سفارش", field: "title"})
    columnDefs.push({minWidth: 150, headerName: "توضیح", field: "description"})
    columnDefs.push({minWidth: 150, headerName: "تاریخ ثبت ", field: "dateCreate"})
    columnDefs.push({minWidth: 150, headerName: "تاریخ آخرین تغییر ", field: "lastChangeDate"})
    columnDefs.push({minWidth: 150, headerName: "کاربر ثبت کننده سفارش", field: "userCreateThisOrder"})
    columnDefs.push({minWidth: 150, headerName: "تعداد فایل ضمیمه ", field: "numberOfAttachments"})


    const list = {columnDefs, rowData}

    return list


}



