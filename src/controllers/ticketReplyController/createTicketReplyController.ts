import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";
import {getCurrentTimeStamp} from "../../utils/timing";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {getNextSequenceValue, ITicket, Ticket} from "../../models/ticket";
import {getFirstDepartment, getFirstStatus, getSettings} from "../../utils/getFirstStatus";


const createTicketReplyController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

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


        let {status, assignedToDepartmentId} = await getSettings();

        if (!status || !assignedToDepartmentId) {
            res.status(404).json({
                message: 'هیچ وضعیت یا دپارتمانی تعریف نشده است.'
            })
            return
        }
        const ticketNumber = await getNextSequenceValue('ticketNumber')

        const newTicket: any = {
            ticketNumber,
            userId,
            title: ticketData.title,
            description: ticketData.description,
            priority: 'زیاد',
            status,
            assignedToDepartmentId,
            assignToUserId: null,
            attachments: ticketData.files,
            lastChangeTimeStamp: getCurrentTimeStamp(),
            returnStatus: null,
            returnUserId: null,
            returnTime: null,
            createAt: getCurrentTimeStamp(),
            updateAt: getCurrentTimeStamp(),
        }


        const result: ITicket = await Ticket.create(newTicket);
        res.status(200).json({result, message: 'سفارش با موفقیت ایجاد شد.',});
        return;

    } catch (error) {

        res.status(500).json({
            message: error?.toString(),
        });
        return
    }

};

export {createTicketReplyController};
