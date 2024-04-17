import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {Department, IDepartment} from "../../models/department";
import {getRoleAccessList} from "../LoginRegisterSms/getRoleAccessList";
import * as perf_hooks from "node:perf_hooks";
import {getDepartmentListWithUsers, getSameDepartmentUsers} from "../controllerUtilFunctions/getData";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {AdminSettings, IAdminSettings} from "../../models/adminSettings";
import {IUser, User} from "../../models/User";
import {IRole, Role} from "../../models/roles";
import mongoose from "mongoose";
import {getCurrentTimeStamp} from "../../utils/timing";

export interface IDataList {
    name: string;
    id: string;
    photoUrl?: string;
    userList?: {
        name: string;
        id: string;
        departmentId: string | undefined;
    }[]
}

interface IList {
    mode: 'admin' | 'departmentAdmin' | 'usualUser' | '';
    departmentList: IDataList[] | [];
    destinationUserList: IDataList[] | [];
}

const getUserStatus = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(200).json({message});
        return
    }


    try {


        const arrayListToCheck = [
            ACCESS_LIST.USER_STATUS
        ]
        const hasAccessToUserStatus = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck})

        if (!hasAccessToUserStatus) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'})
            return
        }


        const {userId} = myToken?.UserInfo?.userData?.userData;

        const foundUser: IUser | null = await User.findOne({_id: userId}).exec();

        if (!foundUser) {
            res.status(401).json({message: 'کاربری با این شماره تلفن یافت نشد'});
            return
        }

        const userStatus = foundUser.userStatus;

        res.status(200).json({
            userStatus,
            message: 'وضعیت کاربر دریافت شد.',
        })
        return;


    } catch (error) {

        res.status(500).json({error});
        return
    }


};

export {getUserStatus};
