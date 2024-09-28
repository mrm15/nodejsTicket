import {Request, Response, NextFunction} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {getDataCollection} from "../utility/collectionsHandlers/getDataCollection";
import {Ticket} from "../../models/ticket";
import {convertIdsToName} from "../utility/convertTicketDataToName/convertIdsToName";


const readTicketController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {



    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    try {
        const arrayListToCheck = [ACCESS_LIST.TICKET_READ_ALL]
        const hasAccessToReadAllTicket = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck})
        if (!hasAccessToReadAllTicket) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
            return
        }

        debugger
        const myResult = await getDataCollection(req.body,Ticket);

        // #1001 search 1001
        const myResultAfterChange =await convertIdsToName(myResult)

        res.status(200).json(myResultAfterChange);
        return;

    } catch (error: any) {

        res.status(500).json({error:  error.toString() +  ' موردی در  دریافت اطلاعات رخ داد.'});
        return
    }


};

export {readTicketController};
