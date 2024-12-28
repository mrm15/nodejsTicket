import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {IUser, User} from "../../models/User";
import {openTagDataChangeStatus} from "../utility/collectionsHandlers/openTagData";
import {sendSMSBasteBandi} from "../../SMS/SMS.IR/sendSms";
import {hesabfaApiRequest} from "../utility/hesabfa/functions";
import {logEvents} from "../../utils/logEvents";
import {getCurrentTimeStamp} from "../../utils/timing";

const billStatusNumber = {
    BASTED_BANDI: "5710",
    TASFIE_SHODE: "5711",
    TASFIE_NASHODE: "5714",
    PEIGIRI_SHODE: "5715",
    AMADE_ERSAL: "5712",
    ERSAL_SHODE: "5713",
}

const updateBillStatus = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    if (!myToken) {
        res.status(200).json({message: 'مقدار توکن توی ری کوئست موجود نیست'});
        return;
    }

    try {
        // اینجا باید دسترسی رو چک کنم
        // const hasAccessTo = await checkAccessList({
        //     phoneNumber: myToken.phoneNumber,
        //     arrayListToCheck: [ACCESS_LIST.basteBandi]
        // });
        //
        // if (!hasAccessTo) {
        //     res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
        //     return;
        // }

        const userId = myToken?.UserInfo?.userData?.userData?.userId;
        const foundUser: IUser | null = await User.findOne({_id: userId}).lean();

        if (!foundUser) {
            res.status(401).json({message: 'کاربری با این شماره تلفن یافت نشد'});
            return;
        }

        const {invoice, statusNumber, description} = req.body;

        if (!invoice?.ContactCode) {
            res.status(500).json({message: 'کد مشتری برای این فاکتور تعریف نشده است.'});
            return;
        }

        if (!invoice || !statusNumber) {
            res.status(500).json({message: 'مقدارهای مورد نیاز ورودی در بدنه درخواست وجود ندارد.'});
            return;
        }

        const url = 'invoice/save';
        const lastTag =  invoice.Tag
        const newTag = openTagDataChangeStatus({lastTag, statusNumber, description});
        const newInvoice = {...invoice, Tag: newTag};

        const result = await hesabfaApiRequest(url, {invoice: newInvoice})

        if (result.response?.data.Result) {
            const mobile = result.response.data.Result.Contact.Mobile;
            const ContactTitle = result.response.data.Result.ContactTitle;
            const currentTimeStamp = getCurrentTimeStamp();
            const dateString = new Date(currentTimeStamp).toLocaleString('fa-ir');
            const userFullName = `${foundUser.name} ${foundUser.familyName}`;
            const logMessage = `${currentTimeStamp}\t${dateString}\t${foundUser._id}\t${userFullName} billNumber: ${invoice.Number} changed Tag From ${lastTag} to ${newTag}. ${ContactTitle}\t${mobile}\t`;
            await logEvents(logMessage, "changeStatusBillEvents.txt");
            let message = " وضعیت فاکتور تغییر کرد"



            if (mobile && ContactTitle) {

                if (statusNumber === billStatusNumber.BASTED_BANDI) {
                    const smsResult = await sendSMSBasteBandi({mobile, ORDERNAME: ContactTitle});
                    if (smsResult.status) {
                        message += " پیامک ارسال شد";
                    } else {
                        message += " پیامک ارسال نشد.";
                    }
                }
                if (statusNumber === billStatusNumber.ERSAL_SHODE) {
                    // const smsResult = await sendSMSBasteBandi({mobile, ORDERNAME: ContactTitle});
                    // if (smsResult.status) {
                    //     message += " پیامک ارسال شد";
                    // } else {
                    //     message += " پیامک ارسال نشد.";
                    // }
                }
            }


            res.status(200).json({message, res: result.response.data.Result});
            return;
        } else {
            res.status(500).json({message: result?.response?.data?.ErrorMessage});
            return;
        }

    } catch (error: any) {
        const statusCode = error?.status || 500;
        res.status(statusCode).json({message: error?.toString()});
        return;
    }
};

export {updateBillStatus};
