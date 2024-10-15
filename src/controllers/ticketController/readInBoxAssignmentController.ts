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
import getSimpleData from "../../utils/ticketAssigmentHepler/readInBoxAssignmentController/getSimpleData";
import getDataByAggregation2
    from "../../utils/ticketAssigmentUtils/readDepartmentTicketsControllerUtils/getDataByAggregation2";

const readInBoxAssignmentController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    try {

        /***/
        const foundUser: IUser = await getUserByPhoneNumber(myToken.phoneNumber)
        const filters = req.body.filters || [];
        filters.push({
            property: 'assignedToUserIdText',
            operator:"=",
            value: foundUser.name + " " + foundUser.familyName, //  توی خروجی داریم نام و نام خانوداگی زو میکس میکنم میفرستیم و اینحا هم باید  میکس کنیم که دقیقا مساوی رو بتونیم بگیریم.
        })
        filters.push({
            property: 'isDeleteDestination',
            value: false,
        });

        const updatedTickets = await getDataByAggregation2({
            filters:filters,
            page:req.body.page,
            pageSize:req.body.pageSize
        })

        return res.status(200).json(updatedTickets);


    } catch (error: any) {

        res.status(500).json({error: error.toString()});
        return
    }


};

export {readInBoxAssignmentController};
