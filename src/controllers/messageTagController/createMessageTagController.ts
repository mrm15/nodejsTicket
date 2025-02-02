import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";
import {File, IFile} from "../../models/files";
import {getCurrentTimeStamp} from "../../utils/timing";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {addNewUserF} from "../LoginRegisterSms/addNewUserF";
import {uuidGenerator} from "../../utils/uuidGenerator";
import {getUserInfoByPhoneNumber} from "../LoginRegisterSms/getUserInfoByPhoneNumber";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {IMessageTag, messageTag} from "../../models/messageTag";


const createMessageTagController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;

    debugger

    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }

    try {


        const {phoneNumber} = myToken


        const newMessageTagData = req.body

        // آیا کاربر اجازه داره   کابری رو ثبت کنه؟
        const arrayListToCheck = [
            ACCESS_LIST.messageTagCollection
        ]
        const hasAccessTo = await checkAccessList({phoneNumber, arrayListToCheck})

        if (!hasAccessTo) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
            return
        }

        // check if this MessageTag name is uniq
        const isThereAnyMessageTagWithThatName: IMessageTag | null = await messageTag.findOne({name: newMessageTagData.name}).lean()

        if (!!isThereAnyMessageTagWithThatName) {
            res.status(409).json({
                message: 'نام تگ مسیج تکراری',
            });
            return
        }
        const currentTime= getCurrentTimeStamp()

        const userId = myToken.UserInfo.userData.userData.userId;
        const newMessageTagObject: any = {
            name:newMessageTagData?.name || "بدون نام",
            messageTagCode:newMessageTagData?.messageTagCode,
            description:newMessageTagData?.description,
            colorCode:newMessageTagData?.colorCode,
            isActive:newMessageTagData?.isActive,
            userId,
            createAt:currentTime,
            updateAt:currentTime,
        }



        const result = await messageTag.create(newMessageTagObject);
        res.status(200).json({result, message: ' اینم از تگ جدید',});
        return;

    } catch (error) {

        res.status(500).json({
            error: error?.toString(),

        });
        return
    }


};

export {createMessageTagController};
