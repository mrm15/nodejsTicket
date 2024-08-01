import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {NextFunction, Response} from "express";
import {IUser, User} from "../../models/User";
import axios from "axios";
import {handleResponse} from "../utility/handleResponse";
import {hesabfaApiRequest} from "../utility/hesabfa/functions";

const getBillList = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {
    try {

        const {myToken} = req;
        if (!myToken) {
            return res.status(200).json({message: 'Token not found in the request'});
        }

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

        const myData = {
            type: 0, // Only sales invoices (type 0)
            queryInfo,
        }
        const myResult = await hesabfaApiRequest("invoice/getinvoices", myData)
        if (!myResult.response) {
            return res.status(500).json({message: myResult.message});
        } else if (myResult.response) {
            handleResponse(myResult.response, res)
        }


    } catch (error: any) {
        return res.status(500).json({message: error.message});
    }
};

export {getBillList};
