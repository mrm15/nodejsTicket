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
import {IRole, Role} from "../../models/roles";
import {myPermissionsArray} from "./permissinsArray";


const createRoleController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    const newRoleData = req.body;

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


        const newRoleData = req.body

        // آیا کاربر اجازه داره   کابری رو ثبت کنه؟
        const arrayListToCheck = [
            ACCESS_LIST.ROLES_CREATE
        ]
        const hasAccessToAddRole = await checkAccessList({phoneNumber, arrayListToCheck})

        if (!hasAccessToAddRole) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
            return
        }

        // check if this phone number is uniq
        const isThereAnyRoleWithThatName: any = await Role.findOne({name: newRoleData.name}).exec()


        if (isThereAnyRoleWithThatName.length !== 0) {

            res.status(409).json({
                message: 'نام نقش تکراری',
            });
            return
        }


        // احتمال اینکه همون موقع یه نیروی ادمینی با ادمین اصلی لج کرده باشه ممکنه که اینجا بخواد مثلا مثلا نقش بیاد تعریف کنه که باید بگم شرمند
        // البته کاربری توی توکن چک میشه
        const userWantToAdd: { [key: string]: any; } = (await getUserInfoByPhoneNumber(myToken.phoneNumber))!;
        if (!userWantToAdd) {
            res.status(500).json({
                message: 'کاربری  شما مورد تایید نیست!',
            });
            return
        }


        const userFound: IUser | null = await User.findOne({phoneNumber: myToken.phoneNumber})

        if (!userFound) {
            res.status(500).json({message: "کاربری تایید نشد."});
            return
        }

        const userId = userFound?.id


        const permissionsArray = [...myPermissionsArray]


        const newRoleObject: any = {

            name: newRoleData?.name || "بدون نام",
            description: newRoleData?.description || " بدون توضیحات",
            createAt: getCurrentTimeStamp(),
            updateAt: getCurrentTimeStamp(),
            userId,
        }


        permissionsArray.forEach(item => {
            newRoleData.statusListCreate.forEach((frontItem: string) => {
                newRoleObject[item] = (item === frontItem);
            })
        })


        const result = await Role.create(newRoleObject);
        res.status(200).json({result, message: ' اینم از نقش  جدید',});
        return;

    } catch (error) {

        res.status(500).json({
            error: error?.toString(),

        });
        return
    }


};

export {createRoleController};
