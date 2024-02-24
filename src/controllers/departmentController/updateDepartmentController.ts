import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";
import {getCurrentTimeStamp} from "../../utils/timing";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {Department, IDepartment} from "../../models/department";
import {stringToBoolean} from "../../utils/stringBoolean";


const updateDepartmentController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


        const {myToken} = req;
        const updatedDepartment = req.body;

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

            const {id} = req.body


            const arrayListToCheck = [
                ACCESS_LIST.DEPARTMENT_UPDATE
            ]
            const hasAccessToUpdateDepartment = await checkAccessList({phoneNumber, arrayListToCheck})

            if (!hasAccessToUpdateDepartment) {
                res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
                return
            }

            // check if this phone number is uniq
            let foundDepartment: IDepartment = (await Department.findOne({_id: id}).exec())!


            if (!foundDepartment) {
                res.status(500).json({message: "دپارتمانی با این نام یافت نشد."});
                return
            }


            const userFound: IUser | null = await User.findOne({phoneNumber: myToken.phoneNumber})

            if (!userFound) {
                res.status(500).json({message: "کاربری تایید نشد."});
                return
            }

            if (updatedDepartment?.parentDepartmentId === foundDepartment.name) {
                res.status(500).json({message: "دپارتمان والد و دپارتمان فعلی نمی تواند یکی باشد."});
                return
            }

            const userId = userFound?.id


            foundDepartment.userId = userId;
            foundDepartment.description = updatedDepartment?.description || " بدون توضیحات";
            foundDepartment.managerUserId = updatedDepartment?.managerUserId || null;
            foundDepartment.parentDepartmentId = updatedDepartment?.parentDepartmentId || null;
            foundDepartment.location = updatedDepartment?.location || null;
            foundDepartment.address = updatedDepartment?.address || '';
            foundDepartment.phoneNumber = updatedDepartment?.phoneNumber || '';
            foundDepartment.emailAddress = updatedDepartment?.emailAddress || '';
            foundDepartment.contactInfo = updatedDepartment?.contactInfo || '';
            foundDepartment.departmentAccessToSendTicket = stringToBoolean(updatedDepartment?.departmentAccessToSendTicket);
            foundDepartment.departmentAccessToReplyTicket = stringToBoolean(updatedDepartment?.departmentAccessToReplyTicket);
            foundDepartment.departmentAccessToArchiveTicket = stringToBoolean(updatedDepartment?.departmentAccessToArchiveTicket);
            foundDepartment.departmentAccessToTaskSection = stringToBoolean(updatedDepartment?.departmentAccessToTaskSection);
            foundDepartment.departmentTaskColor = updatedDepartment?.departmentTaskColor;
            foundDepartment.departmentAccessToArchiveTasks = stringToBoolean(updatedDepartment?.departmentAccessToArchiveTasks);
            foundDepartment.accessToSameDepartmentToAssignTask = stringToBoolean(updatedDepartment?.accessToSameDepartmentToAssignTask);
            foundDepartment.accessToOtherUsersToAssignTask = stringToBoolean(updatedDepartment?.accessToOtherUsersToAssignTask);
            foundDepartment.updatedAt = getCurrentTimeStamp();


            await foundDepartment.save()
            res.status(200).json({message: 'اطلاعات دپارتمان با موفقیت آپدیت شد',});
            return;

        } catch (error) {

            res.status(500).json({
                error: error?.toString(),

            });
            return
        }


    }
;

export {updateDepartmentController};
