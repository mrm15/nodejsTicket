import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {NextFunction, Response} from "express";
import {IUser, User} from "../../models/User";
import axios from "axios";
import {handleResponse} from "../utility/handleResponse";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {deleteOneBillFromTicketOrTicketReply} from "./functions";
import {logEvents} from "../../middleware/logEvents";

const deleteBillInHesabfaController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {
    try {
        const API_KEY = process.env.HESABFA_API_KEY;
        const LOGIN_TOKEN = process.env.HESABFA_LOGIN_TOKEN;

        if (!API_KEY || !LOGIN_TOKEN) {
            return res.status(500).json({message: 'API key or LOGIN TOKEN not found'});
        }

        const {myToken} = req;
        if (!myToken) {
            return res.status(200).json({message: 'Token not found in the request'});
        }

        const hasAccess = await checkAccessList({
            phoneNumber: myToken.phoneNumber,
            arrayListToCheck: [ACCESS_LIST.DELETE_BILL]
        });

        if (!hasAccess) {
            return res.status(403).json({message: 'You do not have permission to delete this bill'});
        }

        const {userId} = myToken?.UserInfo?.userData?.userData;
        const foundUser: IUser | null = await User.findOne({_id: userId}).lean();

        if (!foundUser) {
            return res.status(401).json({message: 'User not found'});
        }

        const {billNumber, id, type} = req.params;
        const validTypes = (type === "ticket" || type === "ticketReply");

        if (!billNumber || !id || !validTypes) {
            return res.status(500).json({message: 'Invalid bill number, ID, or type'});
        }

        const hesabfaUrl = 'https://api.hesabfa.com/v1/invoice/delete';
        const data = {
            apiKey: API_KEY,
            loginToken: LOGIN_TOKEN,
            type: 0, // Only sales invoices (type 0)
            number: billNumber
        }

        const result = await axios.post(hesabfaUrl, data);

        if (result.data.Result === true) {
            const deleteResult = await deleteOneBillFromTicketOrTicketReply({billNumber, id, type});
            if (deleteResult) {
                return res.status(200).json({message: 'فاکتور حذف شد'});
            } else {
                await logEvents(`factor Delete From Hesabfa Not From WebSite${req.url}\ttype\t${type}\tid\t${id}`, 'deletedFromHesabfaButNotFromSite.txt')
                return res.status(200).json({message: 'فاکتور فقط از حسابداری حذف شد'});
            }
        } else {
            // اگه اینجا دیدم توی حسابفا اصلا وجود نداره این فاکتور میتونم از توی سیستم خودمم حذف کنم.  باشه واسه بعد!
            // حدفغ میزنم که وفتی ارور 112 رو میده ینی فاکتور وجود نداره و باید از توی سیستم خودمونم حذفش کنم که بعدا میرم سراغ بهبودش
            return res.status(500).json({message: 'حذف فاکتور ناموفق بود.', data: result.data});
        }

    } catch (error: any) {
        return res.status(500).json({message: error.message});
    }
};

export {deleteBillInHesabfaController};
