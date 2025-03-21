import {sendSubmitBillSMS, sendVerifyBillSMS} from "../../SMS/SMS.IR/sendSms";
import {formatNumber} from "../../utils/number";
import {timestampToTimeFromHesabfa} from "../utility/timestampToTimeFromHesabfa";
import {p2e} from "../utility/NumericFunction";

export const sendAfterSavedBillSMS = async ({billResult, adminSettings, ticketNumber}: any) => {
        const billData = billResult
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
            const orderName = billData.ContactTitle ?? ""
            const Sum = billData.Sum
            const orderPrice = formatNumber(Sum)

            let billDate = timestampToTimeFromHesabfa(billData?.Date)?.split(",")[0]
            billDate = p2e(billDate)
            let the_user_name = billData.Contact.Name ?? "کاربر عزیز";


            ////////////////////////////////////////

            if (typeOfSendMessage === "submitBill") {
                sendSmsResult = await sendSubmitBillSMS(
                    {mobile: destinationNumber, contactName, billLink}
                )
            } else {
                debugger
                sendSmsResult = await sendVerifyBillSMS(
                    {
                        mobile: destinationNumber,
                        contactName: the_user_name,
                        orderName: orderName,
                        orderPrice,
                        DATE: billDate,
                        orderNumber: ticketNumber
                    }
                )
            }

            sendSmsResult.status
        };

        if (isBillVerified) {
            if (adminSettings.sendSMSAfterVerifyBill) {
                return await sendSMS("verifyBill");
            }
        } else {
            if (adminSettings.sendSMSAfterSubmitBill) {
                return await sendSMS("submitBill");
            }
        }
        return false;
    }
;
