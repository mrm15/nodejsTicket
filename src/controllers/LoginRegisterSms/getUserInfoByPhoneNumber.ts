import {Types} from "mongoose";
import {getRoleAccessList} from "./getRoleAccessList";
import {User} from "../../models/User";


export const getUserInfoByPhoneNumber = async (userPhoneNumber: string) => {
    const foundUser = await User.findOne({phoneNumber:userPhoneNumber}).exec();
    let userInfo = {}
    if (foundUser) {
        const roleAccessList = await getRoleAccessList(userPhoneNumber)
        const {
            departmentId,
            accountingCode,
            company,
            title,
            name,
            familyName,
            middleName,
            phoneNumber,
            mobile,
            fax,
            phoneNumber1,
            phoneNumber2,
            phoneNumber3,
            email,
            website,
            bankName,
            accountNumber,
            cardNumber,
            SHABA_Number,
            economicCodeCompany,
            nationalCodeCompany,
            registerNumberCompany,
            description,
            address,
            country,
            province,
            city,
            profilePictureUrl,
        } = foundUser
        userInfo = {
            roleAccessList,
            userData: {
                departmentId,
                accountingCode,
                company,
                title,
                name,
                familyName,
                middleName,
                phoneNumber,
                mobile,
                fax,
                phoneNumber1,
                phoneNumber2,
                phoneNumber3,
                email,
                website,
                bankName,
                accountNumber,
                cardNumber,
                SHABA_Number,
                economicCodeCompany,
                nationalCodeCompany,
                registerNumberCompany,
                description,
                address,
                country,
                province,
                city,
                profilePictureUrl,
            }
        }
    }


    return userInfo
}