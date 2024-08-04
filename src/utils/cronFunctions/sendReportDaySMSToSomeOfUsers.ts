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

export const sendReportDaySMSToSomeOfUsers = async () => {


    const calculateTodayReportResult = await calculateTodayReport();

    // ارسال پیامک به جواد سرایی
    const res1 = await sendSMSBoreshPlaxiShab({ ...calculateTodayReportResult, mobile: "09126970541" , ADMINNAME:"جواد ", })// ارسال پیامک به جواد سرایی
    // ارسال پیامک کلی به ایمان
    const res1222 = await sendSMSBoreshPlaxiShab({ ...calculateTodayReportResult, mobile: "09126544833" , ADMINNAME:"جواد ", })

    // ارسال پیامک به ایمان که فقط استیل و فلز پیامک میشه طبق قالب خودش
    // const re4 = await sendSMSAdminEstilFelez({ ...calculateTodayReportResult, mobile: "09126544833" , ADMINNAME:"ایمان  ", })


    // ارسال پیامک به  محمد میرعرب
    const res2 = await sendSMSBoreshPlaxiShab({ ...calculateTodayReportResult, mobile: "09384642159" , ADMINNAME:"محمد ", })

    // ارسال پیامک به  علی پسرخاله
    const res555 = await sendSMSBoreshPlaxiShab({ ...calculateTodayReportResult, mobile: "09300220117" , ADMINNAME:"علی پسرخاله  ", })

    // زهرا بیرنگ
    const res66 = await sendSMSBoreshPlaxiShab({ ...calculateTodayReportResult, mobile: "09908425653" , ADMINNAME:"زهرای   ", })


    // // ارسال پیامک به رضا سرایی فقط  چلنیوم و سوئدی ارسال میشه توی قالب خودش
    const res31 = await sendSMSAdminChaleniumSuedi({ ...calculateTodayReportResult, mobile: "09125662506" , ADMINNAME:"رضا سرایی  ", })
    //
    //
    // علی سمیعی
    const re99 = await sendSMSAdminLaserDouble({ ...calculateTodayReportResult, mobile: "09392325775" , ADMINNAME:"علی سمیعی  ", })
    //
    // // ارسال پیامک به محمد شمس که فقط تعداد نور بهش پیامک میشه
    const res5 = await sendSMSAdminSMD({ ...calculateTodayReportResult, mobile: "09369576409" , ADMINNAME:"محمد شمس  ", })
    //
    //
    // // ارسال پیامک به علی رجنی بخش پلاستیک که فقط طبق قالب خودش فقط آمار پلاستیک پیامک میشه
    const res6 = await sendSMSAdminPlastic({ ...calculateTodayReportResult, mobile: "09304774849" , ADMINNAME:"علی رجنی  ", })
    //
    // // ارسال پیامک به مهدی افتاده بخش نئون که فقط طبق قالب خودش فقط آمار نئون پیامک میشه
    const res7 = await sendSMSAdminNeon({ ...calculateTodayReportResult, mobile: "09304774849" , ADMINNAME:"مهدی افتاده  ", })





    const message = `پیامک گزارش برای مخاطبین ارسال شد
        09126970541,
        09126544833,
        09384642159,
        09300220117,
        09908425653,
        09125662506,
        09392325775,
        09369576409,
        09304774849,
        09304774849,
        
    `;
    await logEvents(message, "smsReportEveryDay.txt")
}