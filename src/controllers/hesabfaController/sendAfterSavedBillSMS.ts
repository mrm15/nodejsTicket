import {AdminSettings, IAdminSettings} from "../../models/adminSettings";
import {setForSendMessage} from "../../utils/setForSendMessage";
import {afterSubmitBillSmsText} from "../../SMS/template";
import {IInitialBillResponse} from "../utility/initialBillResponse";

export const sendAfterSavedBillSMS = async (billData: any) => {
    const adminSettingsResult: IAdminSettings | null = await AdminSettings.findOne({}).lean();

    if (!adminSettingsResult) {
        return false
    }
    if (adminSettingsResult.sendSMSAfterVerifyBill) {

        let text = afterSubmitBillSmsText.text;

        const siteUrl = process.env.SITE_ADDRESS
        if (!siteUrl) {
            throw new Error('Invalid API_KEY: Environment variable API_KEY is missing');
        }


        const itemLink = siteUrl + "showBill/" + billData.Number;
        text = text.replace(afterSubmitBillSmsText.replaceItems[0], billData.ContactTitle);
        text = text.replace(afterSubmitBillSmsText.replaceItems[1], itemLink);

        debugger

        const {smsStatusCode, resultSmsMessage} = await setForSendMessage({
            senderUserId: null,
            senderDepartmentId: null,
            text,
            replyId: null,
            destinationNumber: billData.Contact.Mobile,
        })
        if (smsStatusCode === 200) {
            return true

        }
    }
    return false


}