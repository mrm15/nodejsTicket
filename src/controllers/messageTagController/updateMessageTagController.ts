import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";
import {getCurrentTimeStamp} from "../../utils/timing";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {IRole, Role} from "../../models/roles";
import {myPermissionsArray} from "./permissinsArray";
import {IMessageTag, messageTag} from "../../models/messageTag";


const updateMessageTagController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


        const {myToken} = req;
        const newData = req.body;

        if (!myToken) {
            const message = 'مقدار توکن توی ری کوئست موجود نیست'
            res.status(403).json({message});
            return
        }

        try {


            const {phoneNumber} = myToken

            const {id} = req.body


            const arrayListToCheck = [
                ACCESS_LIST.messageTagCollection
            ]
            const hasAccessToUpdateRole = await checkAccessList({phoneNumber, arrayListToCheck})

            if (!hasAccessToUpdateRole) {
                res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
                return
            }

            // check if this phone number is uniq
            const foundMessageTag: IMessageTag | null = (await messageTag.findOne({_id: id}).exec())!;


            if (!foundMessageTag) {
                res.status(500).json({message: "تگ مسیجی با این نام یافت نشد."});
                return
            }





            debugger
            const userId = myToken.UserInfo.userData.userData.userId;


            foundMessageTag.name = newData?.name || "بدون نام"
            foundMessageTag.description = newData?.description || " بدون توضیحات"
            foundMessageTag.updateAt = getCurrentTimeStamp()
            foundMessageTag.userId = userId




            await foundMessageTag.save()
            res.status(200).json({message: 'تگ مسیج با موفقیت آپدیت شد',});
            return;

        } catch (error) {

            res.status(500).json({
                error: error?.toString(),
            });
            return
        }


    }
;

export {updateMessageTagController};
