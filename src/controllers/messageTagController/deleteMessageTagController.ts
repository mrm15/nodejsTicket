import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";
import {File, IFile} from "../../models/files";
import {getCurrentTimeStamp} from "../../utils/timing";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {addNewUserF} from "../LoginRegisterSms/addNewUserF";
import {uuidGenerator} from "../../utils/uuidGenerator";
import {getUserInfoByPhoneNumber} from "../LoginRegisterSms/getUserInfoByPhoneNumber";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {IRole, Role} from "../../models/roles";
import {ITicket, Ticket} from "../../models/ticket";
import {ITicketReply, TicketReply} from "../../models/ticketReply";
import {messageTag} from "../../models/messageTag";


const deleteMessageTagController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }
    try {

        const {id} = req.params;
        try {
            // فعلا که دقیق داره کار مینه الما بعدا باید تگ رو ست کنم و بعدش حذف رو چک کنم.
            const foundTickets: ITicket | null = await Ticket.findOne({messageTag: id}).exec()
            const foundTicketReply: ITicketReply | null = await TicketReply.findOne({messageTag: id}).exec()

            if (foundTickets || foundTicketReply) {
                res.status(409).json({
                    message: `برای حذف تگ باید ابتدا  پیام هایی که این تگ را دارند حذف کنید!!!.🙄`
                });
                return
            }

        } catch (error: any) {
            res.status(500).json({message: 'Error deleting user', error: error?.message});
            return
        }

        // Attempt to find and delete the user by ID
        const deletedTag = await messageTag.findByIdAndDelete(id);

        // Check if a user was found and deleted
        if (!deletedTag) {
            res.status(404).json({message: 'Tag not found'});
            return
        }

        // Successfully deleted the user
        res.status(200).json({message: `تگ پیام  با نام ${deletedTag.name} برای همیشه حذف شد.`,});
        return
    } catch (error: any) {
        // Handle potential errors, such as invalid ObjectId format
        res.status(500).json({message: 'Error deleting TAG MESSAGE', error: error?.message});
        return
    }


};

export {deleteMessageTagController};
