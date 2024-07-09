import {Request, Response, NextFunction} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";

import {ITicket, Ticket} from "../../models/ticket";
import {IUser, User} from "../../models/User";
import {timestampToTime} from "../../utils/timestampToTime";
import {Department, IDepartment} from "../../models/department";
import {filesToFileData} from "../../utils/filesToFileData";
import {ITicketReply, TicketReply} from "../../models/ticketReply";
import {AdminSettings, IAdminSettings} from "../../models/adminSettings";

interface IChatList {
    ticketNumber?: number;
    title?: string;
    createAt?: string;
    lastChangeTimeStamp?: string;
    lastDepartment?: string;
    data?: IChatListArray[];

}

interface IChatListArray {
    name: string;
    description: string;
    files: {
        fileName: string;
        fileSize: number;
        filePath: string;
        fileType: string;
    }[];

    createAt: string;
}


const chatListTicketController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    try {
        const arrayListToCheck = [ACCESS_LIST.TICKET_CHAT_LIST];

        // اول باید اطلاعات تیکت رو بگیرم
        // بعدش باید برم از جدول ریپلای ها بگیرم ببینم چیا رو باید بزنم
        //اون تیکت آی دی رو باید بگیرم ببینم چه ریپلای هایی خورده
        // آرایه از آبجکت ها رو ارسال میکنم به سمت فرانت


        const hasAccessToChatList = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck})
        if (!hasAccessToChatList) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
            return
        }

        // اینجا قراره بعدا 10 تا 10 تا درخواست بزنم بگم هر ده تا یه بار درخواست بزن
        const {ticketId} = req.params

        if (!ticketId) {
            res.status(409).json({
                message: 'یافت مقدار آیدی در درخواست شما یافت نشد.',
            })
            return;
        }

        const chatList: IChatList = {}
        // میریم که تیکت رو پیدا کنیم
        const foundTicket: ITicket | null = await Ticket.findOne({_id: ticketId});
        if (!foundTicket) {
            res.status(409).json({
                message: 'هیچ سفارشی با کد سفترش مورد نظر یافت نشد!.',
            })
            return;
        }

        //
        // res.status(500).json({message: foundTicket});
        // return

        chatList.ticketNumber = foundTicket.ticketNumber; //کد سفارش
        chatList.title = foundTicket.title; //عنوان تیکت
        chatList.createAt = timestampToTime(foundTicket.createAt) // تاریخ ایجاد تیکت
        chatList.lastChangeTimeStamp = timestampToTime(foundTicket.lastChangeTimeStamp) // تاریخ آخرین اقدام روی تیکت

        const department: IDepartment = (await Department.findOne({_id: foundTicket.assignedToDepartmentId}))!; // دپارتمان تیکت

        chatList.lastDepartment = department?.name;

        // const tempFilesArray = await Promise.all(foundTicket.attachments.map(async (fileId) => {
        //     const fileObject: IFile = (await File.findOne({_id: fileId}).lean())!;
        //     const {fileName, fileSize, filePath, fileType} = fileObject
        //     return {fileName, fileSize, filePath, fileType};
        // }));

        // آرایه مای دیتا که قراره بره توی آبجکت چت لیست
        const myData = [];

        let user_name = '';
        let department_name = ''

        // اسم کاربری رو میخوام که تیکت رو ثبت کرده،
        // خب قاعدتا جزو مشتری ها هست و مشتری هست که
        // تیکت رو ثبت کرده میره توی دپارتمان مشتریان
        // اگه اسم دپارتمان مشتری رو تغییر بدیم اینم تغییر میکنه
        const foundUser: IUser | null = await User.findOne({_id: foundTicket.userId})


        if (foundUser) {
            user_name = foundUser?.name
            const foundDepartment: IDepartment = (await Department.findOne({}).lean())!;

            if (!!foundDepartment) {
                department_name = foundDepartment.name
            }

        }

        const tempFilesArray = await filesToFileData(foundTicket.attachments)
        const senderUserId = foundTicket.userId.toString()
        const isHeTicketSenderHere = (senderUserId === myToken?.UserInfo?.userData?.userData?.userId.toString());

        myData.push({
            isTicketSender: isHeTicketSenderHere,
            userId: senderUserId,
            ticketReplyId: '',
            type: "ticket", // اگه لازم باشه فاکتور حذف بشه لازم میشه
            id: foundTicket._id, // اگه لازم باشه فاکتور حذف بشه لازم میشه
            user_name,
            department_name,
            description: foundTicket.description,
            billNumber: foundTicket.billNumber,
            billStatus: foundTicket.billStatus,
            files: tempFilesArray,
            createAt: chatList.createAt,
        })


        // اینجا باید برم توی ریپلای ها سرچ کنم
        // به ترتیب مرتبشون کنم
        // بریزمشون توی آرایه ی دیتا که توی چت لیست قرار داره و بعدش بفرستم سمت فرانت

        // last action here I want to add reply collection
        // chatList.files = [...tempFilesArray];
        // let's go find some replies
        const replies = await TicketReply.find({ticketId}).lean();


        let myList = await Promise.all(replies.map(async (singleTicketReply) => {
            const row: any = {};
            const foundUser: IUser = (await User.findOne({_id: singleTicketReply.userId}).lean())!;
            const foundDepartment: IDepartment = (await Department.findOne({_id: singleTicketReply.departmentId}).lean())!;
            debugger
            let filesPropertiesArray: { fileName: string; fileSize: number; filePath: string; fileType: string; }[] = []
            if (singleTicketReply.attachments) {
                filesPropertiesArray = await filesToFileData(singleTicketReply.attachments)
            }

            row['isTicketSender'] = (singleTicketReply.userId.toString() === myToken?.UserInfo?.userData?.userData?.userId.toString());
            row['userId'] = singleTicketReply.userId;
            row['ticketReplyId'] = singleTicketReply._id
            row['user_name'] = foundUser?.name
            row['department_name'] = foundDepartment?.name
            row['description'] = singleTicketReply?.description || 'یافت نشد';
            row['visibleToUser'] = singleTicketReply?.visibleToUser;
            row['files'] = filesPropertiesArray
            row['billNumber'] = singleTicketReply.billNumber
            row['billStatus'] = singleTicketReply.billStatus
            row['type'] = "ticketReply"// اگه لازم باشه فاکتور حذف بشه لازم میشه
            row['id'] = singleTicketReply._id // اگه لازم باشه فاکتور حذف بشه لازم میشه

            row['createAt'] = timestampToTime(singleTicketReply?.createAt)
            //console.log(singleTicketReply)
            return row;
        }));

        // بریم ببینیم آیا اون دپارتمانی که درخواست کرده که تیکت ها رو ببینه همون دپارتمان مشتری ها هست؟ اگه آره  پنهان ها رو نشون نده
        const result: IAdminSettings | null = await AdminSettings.findOne({}).lean();

        if (result) {


            const userDepartment = myToken.UserInfo.userData.userData.departmentId;
            const customerDepartment = (result.customerDepartment)?.toString();
            if (customerDepartment === userDepartment) {
                myList = myList.filter(item => item.visibleToUser === true)
            }
        }


        chatList.data = [...myData, ...myList]
        res.status(200).json({
            chatList,
            message: 'چت لیست دریافت شد',
        });
        return
    } catch (error: any) {
        res.status(500).json({error: error.toString()});
        return
    }


};

export {chatListTicketController};
