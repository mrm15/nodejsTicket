import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {getRoleAccessList} from "../LoginRegisterSms/getRoleAccessList";
import {fillOutReportData} from "./fillOutReportData";
import {calculatePivot, formatDateForBackend, reportArray} from "../../utils/functions";
import {
    getHeaderAndRowsDetails,
    hesabfaApiRequest
} from "../utility/hesabfa/functions";
import {sendSms} from "../../utils/sendSms";
import {getCurrentTimeStamp} from "../../utils/timing";
import {sendSMSBoreshPlaxiShab} from "../../SMS/SMS.IR/sendSms";
import {calculateTodayReport} from "../../utils/calculateTodayReport";
import {sendSMSTodayReport} from "../../utils/sendSMSTodayReport";


const getTodayReportSms = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(200).json({message});
        return
    }


    try {

        const calculateTodayReportResult = await calculateTodayReport()
        const resultOfSendSMS = await sendSMSTodayReport("09300220117","علی ",calculateTodayReportResult)
        const resultOfSendSMS1 = await sendSMSTodayReport("09908425653","زهرای ",calculateTodayReportResult)

        if (resultOfSendSMS) {
            res.status(200).json({
                message: 'تسک انجام شد.',
            })
            return;
        } else {
            res.status(500).json({message: "پیام ارسال نشد!!!"});
            return
        }
        /////////////////////////////////////////

    } catch (error: any) {
        res.status(500).json({error: error?.toString()});
        return
    }
}

export {getTodayReportSms};
