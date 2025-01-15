import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";
import {File, IFile} from "../../models/files";
import {getCurrentTimeStamp} from "../../utils/timing";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {addNewUserF} from "../LoginRegisterSms/addNewUserF";
import {uuidGenerator} from "../../utils/uuidGenerator";
import {getUserInfoByPhoneNumber} from "../LoginRegisterSms/getUserInfoByPhoneNumber";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {submitAddOrEditContactToHesabfa} from "../HesabfaFunction/submitAddOrEditContactToHesabfa";
import {addLog} from "../../utils/logMethods/addLog";


const createUserController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    const newUserData = req.body;

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


        // آیا کاربر اجازه داره   کابری رو ثبت کنه؟
        const arrayListToCheck = [
            ACCESS_LIST.USER_CREATE
        ]
        const hasAccessToAddUser = await checkAccessList({phoneNumber, arrayListToCheck})
        if (!hasAccessToAddUser) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
            return
        }

        // check if this phone number is uniq
        const isThereAnyUserWithThatPhoneNumber = await getUserInfoByPhoneNumber(newUserData.phoneNumber);

        if (Object.keys(isThereAnyUserWithThatPhoneNumber).length !== 0) {
            res.status(409).json({
                message: 'کاربر تکراری',
            });
            return
        }

        // maybe user dont enter userName  but it is required so
        if (!newUserData.userName) {
            newUserData.userName = uuidGenerator()
        }
        // اگه تعیین نکرد که کاربر فعال یا غیر فعال باشه توی این فرم باید کاربر پیش فرض فعال باشه
        if (!newUserData.isActive) {
            newUserData.isActive = true
        }
        //

        const result = await User.create({...newUserData});
        await addLog({
            req: req,
            name: myToken?.UserInfo?.userData?.userData?.name + " " + myToken?.UserInfo?.userData?.userData?.familyName,
            phoneNumber: req?.myToken?.phoneNumber || "00000000000",
            description: `یک کاربر با  مشخصات زیر ایجاد کرد: 
            ${JSON.stringify(newUserData)}
            `,
            statusCode: 200,
        })
        res.status(200).json({message: "ثبت شد",});
        return;
    } catch (error) {

        res.status(500).json({error: error?.toString()});
        return
    }


};

export {createUserController};
