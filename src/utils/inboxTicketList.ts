import { userTicketTable } from "./userTicketTable";
import { ITicket } from "../models/ticket";
import { getDepartmentTicketList } from "./getDepartmentTicketList";
import { IUser, User } from "../models/User";
import mongoose from "mongoose";

interface myInterface {
    userId: mongoose.Schema.Types.ObjectId;
}

export const inboxTicketList = async ({ userId }: myInterface) => {
    const list = await userTicketTable({ userId });
    const rowDataTemp: ITicket[] = list.rowData;

    const foundUser: IUser | null = await User.findOne({ _id: userId });

    let departmentTicketList: ITicket[] | null | [] = [];
    if (foundUser?.departmentId) {
        departmentTicketList = await getDepartmentTicketList({ id: foundUser?.departmentId });
    }



    const inboxTickets: ITicket[] = [];

    departmentTicketList.forEach(singleTicketInDepartment => {
        if (rowDataTemp.includes(singleTicketInDepartment)) {
            inboxTickets.push(singleTicketInDepartment);
        }
    });


    const columnDefs = []

    columnDefs.push({minWidth: 150, headerName: "کد سفارش", field: "ticketNumber"})
    columnDefs.push({minWidth: 150, headerName: "عنوان سفارش", field: "title"})
    columnDefs.push({minWidth: 150, headerName: "توضیح", field: "description"})
    columnDefs.push({minWidth: 150, headerName: "تاریخ ثبت ", field: "dateCreate"})
    columnDefs.push({minWidth: 150, headerName: "تاریخ آخرین تغییر ", field: "lastChangeDate"})
    columnDefs.push({minWidth: 150, headerName: "کاربر ثبت کننده سفارش", field: "userCreateThisOrder"})
    columnDefs.push({minWidth: 150, headerName: "تعداد فایل ضمیمه ", field: "numberOfAttachments"})


    const rowData = [...inboxTickets]

    return {columnDefs, rowData}


};
