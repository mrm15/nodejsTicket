import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ACCESS_LIST } from "../../utils/ACCESS_LIST";
import getAdminSettingsData from "../../utils/adminSettings/getAdminSettingsData";
import { checkAccessList } from "../../utils/checkAccessList";
import { getCurrentTimeStamp } from "../../utils/timing";
import { getNextSequenceValue, ITicket, Ticket } from "../../models/ticket";
import addToAssignedTickets from "../../utils/forwardTicketUtils/addToAssignedTickets";
import { User } from "../../models/User";
import { TicketReply } from "../../models/ticketReply";
import { sendSmsAfterSubmitOrder } from "../../SMS/SMS.IR/sendSms";
import { startSession } from 'mongoose';
import { CustomRequestMyTokenInJwt } from "../../middleware/verifyJWT";

export interface AdvancedTicketTypes {
    // عنوان سفارش
    title: string,
    // توضیحات سفارش
    description: string,
    // فایل نهایی یا فایل های نهایی
    files: File[],
    filesUploadId: any[],
    // فایل رو کی فرستاده و قراره توی پنل کی نشون بدیم که این فایل مال تو بوده ینی فرستنده فایل
    senderUserId: string,
    // اطلاعات مشتری که انتخاب شده جهت نمایش دادن
    senderUserData: string,
    // ماکزیمم فایل سایزی که میشه آپلود کرد.
    maxFileSize: number,
    // فایل های شات
    screenShot: File[],
    screenShotUploadId: any[],
    // آیا پروسه داره آپلود میشه؟
    isSendingRequest: boolean,
}

// تعریف اسکیمای اعتبارسنجی برای داده‌های ورودی
const advancedTicketSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    filesUploadId: Joi.array().items(Joi.any()).required(),
    senderUserId: Joi.string().required(),
    screenShotUploadId: Joi.array().items(Joi.any()).optional(),
    // در صورت نیاز سایر فیلدها هم می‌توانند اضافه شوند
});

const createTicketAdvancedController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {
    // دریافت داده‌های ورودی از بدنه درخواست
    const myData: AdvancedTicketTypes = req.body?.myData;
    const { myToken } = req;

    // چک کردن وجود توکن در درخواست
    if (!myToken) {
        return res.status(403).json({ message: 'مقدار توکن توی ری کوئست موجود نیست' });
    }

    // مرحله 2: اعتبارسنجی داده‌های ورودی با استفاده از Joi
    const { error } = advancedTicketSchema.validate(myData);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    // مرحله 4: ابتدا دسترسی کاربر را چک می‌کنیم
    const roleAccessListToTicketAdvanced = [ACCESS_LIST.ticketCreateAdvanced];
    const hasAccessTo = await checkAccessList({
        arrayListToCheck: roleAccessListToTicketAdvanced,
        phoneNumber: myToken.phoneNumber,
    });
    if (!hasAccessTo) {
        return res.status(403).json({ message: "شما مجوز دسترسی به این بخش را ندارید." });
    }

    // شیء resultAction جهت ثبت وضعیت اجرای هر بخش
    const resultAction = {
        ticketCreated: false,
        ticketReplyCreated: false,
        assignedToSelf: false,
        assignedToBill: false,
        smsSent: false,
    };

    // متغیر msg جهت ذخیره پیام‌های متنی بخش‌های انجام شده
    let msg = "";

    try {
        // دریافت تنظیمات مدیریتی و اطلاعات کاربر به‌طور همزمان
        const [resultOfAdminSettings, foundUser] = await Promise.all([
            getAdminSettingsData(),
            User.findById(myToken?.UserInfo?.userData?.userData?.userId)
        ]);
        const adminSettings = resultOfAdminSettings.adminSettingData;

        // بررسی وجود کاربر
        if (!foundUser) {
            return res.status(404).json({ message: "کاربر یافت نشد." });
        }

        // اطمینان از اینکه کاربر عضو دپارتمان ثبت سفارش است
        const submitOrderDepartment = adminSettings?.firstDestinationForTickets;
        if (foundUser.departmentId?.toString() !== submitOrderDepartment?.toString()) {
            return res.status(500).json({
                message: "شما عضو دپارتمان ثبت سفارش نیستید  و نمیتوانید سفارش ثبت کنید!"
            });
        }

        // حذف بخش‌های مربوط به تراکنش (چون Replica Set در دسترس نیست)
        // ایجاد یک تیکت جدید
        const ticketNumber = await getNextSequenceValue('ticketNumber');
        const currentTimeStamp = getCurrentTimeStamp();

        const newTicket = {
            ticketNumber: ticketNumber,
            userId: myData.senderUserId,
            createdBy: foundUser.id, // شناسه کاربر ثبت کننده
            title: myData.title,
            description: myData.description,
            priority: 'زیاد',
            statusId: adminSettings?.firstStatusTicket,
            firstDepartmentId: adminSettings?.firstDestinationForTickets,
            firstUserId: foundUser.id,
            lastAssignedDepartmentId: adminSettings?.firstStatusTicket,
            lastAssignedUserId: foundUser.id,
            messageTag: adminSettings?.mainFileMessageTagId,
            attachments: myData?.filesUploadId,
            lastChangeTimeStamp: currentTimeStamp,
            billNumber: null,
            billStatus: null,
            organizationReadStatus: false,
            customerReadStatus: false,
            createAt: currentTimeStamp,
            updateAt: currentTimeStamp,
        };

        // ثبت تیکت جدید بدون استفاده از تراکنش
        const ticketResult: ITicket = await Ticket.create([newTicket]).then(docs => docs[0]);
        resultAction.ticketCreated = true;
        msg += " فایل ثبت شد";

        // ثبت تیکت ریپلای به همراه اسکرین شات
        const dataToInsertInTicketReplyCollection = {
            ticketId: ticketResult.id,
            userId: foundUser.id,
            // دپارتمان کاربر ثبت کننده
            departmentId: foundUser.departmentId,
            description: "اسکرین شات ",
            // تگ اسکرین شات از تنظیمات مدیریتی
            messageTag: adminSettings?.screenShotMessageTagId,
            replyDate: getCurrentTimeStamp(),
            attachments: myData?.screenShotUploadId,
            visibleToUser: true,
            createAt: getCurrentTimeStamp(),
            updateAt: getCurrentTimeStamp(),
        };
        await TicketReply.create([dataToInsertInTicketReplyCollection]);
        resultAction.ticketReplyCreated = true;
        msg += " شات ثبت شد.";

        // استفاده از Promise.all برای اجرای موازی ارجاع تیکت به دو واحد مختلف
        const [assignResultSelf, assignResultBill] = await Promise.all([
            // ارجاع تیکت به خود (سری اول)
            addToAssignedTickets({
                ticketIdsArray: [ticketResult.id],
                departmentId: adminSettings?.firstStatusTicket as any,
                userId: foundUser.id as any,
                senderUserId: foundUser.id,
            }),
            // ارجاع تیکت به واحد فاکتور (سری دوم)
            addToAssignedTickets({
                ticketIdsArray: [ticketResult.id],
                departmentId: adminSettings?.billDepartmentId as any,
                userId: null,
                senderUserId: foundUser.id,
            })
        ]);

        if (assignResultSelf) {
            resultAction.assignedToSelf = true;
            msg += " تیکت به خودت ارجاع شد ";
        }
        if (assignResultBill) {
            resultAction.assignedToBill = true;
            msg += " تیکت به فاکتور ارجاع شد ";
        }

        // ارسال پیامک پس از ثبت سفارش برای مشتری
        const customerObject = await User.findById(myData.senderUserId).lean();
        if (customerObject) {
            const sendSmsResult = await sendSmsAfterSubmitOrder({
                mobile: customerObject.phoneNumber,
                customerName: customerObject?.name,
                orderTitle: ticketResult.title,
                orderNumber: ticketResult.ticketNumber,
            });
            if (sendSmsResult.status) {
                resultAction.smsSent = true;
                msg += ' پیامک ثبت سفارش برای مشتری ارسال شد.';
            }
        }

        // ارسال شیء resultAction همراه با msg به فرانت‌اند جهت اطلاع از وضعیت هر بخش
        return res.status(200).json({ resultAction, message: msg });
    } catch (error) {
        return res.status(500).json({ message: "مشکلی در پردازش درخواست شما به وجود آمد.", error: error?.toString() });
    }
};

export { createTicketAdvancedController };
