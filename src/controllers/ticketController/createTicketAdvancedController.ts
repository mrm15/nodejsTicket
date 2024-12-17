import {Request, Response, NextFunction} from 'express';
import {validateTicketData} from "./createTicketAdvanced/ticketValidation";
import {checkUserAccess} from "./createTicketAdvanced/checkAccess";
import getUserByPhoneNumber from "../../utils/functions/getUserByPhoneNumber";
import {createNewTicket} from "./createTicketAdvanced/createNewTicket";
import {addTicketReply} from "./createTicketAdvanced/addTicketReply";
import {sendOrderSMS} from "./createTicketAdvanced/sendOrderSMS";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";


const createTicketAdvancedController = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { myToken } = req;
        const ticketData = req.body;

        // اعتبارسنجی داده‌های ورودی
        const validationMessage = validateTicketData(ticketData);
        if (validationMessage) {
            return res.status(409).json({ message: validationMessage });
        }

        // بررسی مجوز دسترسی
        const arrayListToCheck = [ACCESS_LIST.TICKET_CREATE_ADVANCED]
        const hasAccess = await checkUserAccess(myToken.phoneNumber, arrayListToCheck);
        if (!hasAccess) {
            return res.status(403).json({ message: 'شما مجوز دسترسی به این بخش را ندارید.' });
        }

        // ایجاد تیکت
        const senderInfo = await getUserByPhoneNumber(myToken.phoneNumber);
        const status = "در انتظار بررسی"; // تنظیمات اولیه
        const ticket = await createNewTicket(senderInfo, ticketData, status, null, null);

        // افزودن ریپلای اولیه
        await addTicketReply(ticket._id, senderInfo, ticketData.firstReplyMessage);

        // ارسال پیامک
        sendOrderSMS(senderInfo.phoneNumber, myToken.UserInfo.userData.userData.name, ticket.title, ticket.ticketNumber);

        return res.status(200).json({ message: "تیکت با موفقیت ثبت شد", data: ticket });

    } catch (error:any) {
        return res.status(500).json({ message: error.toString() });
    }
};

export { createTicketAdvancedController };
