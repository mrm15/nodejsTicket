import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {calculateTodayReport} from "../../utils/calculateTodayReport";
import {
    sendSMSAdminChaleniumSuedi,
    sendSMSAdminLaserDouble, sendSMSAdminNeon, sendSMSAdminPlastic,
    sendSMSAdminSMD,

} from "../../SMS/SMS.IR/sendSms";
import {destinationPhoneNumberArray} from "../../utils/cronFunctions/destinationPhoneNumber";
import {logEvents} from "../../utils/logEvents";
import {sendReportDaySMSToSomeOfUsers} from "../../utils/cronFunctions/sendReportDaySMSToSomeOfUsers";
import {addLog} from "../../utils/logMethods/addLog";


const getTodayReportSms = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(200).json({message});
        return
    }

    try {
          await sendReportDaySMSToSomeOfUsers()


        if (true) {
            await addLog({
                req: req,
                name: myToken?.UserInfo?.userData?.userData?.name + " " + myToken?.UserInfo?.userData?.userData?.familyName,
                phoneNumber: req?.myToken?.phoneNumber || "00000000000",
                description: `پیامک دستی به کاربران ارسال کرد
            `,
                statusCode: 200,
            })
            res.status(200).json({
                // calculateTodayReportResult,
                message: 'تسک انجام شد.',
            })
            return;
        }

    } catch (error: any) {
        await addLog({
            req: req,
            name: myToken?.UserInfo?.userData?.userData?.name + " " + myToken?.UserInfo?.userData?.userData?.familyName,
            phoneNumber: req?.myToken?.phoneNumber || "00000000000",
            description: `خطا در ارسال پیامک دستی به کاربران 
            `,
            statusCode: 500,
            error,
        })
        res.status(500).json({error: error?.toString()});
        return
    }
}

export {getTodayReportSms};
