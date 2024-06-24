import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {IUser, User} from "../../models/User";
import {setForSendMessage} from "../../utils/setForSendMessage";
import axios from "axios";
import {handleResponse} from "../utility/handleResponse";
import 'dotenv/config';



const getAllProducts = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

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


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(200).json({message});
        return
    }


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


        const {userId} = myToken?.UserInfo?.userData?.userData;

        const foundUser: IUser | null = await User.findOne({_id: userId}).lean();


        if (!foundUser) {
            res.status(401).json({message: 'کاربری با این شماره تلفن یافت نشد'});
            return
        }


        // دریافت تمام محصولات از حسابفا




        try {

            const url = 'https://api.hesabfa.com/v1/item/getitems'
            const data = {
                apiKey: API_KEY,
                // userId: 'mail@example.com',
                // password: '123456',
                loginToken: LOGIN_TOKEN,
                queryInfo: {
                    SortBy: 'Code',
                    SortDesc: true,
                    Take: 10000,
                    Skip: 0,
                    Filters: []
                }
            }

            debugger
            const result = await axios.post(url, data);
            debugger
            console.log(result)
            handleResponse(result,res)

        } catch (error:any) {
            res.status(500).json({
                message: error?.toString(),
            })
            return;
        }



    } catch (error) {

        res.status(500).json({error});
        return
    }


};

export {getAllProducts};
