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


const createTicketController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {
    debugger
    const {myToken} = req;
    const ticketData = req.body;

    let message = '';

    if (!ticketData.title || ticketData.title === '') {
        message += ' - عنوان خالی قابل قبول نیست'
    }

    if (!ticketData.description || ticketData.description === '') {
        message += ' - توضیحات خالی قابل قبول نیست'
    }

    // if (!ticketData.priority || ticketData.priority === '') {
    //     message += ' - الویت خالی قابل قبول نیست'
    // }

    if (!ticketData.files || ticketData.files.length === 0) {
        message += ' - هیچ فایلی ضمیمه نشده است'
    }
    // اگه قرار بود کاربران نمایش داده بشن ولی دپارتمان مقصد و یا کاربر مقصد مشخص نبود پس گیر داریم
    if (ticketData.showUsersListInSendTicketForm && !(ticketData.destinationDepartmentId || ticketData.destinationUserId)) {
        message += 'کاربر یا دپارتمان مقصد مشخص نشده است'
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

    try {


        const {phoneNumber} = myToken


        const arrayListToCheck = [ACCESS_LIST.TICKET_CREATE]
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

        const userId = userFound?._id
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
            // اول مطمین بشیم که کاربری که از فرانت آیدیش به عنوان دریافت کننده تیکت
            // میاد دقیقا توی همون دپارتمان وجود داره.
            // چون ممکنه یه درصد یه نفر بخواد هکی رو بکار ببره و اطلاعات اشتباه ثبت کنه
            const isValidUser: IUser | null = await User.findOne({_id: ticketData.destinationUserId});
            if (!isValidUser || !isValidUser.isActive) {
                res.status(404).json({
                    message: 'کاربر مورد نظر در دپارتمان یافت نشد'
                })
                return
            }

            assignToUserId = ticketData.destinationUserId
            assignedToDepartmentId = adminSettingsResult.firstDestinationForTickets;

        }


        const newTicket: any = {
            ticketNumber,
            userId,
            title: ticketData.title,
            description: ticketData.description,
            priority: 'زیاد',
            status,
            assignedToDepartmentId,
            assignToUserId,
            attachments: ticketData.files,
            lastChangeTimeStamp: getCurrentTimeStamp(),
            returnStatus: null,
            returnUserId: null,
            returnTime: null,
            createAt: getCurrentTimeStamp(),
            updateAt: getCurrentTimeStamp(),
        }


        const result: ITicket = await Ticket.create(newTicket);
        console.log(result)

        // اینجا من توی جواب این درخواست میخوام این اطلاعات رو بفرستم:
        // ticketId:"",         // result._id
        // type: "" ,           // ticket , ticketReply
        // billNumber :"",      // empty  because t need to submit First bill
        // contactCode:"",      // contact Code hesabfa needs To submit bill
        // title: ""            // title Of The bill
        // tag:
        // const myTag = myToken

        // افزودن تیکت به تیکت های کاربر
        // if (!isSendTicketToAdmin) {
        //     debugger
        //     const foundUser: IUser = (await User.findOne({_id: userId}).exec())!
        //     foundUser.tickets = [...foundUser.tickets,
        //         {ticketId: result._id?.toString(), readStatus: false,}
        //     ]
        //
        //     await foundUser.save()
        //
        // }
        let msg1 = ""
        if (!isSendTicketToAdmin) {

            // Find the user and update tickets array
            const foundUser = (await User.findById({_id:assignToUserId}).exec())!;
            debugger
            if (foundUser) {
                foundUser.tickets.push({
                    ticketId: result._id,
                    readStatus: false,
                });

                // Mark the tickets array as modified
                foundUser.markModified('tickets');

                // Save the updated user document
                await foundUser.save();
                msg1 = 'و به کاربر ارجاع شد '
            }
        }


        const msg0 = 'سفارش با موفقیت ایجاد شد.';

        const contactName = myToken.UserInfo.userData.userData.name; // اینجا جاییه که همون کاربری که دکمه ی ثبت رو زده میخواد فاکتور ثبت کنه پس اسم مشتری همون اسم کسیه که لاگین شده
        const contactCode = myToken.UserInfo.userData.userData.contactCode || 'Error'; // کد کسیه که الان لاگین شده و باید اینو توی جدول کد ها برابر با دیتای حسابفا بزارم.
        const billNumber = ""; // این باید خالی باشه. چون من دارم تازه یه دونه جدید ثبت میکنم
        const billType = "ticket";
        const id = result._id
        const ticketId = result._id; // اینجا این مقدارش در صورتی که ما داریم تیکت ریپلای میزنیم و میخوایم بعد از بازگشت برگرده به صفحه ی چت لیست و این مقدار رو لازم داریم. ولی چون اینجا  تازه داره تیکت ایجاد میکنه نیاز نیست
        const note = "سفارش دهنده";
        const title = result.title;
        const tag = JSON.stringify({
            tn:result.ticketNumber,
            n:myToken.UserInfo.userData.userData.name
        }); // تگ برابر با کسی هست که داره این فاکتور رو ایجاد و یا ویرایش میکنه


        const myDataForTicketNeedsBill: IInitialBillResponse = {
            ticketNumber : result.ticketNumber,
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

                message: msg0 + msg1,
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

export {createTicketController};
