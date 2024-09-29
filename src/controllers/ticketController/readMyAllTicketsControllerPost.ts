import {Request, Response, NextFunction} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {userTicketTable} from "../../utils/userTicketTable";
import {getDataCollection} from "../utility/collectionsHandlers/getDataCollection";
import {Ticket} from "../../models/ticket";

const readMyAllTicketsControllerPost = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    try {
        const arrayListToCheck = [ACCESS_LIST.TICKET_READ_OWN]
        const hasAccessToReadReceived = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck})
        if (!hasAccessToReadReceived) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
            return
        }
        // اینجا باید برم توی جدول تیکت های ارجاعی رو نگاه کنم که این کاربر چه تیکت هایی داره.
        // تیکت ها رو بردارم و بر از توی جدول تیکت ها پیداشون کنم تا لیت کنم.  این کار رو با توجه به اینکه صفحه بندی دارم انجام میدم. که کم_کم بفرستم سمت فرانت
        // که این تابع مقایدر رو میگیره
        //const myResult = await getDataCollection(req.body,MyTableName);
        // یه تابع میخوام که  بره توی جدول  تیکت ها سرچ کنه و مقدار خوانده شده و خوانده نشده رو تبدیل کنه واسه فرانت و بعدش بفرستمش سمت فرانت
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

export {readMyAllTicketsControllerPost};
