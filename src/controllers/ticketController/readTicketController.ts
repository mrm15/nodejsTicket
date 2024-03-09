import {Request, Response, NextFunction} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {defineTable} from "../../utils/defineTable";


const readTicketController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    // اینجا باید چک کنم ببینم آیا پارامتر ست شده یا نه؟
    // اگه پارامتر ست شده بود.
    // باید چک کنم ببینم چه پارامتری ست شده؟
    // طبق پارامتر باید فقط تیکت هایی رو نشون بدم که کاربر بهشون دسترسی داره؟

    //اگه پارامتری نداشت باید کل تیکت ها رو نشون بدم و قبلش دسترسی رو هم چک کنم.
    // یا کل تیکت ها رو نشون بدم؟
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


        const list = await defineTable({
            req, conditionString: 'readTicketController',
            ticketUserId: '',
        })

        res.status(200).json({
            list, message: 'لیست بارگزاری شد.',
        });
        return;

    } catch (error: any) {

        res.status(500).json({error: error.toString()});
        return
    }


};

export {readTicketController};
