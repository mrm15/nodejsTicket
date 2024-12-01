import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";
import {getCurrentTimeStamp} from "../../utils/timing";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";

import getBankingDataByCode from "../../utils/banking/getBankingDataByCode/getBankingDataByCode";
import {userListAndCodes} from "../../utils/banking/getBankingDataByCode/userListAndCodes";


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
