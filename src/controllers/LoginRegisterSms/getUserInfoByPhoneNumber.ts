import {Types} from "mongoose";
import {getRoleAccessList} from "./getRoleAccessList";
import {User} from "../../models/User";
import {Department, IDepartment} from "../../models/department";
import {IRole, Role} from "../../models/roles";


export const getUserInfoByPhoneNumber = async (userPhoneNumber: string) => {
    const foundUser = await User.findOne({phoneNumber: userPhoneNumber}).exec();
    let userInfo = {}

    if (foundUser) {

        const roleAccessList = await getRoleAccessList(userPhoneNumber);
        const isDepartmentAdmin = await Department.findOne({managerUserId: foundUser._id}).exec();



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
            id: userId,
            contactCode,
            role,
        } = foundUser;


        let roleName = ""
        let departmentName = ""
        if (departmentId) {
            const dep: IDepartment = (await Department.findOne({_id: departmentId}).lean())!
            departmentName = dep.name
        }
        if (role) {
            const foundedRole: IRole = (await Role.findOne({_id: role}).lean())!
            roleName = foundedRole.name
        }

        userInfo = {
            isDepartmentAdmin:!!isDepartmentAdmin,
            roleAccessList,
            userData: {
                userId,
                departmentId,
                departmentName,
                roleName,
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
                contactCode
            }
        }
    }


    return userInfo
}