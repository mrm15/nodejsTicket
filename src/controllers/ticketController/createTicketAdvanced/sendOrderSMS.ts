import {sendSmsAfterSubmitOrder} from "../../../SMS/SMS.IR/sendSms";

export const sendOrderSMS = (mobile: string, customerName: string, orderTitle: string, orderNumber: number) => {
    setTimeout(async () => {
        await sendSmsAfterSubmitOrder({
            mobile,
            customerName,
            orderTitle,
            orderNumber
        });
    }, 60000);
};
