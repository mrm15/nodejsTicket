import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {IUser, User} from "../../models/User";
import {setForSendMessage} from "../../utils/setForSendMessage";
import axios from "axios";
import {handleResponse} from "../utility/handleResponse";


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
        const hasAccessTo = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck})

        if (!hasAccessTo) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'})
            return
        }


        const {userId} = myToken?.UserInfo?.userData?.userData;

        const foundUser: IUser | null = await User.findOne({_id: userId}).lean();


        if (!foundUser) {
            res.status(401).json({message: 'کاربری با این شماره تلفن یافت نشد'});
            return
        }

        debugger
        const {invoice} = req.body;
        if (!invoice) {
            res.status(500).json({message: 'مقدار invoice  در بدنه درخواست وجود ندارد.'});
            return
        }

        const test1 = {
            Number: '',
            Reference: '',
            Date: '2024-06-27 09:38:12',//
            DueDate: '2024-06-27 09:38:12',//
            ContactCode: '000001',
            Note: 'یادداشت تستی',
            InvoiceType: 0,
            Status: 0, // پیش نویس
            Tag: 'تگ تستی', // تگ تستی
            InvoiceItems: [{
                Id: 321654,
                Description: 'test',
                ItemCode: '000313',
                Unit: 'متر طول',
                Quantity: 1,
                UnitPrice: 50, // مبلغی که ارسال میشه سمت بک و محاسبات بک اند بر همین اسا انجام میشه
                Discount: 0,
                Tax: 9000,

            }],
            Others: [],
            Currency: "IRT", // IRR rial  , IRT  Toman
            TaxId: "",
            CurrencyRate: 1.0000000000
        }

        // دریافت تمام محصولات از حسابفا
        try {
            const url = ' https://api.hesabfa.com/v1/invoice/save'
            const data = {
                apiKey: API_KEY,
                // userId: 'mail@example.com',
                // password: '123456',
                loginToken: LOGIN_TOKEN,
                invoice
            }
            const result = await axios.post(url, data);
            debugger
            console.log(result)
            handleResponse(result, res);

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
