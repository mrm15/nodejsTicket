import {Request, Response, NextFunction} from 'express';

import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";

import {ITicketReply, TicketReply} from "../../models/ticketReply";
import {getCurrentTimeStamp} from "../../utils/timing";
import {ITicket, Ticket} from "../../models/ticket";
import {IUser, User} from "../../models/User";
import {Department, IDepartment} from "../../models/department";
import {generateRefreshToken} from "../LoginRegisterSms/generateAccessToken";
import {uuidGenerator} from "../../utils/uuidGenerator";
import {setForSendMessage} from "../../utils/setForSendMessage";
import {logger} from "../../middleware/logEvents";


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


    if (visibleToUser === undefined) {
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


    let smsMsg = "";
    const ticketDoc = (await Ticket.findOne({ticketNumber: ticketNumber}).exec())!
    const ticketId = ticketDoc['_id'];

    const userId = myToken?.UserInfo?.userData?.userData?.userId
    // maye user that create this ticket  has been deleted or deactive
    const customerUserId = ticketDoc.userId;
    const customerDocument: IUser | null = await User.findOne({_id: customerUserId.toString()});
    if (customerDocument === null) {
        res.status(500).json({
            message: 'کاربر سفارش دهنده حذف شده و امکان ارسال پیام وجود ندارد.',
        })
        return
    }

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
    // بیا چک کنیم ببینم لازمه اس ام اس بدیم یا نه؟
    const foundUserDepartment: IDepartment | null = await Department.findOne({_id: departmentId})
    if (!foundUserDepartment) {
        res.status(500).json({
            message: 'کاربر در هیچ دپارتمانی نیست.',
        });
    }


    debugger
    // برای قطعی شدن اسراسل اس ام اس باید حتما بدونیم که پیام مخفی نیست

    if (visibleToUser) {


        const shouldISendSms = foundUserDepartment?.sendSmsAfterSubmitResponse;
        if (shouldISendSms) {
            const smsText = foundUserDepartment?.smsText;
            if (!smsText) {
                res.status(500).json({
                    message: 'در تنطیمات پیامک فعال است ولی متنی نداریم. لطفا با مدیر سایت تماس بگیرید.',
                });
                return;
            }
            // send SMS
            try {

                const customerPhoneNumber = customerDocument.phoneNumber
                const depString = departmentId?.toString();
                const resultSendSms = await setForSendMessage({
                    senderUserId: userId, senderDepartmentId: depString, text: smsText, replyId: null,
                    destinationNumber: customerPhoneNumber
                });
                if (resultSendSms.smsStatusCode===200) {
                    smsMsg = "پیامک درج شد."
                }


            } catch (error) {
                console.log(error)
            }


        }
    }


    const dataToInsertInTicketReplyCollection = {
        ticketId,
        userId,
        departmentId,
        description,
        replyDate: getCurrentTimeStamp(),
        attachments,
        visibleToUser: visibleToUser,
        createAt: getCurrentTimeStamp(),
        updateAt: getCurrentTimeStamp(),
    }


    try {

        const message = 'پاسخ شما با موفقیت ثبت شد.' + " " + smsMsg
        const result = await TicketReply.create(dataToInsertInTicketReplyCollection)
        res.status(200).json({
            message,
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
