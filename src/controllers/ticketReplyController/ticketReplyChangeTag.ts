import {Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {ITicket, Ticket} from "../../models/ticket";
import mongoose from "mongoose";
import {TicketReply} from "../../models/ticketReply";

const ticketReplyChangeTag = async (req: CustomRequestMyTokenInJwt, res: Response) => {
    const { myToken } = req;

    if (!myToken) {
        return res.status(403).json({ message: 'مقدار توکن توی ری کوئست موجود نیست' });
    }

    try {
        const arrayListToCheck = [ACCESS_LIST.setMessageTagOnRepliesInChat];
        const hasAccessTo = await checkAccessList({ phoneNumber: myToken.phoneNumber, arrayListToCheck });
        if (!hasAccessTo) {
            return res.status(403).json({ message: 'شما مجوز دسترسی به این بخش را ندارید.' });
        }

        const { ticketId, statusId } = req.body;

        // Validate input data
        if (!ticketId || !statusId) {
            return res.status(400).json({ message: 'ticketId و statusId باید وارد شوند.' });
        }


        // Validate that the statusId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(statusId)) {
            return res.status(400).json({ message: 'فرمت statusId نامعتبر است.' });
        }

        // Find the ticket by its ID
        const foundTicket: ITicket | null = await TicketReply.findById(ticketId);

        if (!foundTicket) {
            return res.status(404).json({ message: 'تیکت پیدا نشد.' });
        }

        // Assign the valid ObjectId to messageTag
        foundTicket.messageTag = new mongoose.Schema.Types.ObjectId(statusId);

        await foundTicket.save();

        return res.status(200).json({
            message: 'انجام شد.',
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'خطا در پردازش درخواست' });
    }
};


export {ticketReplyChangeTag};
