import {getCurrentTimeStamp} from "./timing";
import {SmsPending} from "../models/smsPending";
import mongoose from "mongoose";

interface myArgument {
    senderUserId: string | null;
    senderDepartmentId: string | null;
    text: string | null;
    replyId: string | null;
    destinationNumber: string;
}

export const setForSendMessage = async ({
                                            senderUserId,
                                            senderDepartmentId,
                                            text,
                                            replyId,
                                            destinationNumber
                                        }: myArgument) => {

    try {
        //const result = {smsStatusCode: 200, resultSmsMessage: ""}


        //اینجا باید  برم توی جدول  پیام های پندیگ یه رکورد جدید ثبت کنم.  ولی قبلش باید تمام پارامتر های ارسال پیام رو چک کنم.
        // که شماره درست باشه،
        // اول چک کنیم که شماره با 09 شروع شده و حتما باید 11 رقم باشه

        // Check if the phone number is valid
        if (destinationNumber.length !== 11) {
            return {smsStatusCode: 500, resultSmsMessage: "شماره تلفن باید 11 رقم باشد."}
        }
        if (!destinationNumber.startsWith("09")) {
            return {smsStatusCode: 500, resultSmsMessage: "شماره تلفن باید با 09 شروع شود."}
        }

        const currentTime = getCurrentTimeStamp();
        const newPending = {
            senderUserId: senderUserId,

            senderDepartmentId: senderDepartmentId,
            sendTimeStamp: null,
            text: text,
            destinationNumber,
            counter: 0,
            status: 'pending',
            replyId: replyId,
            createAt: currentTime,
            updateAt: currentTime,


        }
        await SmsPending.create(newPending)
        return {smsStatusCode: 200, resultSmsMessage: "پیامک در لیست ارسال قرار گرفت"}
    } catch (error) {
        return {smsStatusCode: 500, resultSmsMessage: error}

    }


}