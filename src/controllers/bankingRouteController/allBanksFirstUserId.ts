import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";
import {getCurrentTimeStamp} from "../../utils/timing";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";

import getBankingDataByCode from "../../utils/banking/getBankingDataByCode/getBankingDataByCode";
import {userListAndCodes} from "../../utils/banking/getBankingDataByCode/userListAndCodes";
import {addLog} from "../../utils/logMethods/addLog";


const allBanksFirstUserId = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;

    // res.status(201).json({myToken})
    //
    // return

    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }

    try {


        const userListToCalculate = [...userListAndCodes];
        const filters11 = req.body.filterItems

        const result = await getBankingDataByCode({filters: filters11 || []}, userListToCalculate)

        await addLog({
            req: req,
            name: myToken?.UserInfo?.userData?.userData?.name + " " + myToken?.UserInfo?.userData?.userData?.familyName,
            phoneNumber: req?.myToken?.phoneNumber || "00000000000",
            description: `گزارش متراژ همه ی سفارش گیرها رو مشاهده کرد.`,
            statusCode: 200,
        })
        res.status(200).json({
            data: result,
            message: 'اطلاعات به روز شد.',
        });
        return;

    } catch (error) {

        res.status(500).json({
            error: error?.toString(),

        });
        return
    }


};

export {allBanksFirstUserId};
