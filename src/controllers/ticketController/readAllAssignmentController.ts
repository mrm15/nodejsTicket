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
import getUserByPhoneNumber from "../../utils/functions/getUserByPhoneNumber";
import {IUser} from "../../models/User";

const readAllAssignmentController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    try {


        // Fetch tickets
        const myTicketAssignment = await getDataCollection(req.body, TicketAssignment)


        myTicketAssignment.results = await Promise.all(myTicketAssignment.results.map(async (singleAssignment: ITicketAssignment) => {
            const ticketFound: ITicket = (await Ticket.findOne({_id: singleAssignment.ticketId}).lean())!;
            return {
                ...singleAssignment,
                ...ticketFound
            }
        }));
        const updatedTickets = await convertIdsToName(myTicketAssignment)
        return res.status(200).json(updatedTickets);
    } catch (error: any) {

        res.status(500).json({error: error.toString()});
        return
    }


};

export {readAllAssignmentController};
