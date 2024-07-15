import {AdminSettings, IAdminSettings} from "../../models/adminSettings";
import {setForSendMessage} from "../../utils/setForSendMessage";
import {afterSubmitBillSmsText, afterVerifiedBillSmsText} from "../../SMS/template";
import {IInitialBillResponse} from "../utility/initialBillResponse";

export const sendAfterSavedBillSMS = async (billData: any, adminSettings: IAdminSettings) => {


    // Determine if the bill is verified
    const isBillVerified = (billData.Status === "1" || billData.Status === 1);

    // Function to send SMS
    const sendSMS = async (textTemplate: string) => {
        const siteUrl = process.env.SITE_ADDRESS;
        if (!siteUrl) {
            throw new Error('Invalid SITE_ADDRESS: Environment variable SITE_ADDRESS is missing');
        }

        const itemLink = `${siteUrl}showBill/${billData.Number}`;
        let text = textTemplate.replace(afterSubmitBillSmsText.replaceItems[0], billData.ContactTitle);
        text = text.replace(afterSubmitBillSmsText.replaceItems[1], itemLink);

        const {smsStatusCode, resultSmsMessage} = await setForSendMessage({
            senderUserId: null,
            senderDepartmentId: null,
            text,
            replyId: null,
            destinationNumber: billData.Contact.Mobile,
        });

        return smsStatusCode === 200;
    };

    // Send SMS based on the bill status and settings
    if (isBillVerified && adminSettings.sendSMSAfterSubmitBill) {
        return await sendSMS(afterVerifiedBillSmsText.text);
    } else if (adminSettings.sendSMSAfterSubmitBill) {
        return await sendSMS(afterSubmitBillSmsText.text);
    }

    return false;
};
