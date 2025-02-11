import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {AdminSettings, IAdminSettings} from "../../models/adminSettings";
import {registerRandomAdminSettings} from "../../utils/initialSetup/registerRandomAdminSettings";
import {addLog} from "../../utils/logMethods/addLog";

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
        await addLog({
            req: req,
            name: myToken?.UserInfo?.userData?.userData?.name + " " + myToken?.UserInfo?.userData?.userData?.familyName,
            phoneNumber: req?.myToken?.phoneNumber || "00000000000",
            description: `تنظیمات مدیریتی رو مشاهده کرد:
            ${JSON.stringify(adminSettingData)}
            `,
            statusCode: 200,
        })
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
