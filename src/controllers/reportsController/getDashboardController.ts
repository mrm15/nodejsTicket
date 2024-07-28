import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {getRoleAccessList} from "../LoginRegisterSms/getRoleAccessList";
import {fillOutReportData} from "./fillOutReportData";


const getDashboardController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(200).json({message});
        return
    }


    try {


        // اینجا من یه آرایه از آبجکت ها دارم که میخوام یه کاری کنم.
        // میخوما بسته به اینکه هر کدوم از دسترسی ها توی بخش دسترسی های اون کاربر تیک داشت یه آبجکت با یه سری مشخصات رو  پوش کنم توی اون آرایه و در آخر اون آرایه رو بفرستم واسه فرانت
        const accessList: any = (await getRoleAccessList(myToken.phoneNumber));

        const reportData:any[]  = await fillOutReportData(accessList)


        res.status(200).json({
            reportData:reportData,
            message: 'تنظیمات فعلی بازیابی شد.',
        });
        return;


    } catch (error:any) {
        res.status(500).json({error: error?.toString()});
        return
    }


};

export {getDashboardController};
