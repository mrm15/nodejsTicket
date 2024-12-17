import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";
import {getCurrentTimeStamp} from "../../utils/timing";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {getNextSequenceValue, ITicket, Ticket} from "../../models/ticket";
import {getSettings} from "../../utils/getFirstStatus";
import {AdminSettings, IAdminSettings} from "../../models/adminSettings";
import {IInitialBillResponse} from "../utility/initialBillResponse";
import addToAssignedTickets from "../../utils/forwardTicketUtils/addToAssignedTickets";
import {sendNotificationToUser} from "../../utils/pushNotification/pushNotification";
import {sendSmsAfterSubmitOrder} from "../../SMS/SMS.IR/sendSms";
import mongoose from "mongoose";
import getUserByPhoneNumber from "../../utils/functions/getUserByPhoneNumber";
import {TicketReply} from "../../models/ticketReply";
import {userInfo} from "node:os";
import forwardTicket from "../../utils/forwardTicketUtils/forwardTicket";


const createTicketAdvancedController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    const ticketData = req.body;

    let message = '';

    if (!ticketData.title || ticketData.title === '') {
        message += ' - عنوان خالی قابل قبول نیست'
    }

    if (!ticketData.description || ticketData.description === '') {
        message += ' - توضیحات خالی قابل قبول نیست'
    }


    if (!ticketData.files || ticketData.files.length === 0) {
        message += ' - هیچ فایلی ضمیمه نشده است'
    }

    if (!ticketData.firstReplyMessage || ticketData.firstReplyMessage.length === 0) {
        message += ' - هیچ توضیحی برای نام فایل درج نشده!'
    }
    if (message !== '') {
        res.status(409).json({message})
        return
    }


    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }
    const {phoneNumber} = myToken

    const userInfo = await getUserByPhoneNumber(phoneNumber)
    try {




        const arrayListToCheck = [ACCESS_LIST.TICKET_CREATE_ADVANCED]
        const hasAccessToCreateTicket = await checkAccessList({phoneNumber, arrayListToCheck})

        if (!hasAccessToCreateTicket) {
            res.status(403).json({message: '- شما مجوز دسترسی به این بخش را ندارید.'});
            return
        }


        // احتمال اینکه همون موقع یه نیروی ادمینی با ادمین اصلی لج کرده باشه ممکنه که اینجا بخواد مثلا دپارتمان بیاد تعریف کنه که باید بگم شرمند
        // البته کاربری توی توکن چک میشه


        const userFound: IUser | null = await User.findOne({phoneNumber: myToken.phoneNumber})

        if (!userFound) {
            res.status(500).json({message: "کاربری تایید نشد."});
            return
        }

        const senderPhoneNumber = ticketData?.senderTicketUserId
        if (!senderPhoneNumber) {
            res.status(500).json({message: "فرستنده مورد تایید نیست."});
            return
        }

        const ticketNumber = await getNextSequenceValue('ticketNumber')


        // let { assignedToDepartmentId} = await getSettings();
        //
        // if (!assignedToDepartmentId) {
        //     res.status(404).json({
        //         message: ' دپارتمانی تعریف نشده است.'
        //     })
        //     return
        // }
        // بریم ببینم آیا باید تیکت رو به مدیر دپارتمان ارجاع بدیم یا اینکه باید یک راست تحویل کسی بدیم که مشتری انتخاب کرده.
        // بریم اینو از تنظیمات ببینیم
        const adminSettingsResult: IAdminSettings | null = await AdminSettings.findOne({}).lean();

        if (!adminSettingsResult) {
            res.status(404).json({
                message: 'هیچ تنظیمات مدیریتی ثبت نشده است.'
            })
            return
        }
        const status = (adminSettingsResult.firstStatusTicket)!;
        if (!status) {
            res.status(404).json({
                message: 'اولین استاتوس تیکت در تنظیمات مدیریتی ثبت نشده است. .'
            })
            return
        }
        // اگه قرار بود بره واسه مدیر دپارتمان پس ینی
        // adminSettingsResult.showUsersListInSendTicketForm
        // باید مقدارش فالز باشه
        // و اگه قراره بره برای یه شخص در دپارتمان (دریافت سفارش) بره پس باید مقدار باید ترو باشه


        //   اگه اونجا کاربرای دپارتمان مقصد رو نشون بدیم ینی باید به یک کاربر خاص تیکت ارسال بشه
        // پس اگه نمایش کاربران ترو باشه ارسال به ادمین دپارتمان فالز هست
        const isSendTicketToAdmin = !adminSettingsResult.showUsersListInSendTicketForm

        let assignedToDepartmentId = null;
        let assignToUserId = null;



        // اگه قرار بود سفارشات ثبت شده به ادمنی دپارتمان
        if (isSendTicketToAdmin) {
            assignedToDepartmentId = adminSettingsResult.firstDestinationForTickets;
        } else {

            assignToUserId = new mongoose.Types.ObjectId(userInfo._id)
            // اول مطمین بشیم که کاربری که از فرانت آیدیش به عنوان دریافت کننده تیکت
            // میاد دقیقا توی همون دپارتمان وجود داره.
            // چون ممکنه یه درصد یه نفر بخواد هکی رو بکار ببره و اطلاعات اشتباه ثبت کنه
            // const isValidUser: IUser | null = await User.findOne({_id: ticketData.destinationUserId});
            // if (!isValidUser || !isValidUser.isActive) {
            //     res.status(404).json({
            //         message: 'کاربر مورد نظر در دپارتمان یافت نشد'
            //     })
            //     return
            // }
            //
            // assignToUserId = ticketData.destinationUserId
            // assignedToDepartmentId = adminSettingsResult.firstDestinationForTickets;

        }

        const senderInfo = await getUserByPhoneNumber(senderPhoneNumber)

        const newTicket: any = {
            ticketNumber,
            userId: senderInfo._id,
            title: ticketData.title,
            description: ticketData.description,
            priority: 'زیاد',
            status,
            firstDepartmentId: assignedToDepartmentId,
            firstUserId: assignToUserId,
            attachments: ticketData.files,
            lastChangeTimeStamp: getCurrentTimeStamp(),
            returnStatus: null,
            returnUserId: null,
            returnTime: null,
            createAt: getCurrentTimeStamp(),
            updateAt: getCurrentTimeStamp(),
        }


        const result: ITicket = await Ticket.create(newTicket);




        let msg1 = ""
        await addToAssignedTickets({
            ticketIdsArray: [result._id],
            departmentId: assignedToDepartmentId,
            userId: result.firstUserId,
            senderUserId: senderInfo._id
        })
        msg1 += "تیکت ارجاع شد ";
        msg1 += 'سفارش با موفقیت ایجاد شد.';

        const contactName = myToken.UserInfo.userData.userData.name; // اینجا جاییه که همون کاربری که دکمه ی ثبت رو زده میخواد فاکتور ثبت کنه پس اسم مشتری همون اسم کسیه که لاگین شده
        const contactCode = myToken.UserInfo.userData.userData.contactCode || 'Error'; // کد کسیه که الان لاگین شده و باید اینو توی جدول کد ها برابر با دیتای حسابفا بزارم.
        const billNumber = ""; // این باید خالی باشه. چون من دارم تازه یه دونه جدید ثبت میکنم
        const billType = "ticket";
        const id = result._id
        const ticketId = result._id; // اینجا این مقدارش در صورتی که ما داریم تیکت ریپلای میزنیم و میخوایم بعد از بازگشت برگرده به صفحه ی چت لیست و این مقدار رو لازم داریم. ولی چون اینجا  تازه داره تیکت ایجاد میکنه نیاز نیست
        const note = "سفارش دهنده";
        const title = result.title;
        const tag = JSON.stringify({
            tn: result.ticketNumber,
            n: myToken.UserInfo.userData.userData.name
        }); // تگ برابر با کسی هست که داره این فاکتور رو ایجاد و یا ویرایش میکنه



        // اینجا یه پیامک بدم به مشتری بگم سفارش شما اینجاد شد.

        // تا اینجا تیکت ایجاد شده و مثلا برای امیر حسین اساین شده


        // حالا امیر حسین میاد یه ریپلای درج میکنه
        const dataToInsertInTicketReplyCollection = {
            ticketId,
            userId: userInfo._id,
            departmentId:userInfo.departmentId,
            description:ticketData.firstReplyMessage,
            replyDate: getCurrentTimeStamp(),
            attachments:[],
            visibleToUser: true,
            createAt: getCurrentTimeStamp(),
            updateAt: getCurrentTimeStamp(),
        }
        const setReply = await TicketReply.create(dataToInsertInTicketReplyCollection);
        // امیر حسین فوروارد میکنه واسه فاکتور

        const billDepartment = adminSettingsResult?.billDepartment;
        const resultOfTask = await forwardTicket({
            ticketIdsArray: [ticketId],
            departmentId: billDepartment,
            userId: "",
            senderUserId: userInfo._id,
        })






        setTimeout(async () => {


            const sendSmsAfterSubmitOrder11 = await sendSmsAfterSubmitOrder({
                mobile: senderPhoneNumber,
                customerName: contactName,
                orderTitle: result.title,
                orderNumber: result.ticketNumber
            })
        }, 60000)
        // اینجا میخوام یه نوتیف بدم به کاربر

        const myDataForTicketNeedsBill: IInitialBillResponse = {
            ticketNumber: result.ticketNumber,
            contactName,
            contactCode,
            billNumber,
            billType,
            id,
            ticketId,
            note,
            title,
            tag,
        }

        res.status(200).json({

                message: msg1,
                data: myDataForTicketNeedsBill
            }
        );
        return;

    } catch (error) {

        res.status(500).json({
            message: error?.toString(),
        });
        return
    }

};

export {createTicketAdvancedController};
