import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {calculateTodayReport} from "../../utils/calculateTodayReport";
import {
    sendSMSAdminChaleniumSuedi,
    sendSMSAdminLaserDouble, sendSMSAdminNeon, sendSMSAdminPlastic,
    sendSMSAdminSMD,
    sendSMSBoreshPlaxiShab
} from "../../SMS/SMS.IR/sendSms";
import {destinationPhoneNumberArray} from "../../utils/cronFunctions/destinationPhoneNumber";
import {logEvents} from "../../utils/logEvents";
import {sendReportDaySMSToSomeOfUsers} from "../../utils/cronFunctions/sendReportDaySMSToSomeOfUsers";


const getTodayReportSms = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(200).json({message});
        return
    }


    // const calculateTodayReportResult = await calculateTodayReport();

    try {
          await sendReportDaySMSToSomeOfUsers()


        // debugger
        // const smsPromises = destinationPhoneNumberArray.map(({name, phoneNumber, renderFunction}) => {
        //     return renderFunction({...calculateTodayReportResult, mobile: phoneNumber, ADMINNAME: name});
        // });
        //
        // const results = await Promise.all(smsPromises);
        //
        // const message = `پیامک گزارش برای مخاطبین ارسال شد
        //     ${destinationPhoneNumberArray.map(({phoneNumber}) => phoneNumber).join(',\n')}
        // `;
        // await logEvents(message, "smsReportEveryDay.txt");

        // console.log("All SMS sent successfully:", results);


        if (true) {
            res.status(200).json({
                // calculateTodayReportResult,
                message: 'تسک انجام شد.',
            })
            return;
        }
        // else {
        //     res.status(500).json({message: "پیام ارسال نشد!!!"});
        //     return
        // }
        /////////////////////////////////////////

    } catch (error: any) {
        res.status(500).json({error: error?.toString()});
        return
    }
}

export {getTodayReportSms};
