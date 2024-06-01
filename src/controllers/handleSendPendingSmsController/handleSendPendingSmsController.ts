import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {IsmsPending, SmsPending} from "../../models/smsPending";
import {getCurrentTimeStamp} from "../../utils/timing";
import {sendSms, sendSms1} from "../../utils/sendSms";
import {SmsArchive} from "../../models/smsArchive";
const runFunction = async () => {

    // here I should connect to pending sms
    // if a sms is in pending  try to send it and if it sended  added it to archive sms
    const resultOfValues = {
        statusCode: 200,
        message: "thanks",
    }


    const allOfMyPendingSms: IsmsPending | null = await SmsPending.find({}).lean()

    if (!allOfMyPendingSms) {
        resultOfValues.statusCode = 200
        resultOfValues.message = "جدول خالیه"
        return resultOfValues;
    }

    const myResultSmSList = await Promise.all(allOfMyPendingSms.map(async (singleSMS: IsmsPending) => {

        const row: any = {...singleSMS};
        // check Status
        if (singleSMS.status === 'pending') {

            // try to send SMS
            const resultOfSendSMS = await sendSms1(singleSMS.text, singleSMS.destinationNumber);
            console.log(resultOfSendSMS)
            if (resultOfSendSMS) {
                try{
                    const currentTime = getCurrentTimeStamp()
                    row.sendTimeStamp = currentTime;
                    row.counter = singleSMS.counter + 1
                    row.status = 'sent'
                    row.updateAt = currentTime;

                    delete  row._id
                    await SmsArchive.create(row);
                    //
                    // // Remove from SmsPending table
                    await SmsPending.deleteOne({ _id: singleSMS._id });
                    return 1;
                }catch (error){
                    console.log(error)
                    return 0;
                }
            } else {
                row.counter = singleSMS.counter + 1;
                row.updateAt = getCurrentTimeStamp();
                row.counter = singleSMS.counter + 1;
                row.updateAt = getCurrentTimeStamp();
                // if tries more than 10   change status to "error"

                await SmsPending.updateOne({ _id: singleSMS._id }, row);
                return 0;
            }
        }
        return 0;
        // const ticketFound: ITicket = (await Ticket.findOne({_id: row._id}).exec())!;
        // ticketFound.assignedToDepartmentId = departmentId
        // if (user !== '') {
        //     ticketFound.assignToUserId = user
        // }
        // return await ticketFound.save();
    }));



    const countSendSmsArray = myResultSmSList.filter(row=>row===1);
    const sentCount = countSendSmsArray.length


    return {
        statusCode: 200,
        message: ` تعداد ${sentCount}   پیامک ارسال شد`,
    }
}
const handleSendPendingSmsController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {




    //i want to know if time is  between 7 until 21      if yes i want to do my task
    const currentTime = getCurrentTimeStamp();
    const currentHour = currentTime.getHours();
    if (currentHour >= 7 && currentHour < 23) {
        const {statusCode, message} = await runFunction();
        res.status(statusCode).json({message: message})
        //res.status(200).json({message: "message"})
        return

    } else {
        res.status(200).json({
            message: 'بازه زمانی پیامک نیست'
        })
        return
    }


};

export {handleSendPendingSmsController};


