import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import getUserByPhoneNumber from "../../utils/functions/getUserByPhoneNumber";
import {addLog} from "../../utils/logMethods/addLog";


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

        const {
            tokens,
            createAt,
            id,
            accountingCode,
            departmentId,
            role,
            tasks,
            // tickets,
            // isActive,
            loginCode,
            loginCodeSendDate,
            updateAt,
            // __v,
            ...rest
        } = userInfo


        await addLog({
            req: req,
            name: userInfo?.name + " " + userInfo?.familyName,
            phoneNumber: phoneNumber,
            description: `
                مشخصات خودشو دریافت کرد.
                
               ${JSON.stringify(userInfo)}
                `,
            statusCode: 200,
            responseTime: null,
            error: null,
        })
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
