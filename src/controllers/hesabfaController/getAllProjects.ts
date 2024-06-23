import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {IUser, User} from "../../models/User";
import {setForSendMessage} from "../../utils/setForSendMessage";
import axios from "axios";
import {handleResponse} from "./utility/handleResponse";


const getAllProjects = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    debugger

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
            const url = 'https://api.hesabfa.com/v1/setting/GetProjects'
            const data = {
                apiKey: 'Snr0mPXZCmFoRzzqQG5Dv8C1kPJKf4J8',
                // userId: 'mail@example.com',
                // password: '123456',
                loginToken: '387d64b1ff9052d6ceb3d39c4df8eb27f87ebbb0a535a23931ec800b03304bc56de3eba0b94569ab15508a4c1ad19a9c',
            }
            const result = await axios.post(url, data);
            debugger
            console.log(result)
            handleResponse(result,res)
        } catch (error:any) {
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

export {getAllProjects};
