import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";
import {getCurrentTimeStamp} from "../../utils/timing";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {Department} from "../../models/department";
import {stringToBoolean} from "./departmentFunction";

const createDepartmentController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    const newDepartmentData = req.body;

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


        const newDepartment = req.body

        const arrayListToCheck = [
            ACCESS_LIST.DEPARTMENT_CREATE
        ]
        const hasAccessToAddDepartment = await checkAccessList({phoneNumber, arrayListToCheck})

        if (!hasAccessToAddDepartment) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
            return
        }

        // check if this phone number is uniq
        const isThereAnyDepartmentWithThatName: any = await Department.findOne({name: newDepartment.name}).exec()


        if (isThereAnyDepartmentWithThatName) {

            res.status(409).json({
                message: 'نام دپارتمان تکراری',
            });
            return
        }


        // احتمال اینکه همون موقع یه نیروی ادمینی با ادمین اصلی لج کرده باشه ممکنه که اینجا بخواد مثلا مثلا دپارتمان بیاد تعریف کنه که باید بگم شرمند
        // البته کاربری توی توکن چک میشه


        const userFound: IUser | null = await User.findOne({phoneNumber: myToken.phoneNumber})

        if (!userFound) {
            res.status(500).json({message: "کاربری تایید نشد."});
            return
        }

        const userId = userFound?.id

        const newDepartmentObject: any = {

            name: newDepartmentData?.name || "بدون نام",
            userId,
            description: newDepartmentData?.description || " بدون توضیحات",
            managerUserId: newDepartmentData?.managerUserId || null,
            parentDepartmentId: newDepartmentData?.parentDepartmentId || null,
            location: newDepartmentData?.location || null,
            address: newDepartmentData?.address || '',
            phoneNumber: newDepartmentData?.phoneNumber || '',
            emailAddress: newDepartmentData?.emailAddress || '',
            contactInfo: newDepartmentData?.contactInfo || '',
            departmentAccessToSendTicket: stringToBoolean(newDepartmentData?.departmentAccessToSendTicket),
            departmentAccessToReplyTicket: stringToBoolean(newDepartmentData?.departmentAccessToReplyTicket),
            departmentAccessToArchiveTicket: stringToBoolean(newDepartmentData?.departmentAccessToArchiveTicket),
            departmentAccessToTaskSection: stringToBoolean(newDepartmentData?.departmentAccessToTaskSection),
            departmentTaskColor: newDepartmentData?.departmentTaskColor,
            departmentAccessToArchiveTasks: stringToBoolean(newDepartmentData?.departmentAccessToArchiveTasks),
            accessToSameDepartmentToAssignTask: stringToBoolean(newDepartmentData?.accessToSameDepartmentToAssignTask),
            accessToOtherUsersToAssignTask: stringToBoolean(newDepartmentData?.accessToOtherUsersToAssignTask),
            createAt: getCurrentTimeStamp(),
            updateAt: getCurrentTimeStamp(),

        }


        const result = await Department.create(newDepartmentObject);
        res.status(200).json({result, message: 'دپارتمان با موفقیت ایجاد شد.',});
        return;

    } catch (error) {
        // console.log(error)
        res.status(500).json({
            error: error?.toString(),
        });
        return
    }

};

export {createDepartmentController};
