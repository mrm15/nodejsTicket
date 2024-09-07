import {calculateTodayReport} from "../calculateTodayReport";
import {logEvents} from "../logEvents";
import {destinationPhoneNumberArray} from "./destinationPhoneNumber";
import {isHolidayToday} from "../isHolidayToday/isHolidayToday";

export const sendReportDaySMSToSomeOfUsers = async () => {
    const isHoliday = await isHolidayToday()
    if (isHoliday) {
        return
    }
    try {
        const calculateTodayReportResult = await calculateTodayReport();


        const results = await Promise.all(destinationPhoneNumberArray.map(async ({ name, phoneNumber, renderFunction }) => {

             const responseSMS = await  renderFunction({ ...calculateTodayReportResult, mobile: phoneNumber, ADMINNAME: name });
            console.log(`sms ${name}  sended`)
            return responseSMS
        }));

        const message = `پیامک گزارش برای مخاطبین ارسال شد
            ${destinationPhoneNumberArray.map(({phoneNumber}) => phoneNumber).join(',\n')}
        `;
        await logEvents(message, "smsReportEveryDay.txt");
        console.log("All SMS sent successfully:", results);
    } catch (error) {
        console.error("Error sending SMS:", error);
    }
}