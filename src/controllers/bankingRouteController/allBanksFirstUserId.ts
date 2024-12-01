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
import getBankingDataByCode from "../../utils/banking/getBankingDataByCode/getBankingDataByCode";


const allBanksFirstUserId = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    const newRoleData = req.body;

    // res.status(201).json({myToken})
    //
    // return

    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }

    try {


        const {phoneNumber} = myToken


        const usersAndCodes = [
            {id: 100, name: "امیر حسین بای", codes: ["1313", ], sumOfItems: 0},
            {id: 101, name: "زهره پور محمد", codes: ["1111", ], sumOfItems: 0},
            {id: 102, name: "نیما احمدی", codes: ["3333", ], sumOfItems: 0},
            {id: 103, name: "مهدی ساری", codes: ["4444", ], sumOfItems: 0},
        ]
        debugger
        const filetrs = req.body.filterItems
        const result = await getBankingDataByCode({filters: filetrs||[]},usersAndCodes)



        res.status(200).json({
            data: result,
            phoneNumber,
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
