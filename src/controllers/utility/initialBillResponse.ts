import mongoose from "mongoose";

export interface IInitialBillResponse {
    ticketNumber:number;
    billType: "ticket" | "ticketReply" | '';
    id: string;
    ticketId: string;
    title: string,
    billNumber: number | string;
    contactCode: string,
    contactName: string,
    note: string,
    tag: string,
}