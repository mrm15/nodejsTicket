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
    const rowData: ITicket[] = list.rowData;

    const foundUser: IUser | null = await User.findOne({ _id: userId });

    let departmentTicketList: ITicket[] | null | [] = [];
    if (foundUser?.departmentId) {
        departmentTicketList = await getDepartmentTicketList({ id: foundUser?.departmentId });
    }

    // Convert to array
    const inboxTickets: ITicket[] = [];

    departmentTicketList.forEach(singleTicketInDepartment => {
        if (rowData.includes(singleTicketInDepartment)) {
            inboxTickets.push(singleTicketInDepartment);
        }
    });

    return inboxTickets;
};
