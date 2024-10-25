import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {IUser, User} from "../../models/User";
import axios from "axios";
import {handleResponse} from "../utility/handleResponse";
import {forwardTicketAfterVerify, saveFactorNumberAndStatus} from "./functions";
import {sendAfterSavedBillSMS} from "./sendAfterSavedBillSMS";
import {AdminSettings, IAdminSettings} from "../../models/adminSettings";
import {hesabfaApiRequest} from "../utility/hesabfa/functions";
import {sendSubmitBillSMS_NoTicketId} from "../../SMS/SMS.IR/sendSms";
import {timestampToTimeFromHesabfa} from "../utility/timestampToTimeFromHesabfa";
import {formatNumber} from "../../utils/number";
import {p2e} from "../utility/NumericFunction";


const submitBillInHesabfa = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const API_KEY = process.env.HESABFA_API_KEY
    if (!API_KEY) {
        res.status(500).json({message: 'api key یافت نشد'});
        return
    }
    const LOGIN_TOKEN = process.env.HESABFA_LOGIN_TOKEN
    if (!LOGIN_TOKEN) {
        res.status(500).json({message: 'LOGIN TOKEN یافت نشد'});
        return
    }


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(200).json({message});
        return
    }


    try {


        const arrayListToCheck = [
            ACCESS_LIST.SUBMIT_BILL_IN_SUBMIT_ORDER_FORM
        ]
        const hasAccessTo11 = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck})

        if (!hasAccessTo11) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'})
            return
        }


        const {userId} = myToken?.UserInfo?.userData?.userData;

        const foundUser: IUser | null = await User.findOne({_id: userId}).lean();


        if (!foundUser) {
            res.status(401).json({message: 'کاربری با این شماره تلفن یافت نشد'});
            return
        }


        const {invoice, billData} = req.body;
        if (!invoice.ContactCode) {
            res.status(500).json({message: 'کد مشتری برای این کاربر تعریف نشده است.'});
            return
        }

        if (!invoice
            // || !billData
            // || !billData.billType
            // || billData.ticketId === ""
        ) {

            res.status(500).json({message: 'مقدارهای مورد نیاز ورودی در بدنه درخواست وجود ندارد.'});
            return
        }


        const adminSettings = await AdminSettings.findOne({}).lean()!
        const isSendSmsWhenVerifyBill = adminSettings?.sendSMSAfterVerifyBill


        try {

            //
            const url = '/invoice/save'
            // const data = {
            //     apiKey: API_KEY,
            //     // userId: 'mail@example.com',
            //     // password: '123456',
            //     loginToken: LOGIN_TOKEN,
            //     invoice
            // }
            //
            // const result = await axios.post(url, data);
            const apiRes = await hesabfaApiRequest(url, {invoice});
            const result = apiRes?.response


            // خب فاکتور توی حسابفا ثبت شد حالا ما باید اطلاعات فاکتور رو توی دیتا بیس خودمون ثبت کنیم.

            if (result?.data?.Success) {
                try {
                    //خب اینجا توی حسابفا تغییر وضعیت انجام شد
                    // اینجا در صورتی که تیکت آیدی وجود داشت که ینی داریم یک سفارش رو که توی سایت ثبت شده تایید میکنیم
                    // در صورتی که  تیکت آیدی نداشت ینی صرفا توی شبکه داخلی نمارنگ هست و فقط داریم فاکتور رو تایید یا پیش نویس میکنم. پس باید به مشتری اگه شماره داره پیامک بدم
                    if (billData.ticketId) {
                        /*
                        این قسمت رو بعدا بازنویسی کن
                                                // این قسمت رو باید دوباره بازنویسی کنم و دقیقتر چک کنم.

                        */

                        const isSavedFactor = await saveFactorNumberAndStatus(result.data.Result, billData);
                        if (isSavedFactor) {
                            const adminSettings: IAdminSettings | null = await AdminSettings.findOne({}).lean();
                            if (!adminSettings) {
                                return false;
                            }
                            const isSentSMS = await sendAfterSavedBillSMS(result.data.Result, adminSettings)
                            // اگه فاکتور تایید شده بود. باید تیکت رو بفرستم به دپارتمان مربوط به نود گیری. این فرآیند خودکار انجام میشه
                            // در واقع اگه دپارتمان مقصد تعریف شده بود و نال نبود باید تیکت رو بفرستیم بره به دپارتمان نود گیری

                            if ((adminSettings.forwardTicketsAfterVerify && invoice.Status === 1) || (adminSettings.forwardTicketsAfterVerify && invoice.Status === "1")) {
                                await forwardTicketAfterVerify({
                                    depId: adminSettings.forwardTicketsAfterVerify,
                                    billData
                                })
                            }
                            handleResponse(result, res)
                        }
                    } else {
                        // اگه مشتری شماره تماس داشت
                        //  باید یه پیامک به مشتری بفرستم که فاکتور شما تایید یا پیش نویس شد

                        if (result?.data?.Result) {
                            let message = "";
                            const CustomerMobile = result?.data?.Result.Contact?.Mobile

                            const invoiceStatus = result?.data?.Result.Status
                            const ORDERNAME = result?.data?.Result.ContactTitle
                            const Sum = result?.data?.Result.Sum
                            const ORDER_PRICE = formatNumber(Sum)
                            let date = result?.data?.Result?.Date
                            date = timestampToTimeFromHesabfa(date)?.split(",")[0]
                            date = p2e(date)

                            if (invoiceStatus === 1) {

                                message += "فاکتور تایید شد."
                                // چون اینجا شماره تیکت نداریم قالب ارسال پیامکی بدون تیکت هست

                                if (CustomerMobile !== "" && isSendSmsWhenVerifyBill) {
                                    const smsRes = await sendSubmitBillSMS_NoTicketId({
                                        mobile: CustomerMobile,
                                        // mobile: "09384642159",
                                        ORDERNAME,
                                        ORDER_PRICE,
                                        DATE: date,
                                    })
                                    if (smsRes.status) {
                                        message += "پیامک ارسال شد"
                                    }
                                }


                                res.status(200).json({message})
                                return;


                            } else if (invoiceStatus === 0) {
                                message += "فاکتور پیش نویس شد."
                                res.status(200).json({message})
                                return;
                            } else {
                                res.status(200).json({
                                    message: " تایید شد.", // اما مقدار استاتوس 0 یا یک نیست
                                })
                                return;
                            }
                        } else {
                            res.status(500).json({
                                message: "مقدار بازگشتی از حسابفا معتبر نیست",
                            })
                            return;
                        }


                    }


                } catch (error) {
                    res.status(500).json({
                        message: error?.toString(),
                    })
                    return;
                }
            } else {
                console.log(result?.data)
                res.status(500).json({
                    message: result?.data?.ErrorMessage
                })
                return;
            }


        } catch (error: any) {
            const statusCode = error?.status || 500
            res.status(statusCode).json({
                message: error?.toString(),
            })
            return;
        }

    } catch (error) {

        res.status(500).json({error});
        return
    }


};

export {submitBillInHesabfa};
