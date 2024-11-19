import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";
import {getCurrentTimeStamp} from "../../utils/timing";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {addNewUserF} from "../LoginRegisterSms/addNewUserF";
import {uuidGenerator} from "../../utils/uuidGenerator";
import {getUserInfoByPhoneNumber} from "../LoginRegisterSms/getUserInfoByPhoneNumber";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {IRole, Role} from "../../models/roles";
import {myPermissionsArray} from "../roleController/permissinsArray";
import getBankingData from "../../utils/banking/getBankingData/getBankingData";


const myBankFirstUserId = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    const filters = req.body.filterItems;

    // res.status(201).json({myToken})
    //
    // return

    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }

    try {





        const result = await getBankingData({type:"user", filters, myToken })

        res.status(200).json({result, message: '',});
        return;

    } catch (error) {

        res.status(500).json({
            error: error?.toString(),

        });
        return
    }


};

export {myBankFirstUserId};
