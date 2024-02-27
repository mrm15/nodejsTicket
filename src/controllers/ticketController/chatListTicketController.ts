import {Request, Response, NextFunction} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";

import {ITicket, Ticket} from "../../models/ticket";
import {IUser, User} from "../../models/User";
import {timestampToTime} from "../../utils/timestampToTime";
import {IFile, File} from "../../models/files";
import mongoose from "mongoose";
import {Department, IDepartment} from "../../models/department";

interface IChatList {
    ticketNumber?: number;
    title?: string;
    createAt?: string;
    lastChangeTimeStamp?: string;
    lastDepartment?: string;
    data?:IChatListArray[];

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
        // آرایه از از آبجکت ها رو ارسال میکنم به سمت فرانت


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

        chatList.lastDepartment = department.name;

        const tempFilesArray = await Promise.all(foundTicket.attachments.map(async (fileId) => {
            const fileObject: IFile = (await File.findOne({_id: fileId}).lean())!;
            const {fileName, fileSize, filePath, fileType} = fileObject
            return {fileName, fileSize, filePath, fileType};
        }));

        // اینجا باید برم توی ریپلای ها سرچ کنم
        // به ترتیب مربشون کنم
        // بریزمشون توی آرایه ی دیتا که توی چت لیست قرار داره و بعدش بفرستم سمت فرانت

        // last action here I want to add reply collection


        // chatList.files = [...tempFilesArray];


        res.status(500).json({
            chatList,
            message: 'اطلاعات چت دریافت شد'
        });
        return


    } catch (error: any) {

        res.status(500).json({error: error.toString()});
        return
    }


};

export {chatListTicketController};
