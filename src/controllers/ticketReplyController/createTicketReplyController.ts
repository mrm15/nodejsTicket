import {Request, Response, NextFunction} from 'express';

import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";

import {ITicketReply, TicketReply} from "../../models/ticketReply";
import {getCurrentTimeStamp} from "../../utils/timing";
import {ITicket, Ticket} from "../../models/ticket";
import {User} from "../../models/User";
import {Department} from "../../models/department";
import {generateRefreshToken} from "../LoginRegisterSms/generateAccessToken";
import {uuidGenerator} from "../../utils/uuidGenerator";


const createTicketReplyController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const ticketId = (((await Ticket.findOne({}).exec())!)['_id']);
    const userId = (((await User.findOne({}).exec())!)['_id']);
    const departmentId = (((await Department.findOne({}).exec())!)['_id']);
    const description = ' توضیحات تستی من  ' + uuidGenerator();

    const dataToInsertInTicketReplyCollection = {
        ticketId,
        userId,
        departmentId,
        description,
        replyDate: getCurrentTimeStamp(),
        attachments: [],
        visibleToUser: true,
        createAt: getCurrentTimeStamp(),
        updateAt: getCurrentTimeStamp(),

    }




    try {

        const result = await TicketReply.create(dataToInsertInTicketReplyCollection)
        res.status(200).json({
            message: 'ظاهرا ثبت شد.',
            dataToInsertInTicketReplyCollection,
            result
        });
        return
    } catch (error) {
        res.status(500).json({
            message: error?.toString(),
            error
        });
        return
    }

};

export {createTicketReplyController};
