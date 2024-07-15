import axios from "axios";

export type SendSmsMethodType = "smsIR" | "nikSMS";
export const getSendSMSMethod = (): SendSmsMethodType => {
    return "nikSMS"
}

interface inputTypes {
    "mobile": string;
    "templateId": string;
    "parameters": {}[];
}

// Define the return type interface
interface SendSmsResponse {
    status: boolean;
    messageId: string;
    message?: string; // Optional because it might not always be present
}

const myApiKey: string = `I999QekubH6pbxonIw6hH3WgRnCedQwPk9op5xUhZTDgP6RlkUsZWMOyIPVXvdzM`
export const sendSmsFromSMSIR = async ({mobile, templateId, parameters}: inputTypes): Promise<SendSmsResponse> => {
    const data = JSON.stringify({
        "mobile": mobile,
        "templateId": templateId,
        "parameters": parameters
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
        debugger
        const response = await axios(config);
        if (response.status === 200) {
            debugger
            return {
                status: true,
                messageId: response.data.data.messageId,
                message: response.data.message
            }
        } else {
            debugger
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
export const sendLoginSMS = async (mobile: any, loginCode: any) => {
    return await sendSmsFromSMSIR({
        // توی تملیت آیدی براش متن تعریف شده
        mobile: mobile, templateId: "678399", parameters: [{
            "name": "LOGINCODE",
            "value": loginCode
        }]
    })
}
export const sendSubmitFactorSMS = async (mobile: any, loginCode: any) => {
    return await sendSmsFromSMSIR({
        // توی تملیت آیدی براش متن تعریف شده
        mobile: mobile, templateId: "678399", parameters: [{
            "name": "LOGINCODE",
            "value": loginCode
        }]
    })
}


    