import {Request, Response, NextFunction} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {userTicketTable} from "../../utils/userTicketTable";
import {inboxTicketList} from "../../utils/inboxTicketList";
import {Department, IDepartment} from "../../models/department";
import {departmentTickets} from "../../utils/getDepartmentTicketList";
import mongoose from "mongoose";
import getDepartmentByPhoneNumber from "../../utils/functions/getDepartmentByPhoneNumber";
import {ITicketAssignment, TicketAssignment} from "../../models/ticketAssignment ";
import {getDataCollection} from "../utility/collectionsHandlers/getDataCollection";
import {ITicket, Ticket} from "../../models/ticket";
import {convertIdsToName} from "../utility/convertTicketDataToName/convertIdsToName";

const readDepartmentTicketsController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    try {

        // اینجا میتونم چک کنم آیا این کاربر ادمین یک دپارتمان هست یا خیر؟
        // بعدش میتونم چک کنم ادمین هر دپارتمانی هست همون دپارتمان تیکت هاشو از ارجاعات بگیرم بفرستم واسه فرانت

        // ولی اینجا فقط به دپارتمان کاربر نگاه میکنم و تیکت های اون دپارتمانی که کاربر درخواست داده بود میفرستم سمت فرانت
        // توی فرانت این صفحه فقط در صورتی نمایش داده میشه که کاربر ادمین دپارتمان باشه.
        const foundDepartment: IDepartment = await getDepartmentByPhoneNumber(myToken.phoneNumber)
        const filters = req.body.filters || [];
        filters.push({
            property: 'assignedToDepartmentId',
            value: foundDepartment._id,
        });
        filters.push({
            property: 'isDeleteDestination',
            value: false,
        });
        req.body.filters = filters;

        // Fetch tickets
        const myTicketAssignment = await getDataCollection(req.body, TicketAssignment)

        let updatedTickets = myTicketAssignment

        myTicketAssignment.results = await Promise.all(myTicketAssignment.results.map(async (singleAssignment: ITicketAssignment) => {
            const ticketFound: ITicket = (await Ticket.findOne({_id: singleAssignment.ticketId}).lean())!;
            return {
                ...singleAssignment,
                ...ticketFound
            }
        }))
        updatedTickets = await convertIdsToName(myTicketAssignment)
        return res.status(200).json(updatedTickets);
    } catch (error: any) {

        res.status(500).json({error: error.toString()});
        return
    }


};

export {readDepartmentTicketsController};
