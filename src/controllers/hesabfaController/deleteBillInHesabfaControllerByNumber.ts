import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {NextFunction, Response} from "express";
import {IUser, User} from "../../models/User";
import axios from "axios";
import {handleResponse} from "../utility/handleResponse";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {deleteOneBillFromTicketOrTicketReply} from "./functions";
import {logEvents} from "../../middleware/logEvents";
import {hesabfaApiRequest} from "../utility/hesabfa/functions";
import {addLog} from "../../utils/logMethods/addLog";

const deleteBillInHesabfaControllerByNumber = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {
    try {
        const {myToken} = req;
        if (!myToken) {
            return res.status(200).json({message: 'Token not found in the request'});
        }

        const hasAccess = await checkAccessList({
            phoneNumber: myToken.phoneNumber,
            arrayListToCheck: [ACCESS_LIST.DELETE_BILL]
        });

        if (!hasAccess) {
            return res.status(403).json({message: 'شما دسترسی حذف فاکتور رو ندارید!'});
        }

        const {userId} = myToken?.UserInfo?.userData?.userData;
        const foundUser: IUser | null = await User.findOne({_id: userId}).lean();

        if (!foundUser) {
            return res.status(401).json({message: 'User not found'});
        }

        const {billNumber} = req.params;

        if (!billNumber) {
            return res.status(500).json({message: 'Invalid bill number, ID, or type'});
        }


        const myRes = await hesabfaApiRequest("invoice/delete", {
            type: 0, // Only sales invoices (type 0)
            number: billNumber
        })

        const result = myRes.response

        if (result?.data?.Result === true) {

            await addLog({
                req: req,
                name: myToken?.UserInfo?.userData?.userData?.name + " " + myToken?.UserInfo?.userData?.userData?.familyName,
                phoneNumber: req?.myToken?.phoneNumber || "00000000000",
                description: `فاکتو رو حذف کرد از توی لیست فاکتور ها.
                    ${result?.data}
                    `,
                statusCode: 200,
            })
            const logMessage = `factor az hesabfa hazf shod shomareFactor: ${billNumber},  phoneNumberUserWhoDeleteBill: ${foundUser.phoneNumber} \t${req.url}\t`
            await logEvents(logMessage, 'deletedFromHesabfaButNotFromSite.txt')
            return res.status(200).json({message: 'فاکتور حذف شد'})

        } else {
            // اگه اینجا دیدم توی حسابفا اصلا وجود نداره این فاکتور میتونم از توی سیستم خودمم حذف کنم.  باشه واسه بعد!
            // حدفغ میزنم که وفتی ارور 112 رو میده ینی فاکتور وجود نداره و باید از توی سیستم خودمونم حذفش کنم که بعدا میرم سراغ بهبودش
            return res.status(500).json({message: 'حذف فاکتور ناموفق بود.', data: result?.data});
        }

    } catch (error: any) {
        return res.status(500).json({message: error.message});
    }
};

export {deleteBillInHesabfaControllerByNumber};
