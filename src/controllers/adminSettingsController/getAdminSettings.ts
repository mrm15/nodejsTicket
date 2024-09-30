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
import {IStatus, Status} from "../../models/status";
import {registerRandomAdminSettings} from "./registerRandomAdminSettings";

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

const getAdminSettings = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(200).json({message});
        return
    }


    try {


        const arrayListToCheck = [
            ACCESS_LIST.TICKET_CREATE
        ]

        const hasAccessToCreateTicket = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck})

        const arrayListToCheck1 = [
            ACCESS_LIST.ADMIN_SETTINGS
        ]
        const hasAccessToAdminList = await checkAccessList({
            phoneNumber: myToken.phoneNumber,
            arrayListToCheck: arrayListToCheck1
        })

        // اگه  به افزودن تیکت دسترسی نداشت و همچنین به تنطیمات مدیریتی دسترسی نداشت بهش بگو دسترسی نداری.  این برای گرفتن اطلاعات هست و برای ثبت نیست
        if (!hasAccessToAdminList && !hasAccessToCreateTicket) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'})
            return
        }


        const result: IAdminSettings | null = await AdminSettings.findOne({}).lean()
        if (!result) {
            // هیچ تنظیماتی نیست. بریم الکی ثبت کنیم
            const resultOfRegisterNewAdminSettings = await registerRandomAdminSettings()

            const myAdminSettings = await AdminSettings.findOne({}).lean()


            res.status(resultOfRegisterNewAdminSettings.statusCode).json({
                adminSettingData: myAdminSettings,
                message: resultOfRegisterNewAdminSettings.message,
            });
            return;
        }

        const adminSettingData = {...result}

        res.status(200).json({
            adminSettingData,
            message: 'تنظیمات فعلی بازیابی شد.',
        });
        return;


    } catch (error) {

        res.status(500).json({error});
        return
    }


};

export {getAdminSettings};
