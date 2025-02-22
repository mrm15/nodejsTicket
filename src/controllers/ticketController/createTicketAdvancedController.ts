import { Response, NextFunction} from 'express';
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import getAdminSettingsData from "../../utils/adminSettings/getAdminSettingsData";
import {checkAccessList} from "../../utils/checkAccessList";
import {getCurrentTimeStamp} from "../../utils/timing";
import {getNextSequenceValue, ITicket, Ticket} from "../../models/ticket";
import addToAssignedTickets from "../../utils/forwardTicketUtils/addToAssignedTickets";
import {User} from "../../models/User";
import { TicketReply} from "../../models/ticketReply";
import {sendSmsAfterSubmitOrder} from "../../SMS/SMS.IR/sendSms";

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

const createTicketAdvancedController = async (req: any, res: Response, next: NextFunction) => {

    const myData: AdvancedTicketTypes = req?.body?.myData;
    debugger
    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }

    // اول از همه دسترسی کاربر رو چک کنیم
    const roleAccessListToTicketAdvanced = [ACCESS_LIST.ticketCreateAdvanced]
    const hasAccessTo = await checkAccessList({
        arrayListToCheck: roleAccessListToTicketAdvanced,
        phoneNumber: myToken.phoneNumber,
    });

    if (!hasAccessTo) {
        res.status(403).json({message: "شما مجوز دسترسی به این بخش را ندارید."});
        return;
    }
    debugger
    let msg = "";
    // اینجا خیلی مهمه.
    // فایل هاآپلو شدن، و آیدیشون داره میاد
    // اول از همه باید تنظیمات مدیریتی رو بگیرم
    const resultOfAdminSettings = await getAdminSettingsData()
    const adminSettings = resultOfAdminSettings.adminSettingData;
    // اینجا باید مطمئن باشیم که کسی که داره سفارش رو ثبت میکنه. عصو دپارتمان ثبت سفارش باشه
    const createdBy = myToken?.UserInfo?.userData?.userData?.userId;

    const foundUser: any = await User.findById(createdBy);
    const submitOrderDepartment = adminSettings?.firstDestinationForTickets

    if (foundUser.departmentId?.toString() !== submitOrderDepartment?.toString()) {
        res.status(500).json({
            message: "شما عضو دپارتمان ثبت سفارش نیستید.!"
        })
        return
    }
    // خب حالا اینجا باید یک تیکت ایجاد کنم

    const ticketNumber = await getNextSequenceValue('ticketNumber')
    const currentTimeStamp = getCurrentTimeStamp()
    const newTicket = {
        ticketNumber: ticketNumber,
        userId: myData.senderUserId,
        createdBy: createdBy,
        title: myData.title,
        description: myData.description,
        priority: 'زیاد',
        statusId: adminSettings?.firstStatusTicket,
        firstDepartmentId: adminSettings?.firstDestinationForTickets,
        firstUserId: createdBy,
        lastAssignedDepartmentId: adminSettings?.firstStatusTicket,
        lastAssignedUserId: createdBy,
        messageTag: adminSettings?.mainFileMessageTagId,
        attachments: myData?.filesUploadId,
        lastChangeTimeStamp: currentTimeStamp,
        billNumber: null,
        billStatus: null,
        organizationReadStatus: false,
        customerReadStatus: false,
        createAt: currentTimeStamp,
        updateAt: currentTimeStamp,

    }

    // اول یه تیکت جدید ثبت میکنم که ارسال کننده تیکت مشتری هست که انتخاب شده
    // ایجاد شده توسط کسی که پنل رو باز کرده

    const result: ITicket = await Ticket.create(newTicket);

    msg += " فایل ثبت شد"


    // تیکت ریپلای رو باید کسی که سفارش رو ثبت میکنه بزاره و تگ شات بزاریم.
    const dataToInsertInTicketReplyCollection = {
        ticketId: result.id,
        userId: createdBy,
        departmentId: adminSettings?.billDepartmentId,
        description: "اسکرین شات ",
        messageTag: adminSettings?.billMessageTagId,
        replyDate: getCurrentTimeStamp(),
        attachments: myData?.screenShotUploadId,
        visibleToUser: true,
        createAt: getCurrentTimeStamp(),
        updateAt: getCurrentTimeStamp(),
    }
    const resultTicketReply = await TicketReply.create(dataToInsertInTicketReplyCollection);
    msg += "  شات ثبت شد."


    // سری اول از طرف مشتری پیام رو میفرستیم برای سفارش گیر
    await addToAssignedTickets({
        ticketIdsArray: [result.id],
        departmentId: adminSettings?.firstStatusTicket as any,
        userId: createdBy as any,
        senderUserId: createdBy
    })
    msg += "تیکت به خودت ارجاع شد ";


    // تیکت رو ارجاع بدم به واحد فاکتور
    // سری دوم از طرف سفارش گیر میفرستیم واسه واحد فاکتور که سرپرست فاکتور ببینه. و خودش تصمیم بگیره به کدوم واحد بده
    await addToAssignedTickets({
        ticketIdsArray: [result.id],
        departmentId: adminSettings?.billDepartmentId as any,
        userId: null,
        senderUserId: createdBy
    })
    msg += "تیکت به فاکتور ارجاع شد ";




    const customerObject = (await User.findById(myData.senderUserId).lean())!

    const sendSmsAfterSubmitOrder11 = await sendSmsAfterSubmitOrder({
        mobile: customerObject.phoneNumber,
        customerName: customerObject?.name,
        orderTitle: result.title,
        orderNumber: result.ticketNumber
    })

    if(sendSmsAfterSubmitOrder11){
        msg += 'پیامک ثبت سفارش برای مشتری ارسال شد.';
    }




    res.status(200).json({
        message: msg,
    })
    return

};

export {createTicketAdvancedController};
