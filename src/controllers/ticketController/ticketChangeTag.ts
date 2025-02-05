import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {addLog} from "../../utils/logMethods/addLog";
import {changeTicketStatus} from "../../utils/ticketUtils/changeTicketStatus/changeTicketStatus";
import mongoose from "mongoose";
import {ITicket, Ticket} from "../../models/ticket";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";

const ticketChangeTag = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;

    if (!myToken) {
        return res.status(403).json({message: 'مقدار توکن توی ری کوئست موجود نیست'});
    }

    try {
        const arrayListToCheck = [ACCESS_LIST.setMessageTagOnRepliesInChat];
        const hasAccessTo = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck});
        if (!hasAccessTo) {
            return res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
        }

        const {id, tagId} = req.body;

        // Validate input data
        if (!id) {
            return res.status(400).json({message: 'ticketId  باید وارد شود.'});
        }

        // Validate that the statusId is a valid ObjectId
        if (tagId!==null && !mongoose.Types.ObjectId.isValid(tagId)) {
            return res.status(400).json({message: 'فرمت statusId نامعتبر است.'});
        }

        // Find the ticket by its ID
        const foundTicket: ITicket | null = await Ticket.findById(id);

        if (!foundTicket) {
            return res.status(404).json({message: 'تیکت پیدا نشد.'});
        }

        // Assign the valid ObjectId to messageTag
        foundTicket.messageTag = tagId!==null ? (new mongoose.Types.ObjectId(tagId) as any) : null;

        await foundTicket.save();

        return res.status(200).json({
            message: 'انجام شد.',
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'خطا در پردازش درخواست',
            error,
        });
    }


};

export {ticketChangeTag};
