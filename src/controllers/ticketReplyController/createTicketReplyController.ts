import {Request, Response, NextFunction} from 'express';

import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";

import {ITicketReply, TicketReply} from "../../models/ticketReply";
import {getCurrentTimeStamp} from "../../utils/timing";
import {ITicket, Ticket} from "../../models/ticket";
import {IUser, User} from "../../models/User";
import {Department} from "../../models/department";
import {generateRefreshToken} from "../LoginRegisterSms/generateAccessToken";
import {uuidGenerator} from "../../utils/uuidGenerator";


const createTicketReplyController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    let {
        ticketNumber,
        description,
        visibleToUser,
        attachments,
    } = req.body;


    if (!visibleToUser) {

        visibleToUser = true
    }


    if (!ticketNumber) {
        res.status(500).json({
            message: 'شماره تیکت  در ریکوئست موجود نیست',
        });
        return
    }


    if (!description) {
        res.status(500).json({
            message: 'مقدار توضیحات نمیتواند خالی باشد  ',
        });
        return
    }
    if (!attachments) {
        attachments = []
    }


    const ticketId = (((await Ticket.findOne({ticketNumber: ticketNumber}).exec())!)['_id']);

    const userId = myToken?.UserInfo?.userData?.userData?.userId


    if (!userId) {
        res.status(500).json({
            message: 'مقدار userId نمیتواند خالی باشد  ',
        });
        return
    }

    //  دپارتمان فعلی که کاربر توش عضو هست رو وارد میکنم
    const foundUser: IUser | null = await User.findOne({_id: userId}).lean()
    if (!foundUser) {
        res.status(500).json({
            message: 'هیچ کاربری برای ثبت  دپارتمان یافت نشد'
        });
        return
    }


    const departmentId = foundUser?.departmentId
    if (!departmentId) {
        res.status(500).json({
            message: 'دپارتمان کاربر نمیتواند خالی باشد'
        });
        return
    }


    const dataToInsertInTicketReplyCollection = {
        ticketId,
        userId,
        departmentId,
        description,
        replyDate: getCurrentTimeStamp(),
        attachments,
        visibleToUser: true,
        createAt: getCurrentTimeStamp(),
        updateAt: getCurrentTimeStamp(),
    }


    try {

        const result = await TicketReply.create(dataToInsertInTicketReplyCollection)
        res.status(200).json({
            message: 'پاسخ شما با موفقیت ثبت شد.',
        });
        return
    } catch (error) {
        res.status(500).json({
            message: error?.toString(),
            error
        });
        return
    }


};

export {createTicketReplyController};
