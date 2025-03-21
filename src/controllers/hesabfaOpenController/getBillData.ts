import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {IUser, User} from "../../models/User";
import axios from "axios";
import {handleResponse} from "../utility/handleResponse";


const getBillData = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {billNumber} =  req.params;

    // console.log(billNumber)

    const API_KEY = process.env.HESABFA_API_KEY
    if(!API_KEY){
        res.status(500).json({message:'api key یافت نشد'});
        return
    }
    const LOGIN_TOKEN = process.env.HESABFA_LOGIN_TOKEN
    if(!LOGIN_TOKEN){
        res.status(500).json({message:'LOGIN TOKEN یافت نشد'});
        return
    }

    if(!billNumber){
        const message = 'مقدار شماره فاکتور معتبر نیست'
        res.status(500).json({message});
        return
    }

    // const {myToken} = req;
    // if (!myToken) {
    //     const message = 'مقدار توکن توی ری کوئست موجود نیست'
    //     res.status(200).json({message});
    //     return
    // }


    try {


        // const arrayListToCheck = [
        //     ACCESS_LIST.SMS_SEND
        // ]
        // const hasAccessTo = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck})
        //
        // if (!hasAccessTo) {
        //     res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'})
        //     return
        // }


        // const {userId} = myToken?.UserInfo?.userData?.userData;
        //
        // const foundUser: IUser | null = await User.findOne({_id: userId}).lean();
        //
        //
        // if (!foundUser) {
        //     res.status(401).json({message: 'کاربری با این شماره تلفن یافت نشد'});
        //     return
        // }


        // دریافت تمام محصولات از حسابفا

        try {
            const url = 'https://api.hesabfa.com/v1/invoice/get'
            const data = {
                apiKey: API_KEY,
                // userId: 'mail@example.com',
                // password: '123456',
                loginToken: LOGIN_TOKEN,
                number: billNumber+"",
                type: 0
            }
            const result = await axios.post(url, data);

            // console.log(result)
            handleResponse(result,res)
        } catch (error:any) {
            const statusCode = error?.status || 500
            res.status(statusCode).json({
                message1: error?.toString(),
                message: 'خطا در دریافت اطلاعات از حسابفا',
            })
            return;
        }

    } catch (error) {

        res.status(500).json({error});
        return
    }


};

export {getBillData};
