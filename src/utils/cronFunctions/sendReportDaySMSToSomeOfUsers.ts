import {calculateTodayReport} from "../calculateTodayReport";
import {sendSMSBoreshPlaxiShab} from "../../SMS/SMS.IR/sendSms";
import {logEvents} from "../logEvents";

export const sendReportDaySMSToSomeOfUsers = async () => {
    const sendSMSTodayReport = async (mobile: string, name: string, calculateTodayReportResult: any) => {

        const {
            plaksi2_8Value,
            simplePunchValue,
            proPunchValue,
            doubleValue,
            duqi10milValue,
            duqi5milValue,
            ESTILFELEZ,
            CHALANDSUEDI,
            NEONPLASTIC,
            NEONFELAXI,
        } = calculateTodayReportResult
        const resultOfSendSMS = await sendSMSBoreshPlaxiShab(
            {
                mobile: mobile,
                ADMINNAME: name,
                plaksi2_8Value,
                simplePunchValue,
                proPunchValue,
                doubleValue,
                duqi10milValue,
                duqi5milValue,
                ESTILFELEZ,
                CHALANDSUEDI,
                NEONPLASTIC,
                NEONFELAXI,
            }
        )

        return resultOfSendSMS
    }

    const calculateTodayReportResult = await calculateTodayReport();
    const res1 = await sendSMSTodayReport("09126970541", "جواد ", calculateTodayReportResult)
    const res2 = await sendSMSTodayReport("09384642159", "محمد ", calculateTodayReportResult)
    const re4 = await sendSMSTodayReport("09126544833", "ایمان  ", calculateTodayReportResult)
    // const re5 = await sendSMSTodayReport("09126544833", "ایمان  ", calculateTodayReportResult)


    const message = `پیامک گزارش برای مخاطبین ارسال شد
        09126970541
        09384642159
        
    `;
    await logEvents(message, "smsReportEveryDay.txt")
}