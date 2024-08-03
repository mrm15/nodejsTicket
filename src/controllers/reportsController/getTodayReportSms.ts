import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {calculateTodayReport} from "../../utils/calculateTodayReport";
import {sendSMSBoreshPlaxiShab} from "../../SMS/SMS.IR/sendSms";


const getTodayReportSms = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(200).json({message});
        return
    }


    try {

        const calculateTodayReportResult = await calculateTodayReport();
        // const resultOfSendSMS = await sendSMSTodayReport("09300220117","علی ",calculateTodayReportResult)
        // const resultOfSendSMS1 = await sendSMSTodayReport("09908425653","زهرای ",calculateTodayReportResult)
        const resultAli  = await sendSMSBoreshPlaxiShab({
            ...calculateTodayReportResult,
            mobile:"09384642159",
            ADMINNAME:"محمد",
        })

        // // ارسال پیامک به رضا سرایی فقط  چلنیوم و سوئدی ارسال میشه توی قالب خودش
        // const res31 = await sendSMSAdminChaleniumSuedi({ ...calculateTodayReportResult, mobile: "09125662506" , ADMINNAME:"رضا سرایی  ", })
        // const re99 = await sendSMSAdminLaserDouble({ ...calculateTodayReportResult, mobile: "09126544833" , ADMINNAME:"ایمان  ", })
        // // ارسال پیامک به محمد شمس که فقط تعداد نور بهش پیامک میشه
        // const res5 = await sendSMSAdminSMD({ ...calculateTodayReportResult, mobile: "09369576409" , ADMINNAME:"محمد شمس  ", })
        // // ارسال پیامک به علی رجنی بخش پلاستیک که فقط طبق قالب خودش فقط آمار پلاستیک پیامک میشه
        // const res6 = await sendSMSAdminPlastic({ ...calculateTodayReportResult, mobile: "09304774849" , ADMINNAME:"علی رجنی  ", })
        // // ارسال پیامک به مهدی افتاده بخش نئون که فقط طبق قالب خودش فقط آمار نئون پیامک میشه
        // const res7 = await sendSMSAdminNeon({ ...calculateTodayReportResult, mobile: "09304774849" , ADMINNAME:"مهدی افتاده  ", })







        if (resultAli) {
            res.status(200).json({
                calculateTodayReportResult,
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
