import {ITicket, Ticket} from "../models/ticket";
import mongoose from "mongoose";

interface myInterface {
    id: mongoose.Schema.Types.ObjectId
}

export const getDepartmentTicketList = async ({id}: myInterface) => {
    const ticketList: ITicket[] | null = await Ticket.find({_id: id}).lean()
    return ticketList || []
}

