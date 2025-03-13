import axios from "axios";
import {cutTextForSmsIR} from "./cutTextForSms";

export type SendSmsMethodType = "smsIR" | "nikSMS";
export const getSendSMSMethod = (): SendSmsMethodType => {
    return "smsIR"
    // return "nikSMS"
}
interface singleParam {
    name:string,
    value:any
}
interface inputTypes {
    "mobile": string;
    "templateId": string;
    "parameters": singleParam[];
}

// Define the return type interface
export interface SendSmsResponse {
    status: boolean;
    messageId: string;
    message?: string; // Optional because it might not always be present
}

const myApiKey: string = `48Q30RepX0qVRyTtPUGvfJevRKfHNoOqWmMO5BYQFdHOQpaWHViy799peS4ygupD`
export const sendSmsFromSMSIR = async ({mobile, templateId, parameters}: inputTypes): Promise<SendSmsResponse> => {
    // Process each parameter's value using cutTextForSmsIR
    const processedParameters = parameters.map((param:singleParam) => ({
        ...param,
        value: cutTextForSmsIR(param?.value)
    }));
    const data = JSON.stringify({
        "mobile": mobile,
        "templateId": templateId,
        "parameters": processedParameters,
        // "parameters":
        //     [
        //     {name: 'PARAMETER1', value: '000000'},
        //     {name: 'PARAMETER2', value: '000000'}
        // ],
    });

    const config = {
        method: 'post',
        url: 'https://api.sms.ir/v1/send/verify',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-api-key': myApiKey
        },
        data: data
    };

    try {

        const response = await axios(config);
        if (response.status === 200) {

            return {
                status: true,
                messageId: response.data.data.messageId,
                message: response.data.message
            }
        } else {

            return {
                status: false,
                messageId: "",
                message: "status Code : " + response?.status
            }
        }

    } catch (error: any) {

        return {
            status: false,
            messageId: error?.response?.data?.message,
            message: "پیامک ارسال نشد",
        }
    }
    // axios(config)
    //     .then(function (response) {
    //         console.log(JSON.stringify(response.data));
    //         return {
    //             status: false,
    //             messageId: response.data?.messageId
    //         }
    //     })
    //     .catch(function (error) {
    //         return {
    //             status: false,
    //             messageId: "",
    //         }
    //     });
}
export const sendLoginSMS = async ({mobile, loginCode}: any) => {

    const LOGINCODEWITHHASHTAG = `#${loginCode}`
    return await sendSmsFromSMSIR({
        // توی تملیت آیدی براش متن تعریف شده
        mobile: mobile, templateId: "844695", parameters: [
            {
                "name": "LOGINCODE",
                "value": loginCode
            },
            {
                "name": "LOGINCODEWITHHASHTAG",
                "value": LOGINCODEWITHHASHTAG
            },
        ]
    })
}
export const sendSubmitBillSMS = async ({mobile, contactName, billLink}: any) => {
    return await sendSmsFromSMSIR({
        // توی تملیت آیدی براش متن تعریف شده
        mobile: mobile, templateId: "969918", parameters: [
            {
                "name": "CONTACTNAME",
                "value": contactName
            },
            {
                "name": "BILLLINK",
                "value": billLink
            }
        ]
    })
}
export const sendVerifyBillSMS = async ({mobile, contactName, orderName, orderPrice, DATE, orderNumber}: any) => {


    const result = await sendSmsFromSMSIR({
        // توی تملیت آیدی براش متن تعریف شده
        mobile: mobile, templateId: "808848", parameters: [
            {
                "name": "CONTACTNAME",
                "value": contactName
            },
            {
                "name": "OrderNumber",
                "value": orderNumber
            },
            {
                "name": "ORDERNAME",
                "value": orderName
            },
            {
                "name": "ORDER_PRICE",
                "value": orderPrice
            },
            {
                "name": "DATE",
                "value": DATE
            },

        ]
    })

    return result
}
export const sendPackageSMS = async ({mobile, contactName, orderNumber}: any) => {
    return await sendSmsFromSMSIR({
        // توی تملیت آیدی براش متن تعریف شده
        mobile: mobile, templateId: "306042", parameters: [
            {
                "name": "CONTACTNAME",
                "value": contactName
            },
            {
                "name": "BILLNUMBER",
                "value": orderNumber
            },
        ]
    })
}

export const sendSMSBoreshPlaxiShab = async ({
                                                 mobile,
                                                 ADMINNAME,
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
                                                 SMD,
                                                 STICKER_OJRAT,
                                                 AMAR_VARAQ_Estil,
                                                 PLAKSI_Varaq,
                                                 AMAR_PVC,


                                             }: any) => {
    return await sendSmsFromSMSIR({
        // توی تملیت آیدی براش متن تعریف شده
        mobile: mobile, templateId: "593633", parameters: [
            {
                "name": "ADMINNAME",
                "value": ADMINNAME
            },
            {
                "name": "plaksi2_8Value",
                "value": plaksi2_8Value
            },
            {
                "name": "simplePunchValue",
                "value": simplePunchValue
            },
            {
                "name": "proPunchValue",
                "value": proPunchValue
            },
            {
                "name": "doubleValue",
                "value": doubleValue
            },
            {
                "name": "duqi10milValue",
                "value": duqi10milValue
            },

            {
                "name": "duqi5milValue",
                "value": duqi5milValue
            },
            {
                "name": "ESTILFELEZ",
                "value": ESTILFELEZ
            },
            {
                "name": "CHALANDSUEDI",
                "value": CHALANDSUEDI
            },
            {
                "name": "NEONPLASTIC",
                "value": NEONPLASTIC
            },
            {
                "name": "NEONFELAXI",
                "value": NEONFELAXI
            },
            {
                "name": "SMD",
                "value": SMD
            },
            {
                "name": "STICKER_OJRAT",
                "value": STICKER_OJRAT
            },
            {
                "name": "AMAR_VARAQ_Estil",
                "value": AMAR_VARAQ_Estil
            },
            {
                "name": "PLAKSI_Varaq",
                "value": PLAKSI_Varaq
            },
            {
                "name": "AMAR_PVC",
                "value": AMAR_PVC
            },
        ]
    })
}
export const sendSMSAdminNeon = async ({
                                           mobile,
                                           ADMINNAME,
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
                                           SMD,
                                           STICKER_OJRAT,

                                       }: any) => {
    return await sendSmsFromSMSIR({
        // توی تملیت آیدی براش متن تعریف شده
        mobile: mobile, templateId: "573552", parameters: [
            {
                "name": "ADMINNAME",
                "value": ADMINNAME
            },
            {
                "name": "plaksi2_8Value",
                "value": plaksi2_8Value
            },
            {
                "name": "simplePunchValue",
                "value": simplePunchValue
            },
            {
                "name": "proPunchValue",
                "value": proPunchValue
            },
            {
                "name": "doubleValue",
                "value": doubleValue
            },
            {
                "name": "duqi10milValue",
                "value": duqi10milValue
            },

            {
                "name": "duqi5milValue",
                "value": duqi5milValue
            },
            {
                "name": "ESTILFELEZ",
                "value": ESTILFELEZ
            },
            {
                "name": "CHALANDSUEDI",
                "value": CHALANDSUEDI
            },
            {
                "name": "NEONPLASTIC",
                "value": NEONPLASTIC
            },
            {
                "name": "NEONFELAXI",
                "value": NEONFELAXI
            },
            {
                "name": "SMD",
                "value": SMD
            },
            {
                "name": "STICKER_OJRAT",
                "value": STICKER_OJRAT
            },
        ]
    })
}
export const sendSMSAdminPlastic = async ({
                                              mobile,
                                              ADMINNAME,
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
                                              SMD,
                                              STICKER_OJRAT,

                                          }: any) => {
    return await sendSmsFromSMSIR({
        // توی تملیت آیدی براش متن تعریف شده
        mobile: mobile, templateId: "310149", parameters: [
            {
                "name": "ADMINNAME",
                "value": ADMINNAME
            },
            {
                "name": "plaksi2_8Value",
                "value": plaksi2_8Value
            },
            {
                "name": "simplePunchValue",
                "value": simplePunchValue
            },
            {
                "name": "proPunchValue",
                "value": proPunchValue
            },
            {
                "name": "doubleValue",
                "value": doubleValue
            },
            {
                "name": "duqi10milValue",
                "value": duqi10milValue
            },

            {
                "name": "duqi5milValue",
                "value": duqi5milValue
            },
            {
                "name": "ESTILFELEZ",
                "value": ESTILFELEZ
            },
            {
                "name": "CHALANDSUEDI",
                "value": CHALANDSUEDI
            },
            {
                "name": "NEONPLASTIC",
                "value": NEONPLASTIC
            },
            {
                "name": "NEONFELAXI",
                "value": NEONFELAXI
            },
            {
                "name": "SMD",
                "value": SMD
            },
            {
                "name": "STICKER_OJRAT",
                "value": STICKER_OJRAT
            },
        ]
    })
}
export const sendSMSAdminSMD = async ({
                                          mobile,
                                          ADMINNAME,
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
                                          SMD,
                                          STICKER_OJRAT,

                                      }: any) => {
    return await sendSmsFromSMSIR({
        // توی تملیت آیدی براش متن تعریف شده
        mobile: mobile, templateId: "368322", parameters: [
            {
                "name": "ADMINNAME",
                "value": ADMINNAME
            },
            {
                "name": "plaksi2_8Value",
                "value": plaksi2_8Value
            },
            {
                "name": "simplePunchValue",
                "value": simplePunchValue
            },
            {
                "name": "proPunchValue",
                "value": proPunchValue
            },
            {
                "name": "doubleValue",
                "value": doubleValue
            },
            {
                "name": "duqi10milValue",
                "value": duqi10milValue
            },

            {
                "name": "duqi5milValue",
                "value": duqi5milValue
            },
            {
                "name": "ESTILFELEZ",
                "value": ESTILFELEZ
            },
            {
                "name": "CHALANDSUEDI",
                "value": CHALANDSUEDI
            },
            {
                "name": "NEONPLASTIC",
                "value": NEONPLASTIC
            },
            {
                "name": "NEONFELAXI",
                "value": NEONFELAXI
            },
            {
                "name": "SMD",
                "value": SMD
            },
            {
                "name": "STICKER_OJRAT",
                "value": STICKER_OJRAT
            },
        ]
    })
}
export const sendSMSAdminEstilFelez = async ({
                                                 mobile,
                                                 ADMINNAME,
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
                                                 SMD,
                                                 STICKER_OJRAT,

                                             }: any) => {
    return await sendSmsFromSMSIR({
        // توی تملیت آیدی براش متن تعریف شده
        mobile: mobile, templateId: "477878", parameters: [
            {
                "name": "ADMINNAME",
                "value": ADMINNAME
            },
            {
                "name": "plaksi2_8Value",
                "value": plaksi2_8Value
            },
            {
                "name": "simplePunchValue",
                "value": simplePunchValue
            },
            {
                "name": "proPunchValue",
                "value": proPunchValue
            },
            {
                "name": "doubleValue",
                "value": doubleValue
            },
            {
                "name": "duqi10milValue",
                "value": duqi10milValue
            },

            {
                "name": "duqi5milValue",
                "value": duqi5milValue
            },
            {
                "name": "ESTILFELEZ",
                "value": ESTILFELEZ
            },
            {
                "name": "CHALANDSUEDI",
                "value": CHALANDSUEDI
            },
            {
                "name": "NEONPLASTIC",
                "value": NEONPLASTIC
            },
            {
                "name": "NEONFELAXI",
                "value": NEONFELAXI
            },
            {
                "name": "SMD",
                "value": SMD
            },
            {
                "name": "STICKER_OJRAT",
                "value": STICKER_OJRAT
            },
        ]
    })
}


export const sendSMSAdminChaleniumSuedi = async ({
                                                     mobile,
                                                     ADMINNAME,
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
                                                     SMD,
                                                     STICKER_OJRAT,
                                                     Only_chalenium,
                                                     Only_soedi

                                                 }: any) => {
    return await sendSmsFromSMSIR({
        // توی تملیت آیدی براش متن تعریف شده
        mobile: mobile, templateId: "772234", parameters: [
            {
                "name": "ADMINNAME",
                "value": ADMINNAME
            },
            {
                "name": "plaksi2_8Value",
                "value": plaksi2_8Value
            },
            {
                "name": "simplePunchValue",
                "value": simplePunchValue
            },
            {
                "name": "proPunchValue",
                "value": proPunchValue
            },
            {
                "name": "doubleValue",
                "value": doubleValue
            },
            {
                "name": "duqi10milValue",
                "value": duqi10milValue
            },

            {
                "name": "duqi5milValue",
                "value": duqi5milValue
            },
            {
                "name": "ESTILFELEZ",
                "value": ESTILFELEZ
            },
            {
                "name": "CHALANDSUEDI",
                "value": CHALANDSUEDI
            },
            {
                "name": "NEONPLASTIC",
                "value": NEONPLASTIC
            },
            {
                "name": "NEONFELAXI",
                "value": NEONFELAXI
            },
            {
                "name": "SMD",
                "value": SMD
            },
            {
                "name": "STICKER_OJRAT",
                "value": STICKER_OJRAT
            },
            {
                "name": "Only_soedi",
                "value": Only_soedi
            },
            {
                "name": "Only_chalenium",
                "value": Only_chalenium
            },
        ]
    })
}
export const sendSMSAdminLaserDouble = async ({
                                                  mobile,
                                                  ADMINNAME,
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
                                                  SMD,
                                                  STICKER_OJRAT,

                                              }: any) => {
    return await sendSmsFromSMSIR({
        // توی تملیت آیدی براش متن تعریف شده
        mobile: mobile, templateId: "537609", parameters: [
            {
                "name": "ADMINNAME",
                "value": ADMINNAME
            },
            {
                "name": "plaksi2_8Value",
                "value": plaksi2_8Value
            },
            {
                "name": "simplePunchValue",
                "value": simplePunchValue
            },
            {
                "name": "proPunchValue",
                "value": proPunchValue
            },
            {
                "name": "doubleValue",
                "value": doubleValue
            },
            {
                "name": "duqi10milValue",
                "value": duqi10milValue
            },

            {
                "name": "duqi5milValue",
                "value": duqi5milValue
            },
            {
                "name": "ESTILFELEZ",
                "value": ESTILFELEZ
            },
            {
                "name": "CHALANDSUEDI",
                "value": CHALANDSUEDI
            },
            {
                "name": "NEONPLASTIC",
                "value": NEONPLASTIC
            },
            {
                "name": "NEONFELAXI",
                "value": NEONFELAXI
            },
            {
                "name": "SMD",
                "value": SMD
            },
            {
                "name": "STICKER_OJRAT",
                "value": STICKER_OJRAT
            },
        ]
    })
}
export const sendSMS_VARAQ_ANBAR = async ({
                                              mobile,
                                              ADMINNAME,
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
                                              SMD,
                                              STICKER_OJRAT,
                                              AMAR_VARAQ_Estil,
                                              AMAR_PVC,
                                          }: any) => {
    return await sendSmsFromSMSIR({
        // توی تملیت آیدی براش متن تعریف شده
        mobile: mobile, templateId: "265359", parameters: [
            {
                "name": "ADMINNAME",
                "value": ADMINNAME
            },
            {
                "name": "AMAR_VARAQ",
                "value": AMAR_VARAQ_Estil
            },
            {
                "name": "AMAR_PVC",
                "value": AMAR_PVC
            },
        ]
    })
}

export const sendSMSBasteBandi = async ({
                                            mobile,
                                            ORDERNAME,
                                        }: any) => {

    ORDERNAME = cutTextForSmsIR(ORDERNAME)
    return await sendSmsFromSMSIR({
        // توی تملیت آیدی براش متن تعریف شده
        mobile: mobile, templateId: "636474", parameters: [
            {
                "name": "ORDERNAME",
                "value": ORDERNAME
            },


        ]
    })
}


export const sendSubmitBillSMS_NoTicketId = async ({
                                                       mobile,
                                                       ORDERNAME,
                                                       ORDER_PRICE,
                                                       DATE
                                                   }: any) => {
    ORDERNAME = cutTextForSmsIR(ORDERNAME)

    return await sendSmsFromSMSIR({
        // توی تملیت آیدی براش متن تعریف شده
        mobile: mobile, templateId: "354225", parameters: [
            {
                "name": "ORDERNAME",
                "value": ORDERNAME
            },
            {
                "name": "ORDER_PRICE",
                "value": ORDER_PRICE
            },
            {
                "name": "DATE",
                "value": DATE
            },


        ]
    })
}
export const sendSMS_OJRAT_BORESH_CNC = async ({
                                                   mobile,
                                                   ADMINNAME,
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
                                                   SMD,
                                                   STICKER_OJRAT,
                                                   AMAR_VARAQ_Estil,
                                                   AMAR_PVC,
                                                   OJRAT_BORESH_CNC,

                                               }: any) => {
    return await sendSmsFromSMSIR({
        // توی تملیت آیدی براش متن تعریف شده
        mobile: mobile, templateId: "286617", parameters: [
            {
                "name": "ADMINNAME",
                "value": ADMINNAME
            },
            {
                "name": "OJRAT_BORESH_CNC",
                "value": OJRAT_BORESH_CNC
            },
        ]
    })
}
export const sendSmsAfterSubmitOrder = async ({
                                                  mobile,
                                                  customerName,
                                                  orderTitle,
                                                  orderNumber

                                              }: any) => {
    return await sendSmsFromSMSIR({
        // توی تملیت آیدی براش متن تعریف شده
        mobile: mobile, templateId: "322874", parameters: [
            {
                "name": "customerName",
                "value": cutTextForSmsIR(customerName)
            },
            {
                "name": "orderTitle",
                "value": cutTextForSmsIR(orderTitle)
            },
            {
                "name": "orderNumber",
                "value": orderNumber
            },
        ]
    })
}

