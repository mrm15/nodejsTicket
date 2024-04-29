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
        const hasAccessToAdminList = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck:arrayListToCheck1})

        // اگه  به افزودن تیکت دسترسی نداشت و همچنین به تنطیمات مدیریتی دسترسی نداشت  بهش بگو دسترسی نداری.  این برای گرفتن اطلاعات هست و برای ثبت نیست
        if (!(hasAccessToAdminList && hasAccessToCreateTicket)) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'})
            return
        }


        const result: IAdminSettings | null = await AdminSettings.findOne({}).lean()
        if (!result) {
            // هیچ تنظیماتی نیست. بریم الکی ثبت کنیم

            const randomUser: IUser | null = await User.findOne({}).lean();
            if (!randomUser) {
                res.status(406).json({
                    message: 'لطفا یک کاربر تعریف کنید.',
                });
                return;
            }


            const randomDepartment: IDepartment | null = await Status.findOne({}).lean()
            if (!randomDepartment) {
                res.status(406).json({
                    message: 'لطفا یک دپارتمان تعریف کنید.',
                });
                return;
            }
            const randomStatus: IStatus | null = await Department.findOne({}).lean()
            if (!randomStatus) {
                res.status(406).json({
                    message: 'لطفا یک استاتوس تعریف کنید.',
                });
                return;
            }


            const newAdminSettingData: IAdminSettings = new AdminSettings({

                userId: randomUser._id,
                firstDestinationForTickets: randomDepartment._id,
                showUsersListInSendTicketForm: false,
                firstStatusTicket:randomStatus._id,
                maxFileSize:5.0,
                createAt: getCurrentTimeStamp(),
                updateAt: getCurrentTimeStamp(),
            })
            await newAdminSettingData.save();

            const myAdminSettings = await AdminSettings.findOne({}).lean()


            res.status(200).json({
                adminSettingData: myAdminSettings,
                message: 'تنظیمات اولیه ثبت شد.',
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
