import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";

import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";

import {IRole, Role} from "../../models/roles";
import {Department} from "../../models/department";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {TicketReply} from "../../models/ticketReply";


const deleteTicketReplyController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }
    try {
        const arrayListToCheck = [
            ACCESS_LIST.fatherAccess
        ]
        const hasAccessTo = await checkAccessList({phoneNumber:myToken.phoneNumber, arrayListToCheck})
        if (!hasAccessTo) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
            return
        }

        const {id} = req.params;


        // Attempt to find and delete the user by ID
        const deletedTicketReply = await TicketReply.findByIdAndDelete(id);

        // Check if a user was found and deleted
        if (!deletedTicketReply) {
            res.status(404).json({message: 'TicketReply not found'});
            return
        }


        // Successfully deleted the user
        res.status(200).json({message: `پیام حذف شد`,});
        return
    } catch (error: any) {
        // Handle potential errors, such as invalid ObjectId format
        res.status(500).json({message: 'Error deleting ', error: error?.message});
        return
    }


};

export {deleteTicketReplyController};
