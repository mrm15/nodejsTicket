import {Request, Response, NextFunction} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {userTicketTable} from "../../utils/userTicketTable";

const readMyAllTicketsController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    try {
        const arrayListToCheck = [ACCESS_LIST.TICKET_READ_OWN_RECEIVED]
        const hasAccessToReadReceived = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck})
        if (!hasAccessToReadReceived) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
            return
        }
        // میتونستم از روی شماره تلفن یوزرآیدی رو بگیرم اما اینجا ترجیح دادم اینطوری کنم و از توی توکن بردارم.
        const list = await userTicketTable({userId: myToken.UserInfo.userData.userData.userId})


        res.status(200).json({
            list, message: 'لیست بارگزاری شد.',
        });
        return;

    } catch (error: any) {

        res.status(500).json({error: error.toString()});
        return
    }


};

export {readMyAllTicketsController};
