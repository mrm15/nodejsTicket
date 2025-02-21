import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import getAdminSettingsData from "../../utils/adminSettings/getAdminSettingsData";

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

const getSafeAdminSettings = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


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


        const myResult = await getAdminSettingsData()
        const result = myResult.adminSettingData

        if (!result) {
            res.status(200).json({
                adminSettingData: null,
                message: 'تنظیمات فعلی بازیابی شد.',
            });
            return;
        }
        const {
            loginCodeHack,
            _id,
            createAt,
            updateAt,
            forwardTicketsAfterVerify,
            sendSMSAfterVerifyBill,
            sendSMSAfterSubmitBill,
            exceptionFromChangeFactorTagList,
            ...adminSettingData
        } = result;

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

export {getSafeAdminSettings};
