import {
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
        name: "مهدی افتاده ",
        phoneNumber: "09015296569",
        renderFunction:sendSMSAdminNeon
    },
    {
        name: "امیر ",
        phoneNumber: "09164566794",
        renderFunction:sendSMS_VARAQ_ANBAR
    },



]