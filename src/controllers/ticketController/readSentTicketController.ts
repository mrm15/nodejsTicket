import {Request, Response, NextFunction} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";

import {ITicket, Ticket} from "../../models/ticket";
import {IUser, User} from "../../models/User";
import {timestampToTime} from "../../utils/timestampToTime";
import {defineTable} from "../../utils/defineTable";


const ReadSentTicketController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    // res.status(201).json({myToken})
    //
    // return


    try {
        // خب اینجا من باید بر اساس اون توکنی که فرستاده متوجه بشم که این کدوم کاربره
        const {phoneNumber} = myToken;
        const foundUser: IUser | null = await User.findOne({phoneNumber});
        if (!foundUser) {
            res.status(409).json({message: 'کاربری شما وجود ندارد!'});
            return
        }
        const userId = foundUser._id;
        const mySentTickets = await Ticket.find({userId: userId}).lean()




        const arrayListToCheck = [ACCESS_LIST.TICKET_READ_OWN]
        const hasAccessToReadOwnTicket = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck})
        if (!hasAccessToReadOwnTicket) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
            return
        }





        // // اینجا قراره بعدا 10 تا 10 تا درخواست بزنم بگم هر ده تا یه بار درخواست بزن
        // const {startIndex , endIndex} = req.params;
        //
        // let ticketList: ITicket[];
        // if(!startIndex || !endIndex){
        //     ticketList= await Ticket.find({}).lean()
        // }else {
        //     ticketList = await Ticket.find({}).lean()
        // }
        //
        //
        //
        // const myList = await Promise.all(ticketList.map(async (singleTicket) => {
        //     const row: any = {...singleTicket};
        //     const userFound: IUser = (await User.findOne({_id: row.userId}).lean())!;
        //     row['userCreateThisOrder'] = userFound.name
        //     row['numberOfAttachments'] = row.attachments.length
        //     row['dateCreate'] = timestampToTime(row.createAt)
        //     row['lastChangeTime'] = timestampToTime(row.lastChangeTimeStamp)
        //     return row;
        // }));
        //
        //
        //
        //
        // const columnDefs = []
        //
        // columnDefs.push({minWidth: 150, headerName: "کد سفارش", field: "ticketNumber"})
        // columnDefs.push({minWidth: 150, headerName: "عنوان سفارش", field: "title"})
        // columnDefs.push({minWidth: 150, headerName: "توضیح", field: "description"})
        // columnDefs.push({minWidth: 150, headerName: "تاریخ ثبت ", field: "dateCreate"})
        // columnDefs.push({minWidth: 150, headerName: "تاریخ آخرین تغییر ", field: "lastChangeDate"})
        // columnDefs.push({minWidth: 150, headerName: "کاربر ثبت کننده سفارش", field: "userCreateThisOrder"})
        // columnDefs.push({minWidth: 150, headerName: "تعداد فایل ضمیمه ", field: "numberOfAttachments"})
        //
        //
        // const rowData = [...myList]

        const list = await defineTable({
            req, conditionString: 'ReadSentTicketController',// readTicketController
            ticketUserId: userId,
        })

        res.status(200).json({
            list, message: 'لیست بارگزاری شد.',
        });
        return;

    } catch (error:any) {

        res.status(500).json({error:error.toString()});
        return
    }


};

export {ReadSentTicketController};
