import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {NextFunction, Response} from "express";
import {IUser, User} from "../../models/User";
import axios from "axios";
import {handleResponse} from "../utility/handleResponse";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {deleteOneBillFromTicketOrTicketReply} from "./functions";
import {logEvents} from "../../middleware/logEvents";

const getBillList = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {
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

        // const hasAccess = await checkAccessList({
        //     phoneNumber: myToken.phoneNumber,
        //     arrayListToCheck: [ACCESS_LIST.DELETE_BILL]
        // });
        //
        // if (!hasAccess) {
        //     return res.status(403).json({message: 'You do not have permission to delete this bill'});
        // }

        const {userId} = myToken?.UserInfo?.userData?.userData;
        const foundUser: IUser | null = await User.findOne({_id: userId}).lean();

        if (!foundUser) {
            return res.status(401).json({message: 'User not found'});
        }

        const {queryInfo} = req.body
        // if (!queryInfo.Take && !queryInfo.Skip) {
        //     res.status(500).json({message: "مقدار دیتا معتبر نیست"});
        //     return
        // }

        const hesabfaUrl = 'https://api.hesabfa.com/v1/invoice/getinvoices';
        const data = {
            apiKey: API_KEY,
            loginToken: LOGIN_TOKEN,
            type: 0, // Only sales invoices (type 0)
            queryInfo,
        }

        const result = await axios.post(hesabfaUrl, data);
        handleResponse(result, res)


    } catch (error: any) {
        return res.status(500).json({message: error.message});
    }
};

export {getBillList};
