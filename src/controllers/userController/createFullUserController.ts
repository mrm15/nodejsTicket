import {Response, NextFunction} from 'express';
import {User} from "../../models/User";

import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {uuidGenerator} from "../../utils/uuidGenerator";
import {getUserInfoByPhoneNumber} from "../LoginRegisterSms/getUserInfoByPhoneNumber";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {addLog} from "../../utils/logMethods/addLog";
import {submitAddOrEditContactToHesabfa} from "../HesabfaFunction/submitAddOrEditContactToHesabfa";
import getAdminSettingsData from "../../utils/adminSettings/getAdminSettingsData";


const createCustomerController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

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
            ACCESS_LIST.createCustomer
        ]
        const hasAccessToAddUser = await checkAccessList({phoneNumber, arrayListToCheck})
        if (!hasAccessToAddUser) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
            return
        }

        // check if this phone number is uniq
        const isThereAnyUserWithThatPhoneNumber = await getUserInfoByPhoneNumber(newUserData.phoneNumber);

        if (Object.keys(isThereAnyUserWithThatPhoneNumber).length !== 0) {
            // res.status(409).json({
            //     message: 'قبلا یه کاربر با این شماره موبایل توی سایت موجود هست.',
            // });
            // return
        } else {
            const adminSetting = await getAdminSettingsData()
            const adminSettingsData = adminSetting.adminSettingData;
            newUserData.departmentId = adminSettingsData?.customerDepartment
            newUserData.roleId = adminSettingsData?.customerRole
            const result = await User.create({...newUserData});

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

        debugger
        const myContact = newUserData
        const contact = {
            Code: myContact?.contactCode,
            Name: myContact?.name,
            FirstName: myContact?.name,
            LastName: myContact?.familyName,
            ContactType: "1", // اشخاص رو حقیقی در نظر میگیریم
            EconomicCode: myContact?.economicCodeCompany,
            RegistrationNumber: myContact?.registerNumberCompany,
            Address: myContact?.address,
            Phone: myContact?.phoneNumber,
            Mobile: myContact?.mobile,
            Tag: "از سایت",
        }

        const result2 = await submitAddOrEditContactToHesabfa(contact)
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

export {createCustomerController};
