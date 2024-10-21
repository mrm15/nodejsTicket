import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {Role} from "../../models/roles";
import {User} from "../../models/User";
import getUserByPhoneNumber from "../../utils/functions/getUserByPhoneNumber";


const getUserInfo = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }





    try {
        // const userId = myToken.UserInfo.userData.userData.userId;
        const phoneNumber = myToken.phoneNumber;
debugger
        const userInfo =await getUserByPhoneNumber(phoneNumber)



        res.status(200).json({
            data:userInfo, message: 'لیست بارگزاری شد.',
        });
        return;

    } catch (error) {

        res.status(500).json({error});
        return
    }


};

export {getUserInfo};
