import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";
import {getCurrentTimeStamp} from "../../utils/timing";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {IRole, Role} from "../../models/roles";
import {Department, IDepartment} from "../../models/department";
import {booleanToString, stringToBoolean} from "../../utils/stringBoolean";
import {IStatus, Status} from "../../models/status";


const updateStatusController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


        const {myToken} = req;
        const updatedStatus = req.body;

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
                ACCESS_LIST.STATUS_LIST_UPDATE
            ]
            const hasAccessToUpdateStatus = await checkAccessList({phoneNumber, arrayListToCheck})

            if (!hasAccessToUpdateStatus) {
                res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
                return
            }

            // check if this phone number is uniq
            let foundStatus: IStatus = (await Status.findOne({_id: id}).exec())!


            if (!foundStatus) {
                res.status(500).json({message: "وضعیتی  با این نام یافت نشد."});
                return
            }


            const userFound: IUser | null = await User.findOne({phoneNumber: myToken.phoneNumber})

            if (!userFound) {
                res.status(500).json({message: "کاربری تایید نشد."});
                return
            }

            // یک مورد رو باید چک کنیم//
            // بجز خودش باید ببینیم آیا چیزی هست وضعیت نهاییش مقدار درست باشه
            const foundStatusFinal: IStatus | null = await Status.findOne({isFinal: true}).exec()


            if (stringToBoolean(updatedStatus.isFinal)) {
                if (foundStatusFinal && (foundStatusFinal.id !== updatedStatus.id)) {
                    res.status(409).json({
                        message: 'فقط یک وضعیت میتواند  وضعیت نهایی داشته باشد. قبلا یک استاتوس با وضعیت نهایی ثبت شده است.' + `  نام وضعیت با استاتوس نهایی: «${foundStatusFinal.name}»`,
                        foundStatusFinal
                    });
                    return
                }
            }
            foundStatus.name = updatedStatus?.name;
            foundStatus.statusCode = updatedStatus.statusCode;
            foundStatus.colorCode = updatedStatus.colorCode;
            foundStatus.description = updatedStatus.description;
            foundStatus.isActive = stringToBoolean(updatedStatus.isActive);
            foundStatus.isFinal = stringToBoolean(updatedStatus.isFinal);
            foundStatus.order = updatedStatus.order;
            foundStatus.updateAt = getCurrentTimeStamp();


            await foundStatus.save()
            res.status(200).json({message: 'اطلاعات وضعیت با موفقیت آپدیت شد',});
            return;

        } catch (error) {

            res.status(500).json({
                error: error?.toString(),

            });
            return
        }


    }
;

export {updateStatusController};
