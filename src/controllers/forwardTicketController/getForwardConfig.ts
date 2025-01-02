import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {Department, IDepartment} from "../../models/department";
import {getRoleAccessList} from "../LoginRegisterSms/getRoleAccessList";
import * as perf_hooks from "node:perf_hooks";
import {getDepartmentListWithUsers, getSameDepartmentUsers} from "../controllerUtilFunctions/getData";

export interface IDataList {
    name: string;
    id: string;
    photoUrl?: string;
    userList?: {
        name: string;
        id: string;
        departmentId:string | undefined;
    }[]
}

interface IList {
    mode: 'admin' | 'departmentAdmin' | 'usualUser' | '';
    departmentList: IDataList[] | [];
    destinationUserList: IDataList[] | [];
}

const getForwardConfig = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    try {
        // سه حالت داریم
        //حالت اول:
        //  مدیر هست و به کل دپارتمان ها و کاربران دسترسی داره و میتونه
        // یک دپارتمان انتخاب کنه و هیچ کاربری انتخاب نکنه و یا یک کاربر انتخاب کنه که این تیکت ارجاع بشه واسه اون
        // برای این کار باید یک دپارتمان لیست بفرستم که داخل هر دپارتمان لیست کاربران اون دپارتمان رو قرار بدم

        // حالت دوم:
        // مدیر دپارتمان هست که میتونه به کاربران خودش و یا به دپارتمان های دیگه تیکت ارسال کنه
        // برای این کار
        // دو تا مقدار میفرستم سمت فرانت
        // یکی لیست دپارتمان ها و دیگری لیست کاربران و با توجه به اینکه توی حالت دوم هستیم مدیر دپارتمان فقط یکی از این حالت ها رو میتونه انتخاب کنه

        // حالت سوم
        // یه کاربر معمولی هست  و فقط لیست کاربرانی که میتونه براشون ارجاع بده رو مبینه


        const list: IList = {
            mode: '',
            departmentList: [],
            destinationUserList: [],
        }


        // اول میریم چک میکنیم که آیا توی بخش دسترسی ها آیا کاربر دسترسی بینهایت داره یا نه؟


        const roleAccessList = await getRoleAccessList(myToken.phoneNumber);

        // اگه دسترسی بینهایت داشت پس باید لیست کل دپارتمان ها و کاربران هر دپارتمان رو بفرستم به فرانت
        if (roleAccessList?.includes('UnlimitedForward')) {
            list.mode = 'admin'
            list.departmentList = await getDepartmentListWithUsers(myToken.phoneNumber);
        } else {
            // اگه دسترسی بینهایت نداشت پس باید بسته به اینکه اگه مدیر دپارتمان بود که همه ی دپارتمان ها رو ببینه
            // اگه مدیر نبود هم فقط کاربران دپارتمان خودش رو ببینه.

            // آیا کاربری که الان میخواد دسترسی های ارجاع رو براش بفرستم مدیر دپارتمان هست؟
            // اگه آره پس میتونه لیست دپارتمان ها رو ببینه
            // اگه نه هم که پس باید لیست دپارتمان خالی براش ارسال بشه
            const departments: IDepartment[] = await Department.find().lean();
            const departmentAdminListArray = departments.map(dep => dep.managerUserId.toString());

            const {userId} = myToken.UserInfo.userData.userData;


            const isDepartmentAdmin = departmentAdminListArray.includes(userId);

            list.mode = isDepartmentAdmin ? 'departmentAdmin' : 'usualUser';
            list.departmentList = isDepartmentAdmin ? departments.map(department => ({
                name: department.name,
                id: department.id
            })) : [];
            list.destinationUserList = await getSameDepartmentUsers(myToken.phoneNumber);

        }
        res.status(200).json({
            list, message: 'لیست بارگزاری شد.',
        });
        return;

    } catch (error) {

        res.status(500).json({error});
        return
    }


};

export {getForwardConfig};
