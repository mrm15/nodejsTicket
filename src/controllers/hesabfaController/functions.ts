import {IInitialBillResponse} from "../utility/initialBillResponse";
import {ITicket, Ticket} from "../../models/ticket";
import {ITicketReply, TicketReply} from "../../models/ticketReply";


interface IBillRes {
    Number: string;
    Status: number
}

export const saveFactorNumberAndStatus = async (billRes: IBillRes, billData: IInitialBillResponse) => {

    debugger
    let foundTicket: ITicket | ITicketReply | null;
    if (billData.billType === "ticket") {
        foundTicket = await Ticket.findOne({_id: billData.ticketId}).exec()
    } else {
        foundTicket = await TicketReply.findOne({_id: billData.id}).exec()
    }
    if (foundTicket) {
        foundTicket.billNumber = billRes.Number
        foundTicket.billStatus = billRes.Status
        await foundTicket.save()
    }
}