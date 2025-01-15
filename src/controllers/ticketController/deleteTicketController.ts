import {Response, NextFunction} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import path from 'path';
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import deleteSingleTicket from "../../utils/ticketUtils/deteleSingleTicket/deleteSingleTicket";
import {addLog} from "../../utils/logMethods/addLog";


const deleteTicketController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }
    try {

        const {id} = req.params;

        const arrayListToCheck = [ACCESS_LIST.TICKET_DELETE];
        const hasAccessTo = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck})
        if (!hasAccessTo) {
            res.status(403).json({message: 'شما مجوز دسترسی به حذف تیکت رو نداری عزیزم 😊'});
            return
        }

        const deleteTicketResult =await deleteSingleTicket(id);

        const statusCode = deleteTicketResult.status ? 200 : 500;

        const message = deleteTicketResult.message
        await addLog({
            req: req,
            name: myToken?.UserInfo?.userData?.userData?.name + " " + myToken?.UserInfo?.userData?.userData?.familyName,
            phoneNumber: req?.myToken?.phoneNumber || "00000000000",
            description: `
            حذف سفارش و پیام های سفارش و فایل های سفارش:
            
            ${message}
            
            `,
            statusCode: statusCode,
        })
        res.status(statusCode).json({message});
        return


    } catch (error: any) {
        // Handle potential errors, such as invalid ObjectId format
        res.status(500).json({message: 'Error deleting ', error: error?.message});
        return
    }


};

export {deleteTicketController};
