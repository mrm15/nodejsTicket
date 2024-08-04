import {calculateTodayReport} from "../calculateTodayReport";
import {
    sendSMSAdminChaleniumSuedi,
    sendSMSAdminEstilFelez, sendSMSAdminLaserDouble,
    sendSMSAdminNeon,
    sendSMSAdminPlastic,
    sendSMSAdminSMD,
    sendSMSBoreshPlaxiShab
} from "../../SMS/SMS.IR/sendSms";
import {logEvents} from "../logEvents";
import {destinationPhoneNumberArray} from "./destinationPhoneNumber";



export const sendReportDaySMSToSomeOfUsers = async () => {


    try {
        const calculateTodayReportResult = await calculateTodayReport();

        const smsPromises = destinationPhoneNumberArray.map(({ name, phoneNumber, renderFunction }) => {
            return renderFunction({ ...calculateTodayReportResult, mobile: phoneNumber, ADMINNAME: name });
        });

        const results = await Promise.all(smsPromises);

        const message = `پیامک گزارش برای مخاطبین ارسال شد
            ${destinationPhoneNumberArray.map(({ phoneNumber }) => phoneNumber).join(',\n')}
        `;
        await logEvents(message, "smsReportEveryDay.txt");

        console.log("All SMS sent successfully:", results);
    } catch (error) {
        console.error("Error sending SMS:", error);
    }
}