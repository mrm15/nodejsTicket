import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
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

        const userInfo = await getUserByPhoneNumber(phoneNumber)

        // const {
        //     tokens, createAt, id, accountingCode, departmentId, role, ...rest
        // } = userInfo

        const rest = {
            name: userInfo.name,
            familyName: userInfo.familyName,
            userName: userInfo.userName,
        }

        res.status(200).json({
            data: rest, message: 'لیست بارگزاری شد.',
        });
        return;

    } catch (error) {

        res.status(500).json({error});
        return
    }


};

export {getUserInfo};
