import {Request, Response, NextFunction} from 'express';

import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";

import {ITicketReply, TicketReply} from "../../models/ticketReply";
import {getCurrentTimeStamp} from "../../utils/timing";
import {ITicket, Ticket} from "../../models/ticket";
import {IUser, User} from "../../models/User";
import {Department, IDepartment} from "../../models/department";
import {generateRefreshToken} from "../LoginRegisterSms/generateAccessToken";
import {uuidGenerator} from "../../utils/uuidGenerator";
import {logger} from "../../middleware/logEvents";
import {IInitialBillResponse} from "../utility/initialBillResponse";
import {NotificationPayload, sendNotificationToUser} from "../../utils/pushNotification/pushNotification";
import {TicketAssignment} from "../../models/ticketAssignment ";
import mongoose from "mongoose";


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
    const theUserName = myToken?.UserInfo?.userData?.userData?.name + myToken?.UserInfo?.userData?.userData.familyName

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
                // اینجا میتونم بعدا یه تایع بنویسم که اگه این دپارتمان توی لیست پیامک های ارسالی بود بعدش که براش جواب درج شد به مشتری پیامک بدم که آقا یک پیام برای شما درج شد


            } catch (error) {
                // console.log(error)
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
        const result = await TicketReply.create(dataToInsertInTicketReplyCollection);

        // اینجا باید اطلاعات اون تیکت رو ببینیم و از روی اون ببینم نام کاربر و کد کاربر چیه که بفرستیم سمت فرانت


        const contactName = customerDocument.name; // اسم مشتری رو میخوایم که میتونیم از اینجا که داکیومنت مشتری هست پیدا کنیم و بفرستیم
        const contactCode = customerDocument.contactCode; // کد مشتری هست که از روی داکیومنت مستری میگیریم
        const billNumber = ""; // این باید خالی باشه. چون من دارم تازه یه دونه جدید ثبت میکنم
        const billType = "ticketReply";
        const id = result._id;
        const note = (myToken.UserInfo.userData.userData.contactCode === customerDocument.contactCode) ? "سفارش دهنده" : "کاربر سازمانی"
        const title = ticketDoc.title;
        const tag = myToken.UserInfo.userData.userData.name; // تگ برابر با کسی هست که داره این فاکتور رو ایجاد و یا ویرایش میکنه


        const myDataForTicketNeedsBill: IInitialBillResponse = {
            ticketNumber: ticketDoc.ticketNumber,
            contactName,
            contactCode,
            billNumber,
            billType,
            id,
            ticketId, // که ای دی تیکت هست و میفرستیم که اگه برگشت توی چت لیست ریکوئست بزنه
            note,
            title,
            tag,
        }
        // اینجا یه نوتیف بدم بچه هایی که به این دسترسی دارن متوجه بشن
        //
        setTimeout(async () => {
            const currentUserId = myToken?.UserInfo?.userData?.userData?.userId;

            const uniqueUserIds: any = await TicketAssignment.distinct('assignedToUserId', {
                ticketId,
                isDeleteDestination: false
            });



            const notificationArray = uniqueUserIds
                .filter((singleUserId: any) => !!singleUserId && singleUserId.toString() !== currentUserId.toString()) // Filter out the current user ID
                .map((singleUserId: any): NotificationPayload | null => {
                    try {
                        const userIdString = singleUserId.toString();
                        const newResponseText = "پاسخ جدید:";
                        return {
                            userId: userIdString,
                            phoneNumber: undefined,
                            notification: {
                                title: `${newResponseText} ${title} (${ticketDoc.ticketNumber})`,
                                body: `${theUserName} : ${description.slice(0, 60)}`,
                                icon: "",
                                click_action: "/inbox"
                            }
                        };
                    } catch (error) {
                        console.warn('Failed to convert userId to string:', singleUserId, error);
                        return null;
                    }
                })
                .filter((notification: NotificationPayload | null): notification is NotificationPayload => notification !== null);

            await sendNotificationToUser(notificationArray)


            debugger
        }, 3000)


        res.status(200).json({
            message,
            result,
            data: myDataForTicketNeedsBill,
        });
        return
    } catch (error) {
        res.status(500).json({
            message: error?.toString(),
            error
        });
        return
    }


}

export {createTicketReplyController};
