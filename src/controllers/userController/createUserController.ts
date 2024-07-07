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

        const resultAddNewUser = await submitAddOrEditContactToHesabfa(newUserData)


        let message = 'کاربر جدید ثبت شد';
        // این بخش بخاطر همگامسازی با حسابفا میزنم.
        // در صورتی که کاربری رو توی سایت خودمون ایجاد کردیم حالا باید بریم براش توی سایت حسابفا اکانت بسازیم
        //بعدش که کاربر رو ایجاد کردیمک باید کد مکشتری که حسابفا داده رو بگیریم و بزاریم توی کد مشتری همین کاربر
        debugger
        if (resultAddNewUser.Success) {
            // اینجا باید کد مشتری رو بگیرم و توی دیتا بیس خودم ذخیره کنم.
            const code = resultAddNewUser.Result.Code;
            const result = await User.create({...newUserData, contactCode: code});


            message += 'در حسابداری ثبت شد '
            res.status(200).json({result, message,});
            return;

        } else {
            message += 'در حسابداری ثبت نشد با مدیر سایت تماس بگیرید' + '   ' + resultAddNewUser.ErrorMessage + resultAddNewUser.Error
        }

        res.status(500).json({message,});
        return;

    } catch (error) {

        res.status(500).json({error: error?.toString()});
        return
    }


};

export {createUserController};
