import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {IUser, User} from "../../models/User";
import axios from "axios";
import {openTagDataForBasteBandi, openTagDataForErsal} from "../utility/collectionsHandlers/openTagData";


const changeSentStatus = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


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
            ACCESS_LIST.basteBandi
        ]
        const hasAccessToBasteBandi = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck})

        if (!hasAccessToBasteBandi) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'})
            return
        }


        const {userId} = myToken?.UserInfo?.userData?.userData;

        const foundUser: IUser | null = await User.findOne({_id: userId}).lean();


        if (!foundUser) {
            res.status(401).json({message: 'کاربری با این شماره تلفن یافت نشد'});
            return
        }


        const {invoice,ersalDescription,statusNumber,sentDate,} = req.body;

        if (!invoice.ContactCode) {
            res.status(500).json({message: 'کد مشتری برای این کاربر تعریف نشده است.'});
            return
        }
        if (!invoice || !statusNumber || !sentDate) {

            res.status(500).json({message: 'مقدارهای مورد نیاز ورودی در بدنه درخواست وجود ندارد.'});
            return
        }


        try {
            const url = ' https://api.hesabfa.com/v1/invoice/save'
            const newTag = openTagDataForErsal({
                lastTag: invoice.Tag,
                description: ersalDescription,
                statusNumber,
                sentDate
            })
            const newInvoice = {
                ...invoice,
                Tag: newTag
            }


            const data = {
                apiKey: API_KEY,
                // userId: 'mail@example.com',
                // password: '123456',
                loginToken: LOGIN_TOKEN,
                invoice: newInvoice
            }

            const result = await axios.post(url, data);

            // خب فاکتور توی حسابفا ثبت شد حالا ما باید اطلاعات فاکتور رو توی دیتا بیس خودمون ثبت کنیم.

            if (result.data.Result) {
                try {
                    res.status(200).json({
                        message: "تغییرات ثبت شد!",
                    })
                    return;
                } catch (error) {
                    res.status(500).json({
                        message: error?.toString(),
                    })
                    return;
                }
            } else {
                // console.log(result?.data)
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

export {changeSentStatus};
