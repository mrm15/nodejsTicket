import {AdminSettings, IAdminSettings} from "../../models/adminSettings";
import {afterSubmitBillSmsText, afterVerifiedBillSmsText} from "../../SMS/template";
import {IInitialBillResponse} from "../utility/initialBillResponse";
import {sendSubmitBillSMS, sendVerifyBillSMS} from "../../SMS/SMS.IR/sendSms";
import {formatNumber} from "../../utils/number";
import {timestampToTimeFromHesabfa} from "../utility/timestampToTimeFromHesabfa";
import {p2e} from "../utility/NumericFunction";

export const sendAfterSavedBillSMS = async (billData: any, adminSettings: IAdminSettings) => {
    debugger

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
        // اینجا باید از توی تگ اطلاعات بیل نامبر رو بگیرم
        let orderNumber = billData?.ticketNumber;
        let sendSmsResult;
        ////////////////////////////////////////
        const orderName =billData.ContactTitle
        const Sum =billData.Sum
        const orderPrice = formatNumber(Sum)

        let billDate = timestampToTimeFromHesabfa(billData?.Date)?.split(",")[0]
        billDate = p2e(billDate)
        let the_user_name =billData.Contact.Name;


        ////////////////////////////////////////

        if (typeOfSendMessage === "submitBill") {
            sendSmsResult = await sendSubmitBillSMS(
                {mobile: destinationNumber, contactName, billLink}
            )
        } else {
            sendSmsResult = await sendVerifyBillSMS(
                // {mobile: destinationNumber, contactName, billLink, orderNumber}
            {mobile:destinationNumber, contactName:the_user_name, orderName:orderName,orderPrice,DATE:billDate, orderNumber}
            )
        }

        sendSmsResult.status
    };

    debugger
    // Send SMS based on the bill status and settings
    if (isBillVerified && adminSettings.sendSMSAfterSubmitBill) {
        return await sendSMS("verifyBill");
    } else if (adminSettings.sendSMSAfterVerifyBill) {
        return await sendSMS("submitBill");
    }

    return false;
};
