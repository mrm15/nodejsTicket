import {IInitialBillResponse} from "../utility/initialBillResponse";
import {ITicket, Ticket} from "../../models/ticket";
import {ITicketReply, TicketReply} from "../../models/ticketReply";
import mongoose from "mongoose";


interface IBillRes {
    Number: string;
    Status: number
}

export const saveFactorNumberAndStatus = async (billRes: IBillRes, billData: IInitialBillResponse) => {
    let foundTicket: ITicket | ITicketReply | null;
    if (billData.billType === "ticket") {
        foundTicket = await Ticket.findOne({_id: billData.ticketId}).exec()
    } else {
        foundTicket = await TicketReply.findOne({_id: billData.id}).exec()
    }
    if (foundTicket) {
        foundTicket.billNumber = billRes.Number
        foundTicket.billStatus = billRes.Status
        try {
            await foundTicket.save()
            return true
        } catch (error) {
            return false
        }
    }
}
export const deleteOneBillFromTicketOrTicketReply = async ({id, type}: any) => {
    let foundTicket: ITicket | ITicketReply | null;
    if (type === "ticket") {
        foundTicket = await Ticket.findOne({_id: id}).exec()
    } else {
        foundTicket = await TicketReply.findOne({_id: id}).exec()
    }
    try {
        if (foundTicket) {
            foundTicket.billNumber = null
            foundTicket.billStatus = null
            await foundTicket.save()
            return true;
        }
    } catch (error) {
        return false
    }
}


export const forwardTicketAfterVerify = async ({depId, billData}: {
    depId: any,
    billData: IInitialBillResponse
}) => {
    debugger
    if (!depId) {

    }
    if (!billData) {

    }
    if (depId && billData) {

        debugger
        const ticketFound: ITicket = (await Ticket.findOne({_id: billData.ticketId}).exec())!;
        ticketFound.assignedToDepartmentId = depId;
        await ticketFound.save();


    }

}