import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {IUser, User} from "../../models/User";
import axios from "axios";
import {handleResponse} from "../utility/handleResponse";
import {forwardTicketAfterVerify, saveFactorNumberAndStatus} from "./functions";
import {sendAfterSavedBillSMS} from "./sendAfterSavedBillSMS";
import {AdminSettings, IAdminSettings} from "../../models/adminSettings";
import {hesabfaApiRequest} from "../utility/hesabfa/functions";
import {sendSubmitBillSMS_NoTicketId} from "../../SMS/SMS.IR/sendSms";
import {timestampToTimeFromHesabfa} from "../utility/timestampToTimeFromHesabfa";
import {formatNumber} from "../../utils/number";
import {p2e} from "../utility/NumericFunction";
import sleep from "../../utils/sleep";


const submitBillInHesabfa = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {




    await sleep(900*1000)
    res.status(200).json({message:"مود تستی بود!!"})
    return;


};

export {submitBillInHesabfa};
