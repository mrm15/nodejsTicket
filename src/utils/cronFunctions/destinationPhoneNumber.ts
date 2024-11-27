import {
    sendSMS_OJRAT_BORESH_CNC,
    sendSMS_VARAQ_ANBAR,
    sendSMSAdminChaleniumSuedi,
    sendSMSAdminLaserDouble, sendSMSAdminNeon,
    sendSMSAdminPlastic, sendSMSAdminSMD,
    sendSMSBoreshPlaxiShab
} from "../../SMS/SMS.IR/sendSms";

export const destinationPhoneNumberArray = [

    {
        name: " محمد",
        phoneNumber: "09384642159",
        renderFunction: sendSMSBoreshPlaxiShab,
    },
    {
        name: "جواد",
        phoneNumber: "09126970541",
        renderFunction: sendSMSBoreshPlaxiShab
    },
    {
        name: "علی پسرخاله ",
        phoneNumber: "09300220117",
        renderFunction:sendSMSBoreshPlaxiShab
    },
    {
        name: "ایمان ",
        phoneNumber: "09126544833",
        renderFunction: sendSMSBoreshPlaxiShab
    },
    {
        name: " زهرای",
        phoneNumber: "09908425653",
        renderFunction: sendSMSBoreshPlaxiShab,
    },
    {
        name: "رضا سرایی ",
        phoneNumber: "09125662506",
        renderFunction: sendSMSAdminChaleniumSuedi
    },
    {
        name: "مهدی افتاده ",
        phoneNumber: "09015296569",
        renderFunction: sendSMSAdminLaserDouble
    },
    {
        name: " علی رجنی",
        phoneNumber: "09304774849",
        renderFunction: sendSMSAdminPlastic
    },
    {
        name: " محمد شمس",
        phoneNumber: "09369576409",
        renderFunction: sendSMSAdminSMD
    },
    {
        name: "سعید ",
        phoneNumber: "09190394755",
        // phoneNumber: "09164566794",
        renderFunction:sendSMS_VARAQ_ANBAR
    },
    {
        name: "شاهین  ",
        phoneNumber: "09363789227",
        renderFunction:sendSMS_OJRAT_BORESH_CNC
    },



]