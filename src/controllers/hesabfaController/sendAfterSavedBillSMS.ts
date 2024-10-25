import {AdminSettings, IAdminSettings} from "../../models/adminSettings";
import {afterSubmitBillSmsText, afterVerifiedBillSmsText} from "../../SMS/template";
import {IInitialBillResponse} from "../utility/initialBillResponse";
import {sendSubmitBillSMS, sendVerifyBillSMS} from "../../SMS/SMS.IR/sendSms";

export const sendAfterSavedBillSMS = async (billData: any, adminSettings: IAdminSettings) => {


    // Determine if the bill is verified
    const isBillVerified = (billData.Status === "1" || billData.Status === 1);

    // Function to send SMS
    const sendSMS = async (typeOfSendMessage: "submitBill" | "verifyBill") => {
        const siteUrl = process.env.SITE_ADDRESS;
        if (!siteUrl) {
            throw new Error('Invalid SITE_ADDRESS: Environment variable SITE_ADDRESS is missing');
        }

        const itemLink = `${siteUrl}s/${billData.Number}`;
        const destinationNumber = billData.Contact.Mobile;
        const contactName = billData.ContactTitle;
        const billLink = itemLink
        let orderNumber = billData?.ticketNumber;
        let sendSmsResult;

        if (typeOfSendMessage === "submitBill") {
            sendSmsResult = await sendSubmitBillSMS(
                {mobile: destinationNumber, contactName, billLink}
            )
        } else {
            sendSmsResult = await sendVerifyBillSMS(
                {mobile: destinationNumber, contactName, billLink, orderNumber}
            )
        }

        sendSmsResult.status
    };

    // Send SMS based on the bill status and settings
    if (isBillVerified && adminSettings.sendSMSAfterSubmitBill) {
        return await sendSMS("verifyBill");
    } else if (adminSettings.sendSMSAfterVerifyBill) {
        return await sendSMS("submitBill");
    }

    return false;
};
