import {Request, Response, NextFunction} from 'express';
import {validateTicketData} from "./createTicketAdvanced/ticketValidation";
import {checkUserAccess} from "./createTicketAdvanced/checkAccess";
import getUserByPhoneNumber from "../../utils/functions/getUserByPhoneNumber";
import {createNewTicket} from "./createTicketAdvanced/createNewTicket";
import {addTicketReply} from "./createTicketAdvanced/addTicketReply";
import {sendOrderSMS} from "./createTicketAdvanced/sendOrderSMS";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";


const createTicketAdvancedController = async (req: any, res: Response, next: NextFunction) => {
    res.status(200).json({
        message:"هورااا تست"
    })

};

export { createTicketAdvancedController };
