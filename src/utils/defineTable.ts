import {timestampToTime} from "./timestampToTime";
import {IUser, User} from "../models/User";
import {ITicket, Ticket} from "../models/ticket";
import {readTicketController} from "../controllers/ticketController/readTicketController";
import {ReadSentTicketController} from "../controllers/ticketController/readSentTicketController";
import {CustomRequestMyTokenInJwt} from "../middleware/verifyJWT";
import mongoose from "mongoose";

interface myObject {
    req: CustomRequestMyTokenInJwt;
    conditionString: string;
    ticketUserId: mongoose.Types.ObjectId | null | '';

}

export const defineTable = async ({req, conditionString, ticketUserId}: myObject) => {


    // اینجا قراره بعدا 10 تا 10 تا درخواست بزنم بگم هر ده تا یه بار درخواست بزن
    const {startIndex, endIndex} = req.params;

    let ticketList: ITicket[];
    if (!startIndex || !endIndex) {
        ticketList = await Ticket.find({}).lean()
    } else {
        ticketList = await Ticket.find({}).lean()
    }


    let myList = await Promise.all(ticketList.map(async (singleTicket) => {
        const row: any = {...singleTicket};
        const userFound: IUser = (await User.findOne({_id: row.userId}).lean())!;
        row['userCreateThisOrder'] = userFound.name
        row['numberOfAttachments'] = row.attachments.length
        row['dateCreate'] = timestampToTime(row.createAt)
        row['lastChangeTime'] = timestampToTime(row.lastChangeTimeStamp)
        return row;
    }));

    let myFilteredList = []
    if (conditionString === 'readTicketController') {
        myFilteredList = [...myList]
    } else if (conditionString === 'ReadSentTicketController') {
        myFilteredList = myList.filter(singleTicket => singleTicket.userId === ticketUserId)
    } else if (conditionString === 'readTicketController') {

    }


    const columnDefs = []

    columnDefs.push({minWidth: 150, headerName: "کد سفارش", field: "ticketNumber"})
    columnDefs.push({minWidth: 150, headerName: "عنوان سفارش", field: "title"})
    columnDefs.push({minWidth: 150, headerName: "توضیح", field: "description"})
    columnDefs.push({minWidth: 150, headerName: "تاریخ ثبت ", field: "dateCreate"})
    columnDefs.push({minWidth: 150, headerName: "تاریخ آخرین تغییر ", field: "lastChangeDate"})
    columnDefs.push({minWidth: 150, headerName: "کاربر ثبت کننده سفارش", field: "userCreateThisOrder"})
    columnDefs.push({minWidth: 150, headerName: "تعداد فایل ضمیمه ", field: "numberOfAttachments"})


    const rowData = [...myFilteredList]

    return {columnDefs, rowData}

}