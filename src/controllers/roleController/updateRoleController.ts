import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";
import {getCurrentTimeStamp} from "../../utils/timing";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {IRole, Role} from "../../models/roles";
import {myPermissionsArray} from "./permissinsArray";
import {clearRoleAccessListCache} from "../../utils/cache/clearRoleAccessListCache";


const updateRoleController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


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

            const {id} = req.body


            const arrayListToCheck = [
                ACCESS_LIST.ROLES_UPDATE
            ]
            const hasAccessToUpdateRole = await checkAccessList({phoneNumber, arrayListToCheck})

            if (!hasAccessToUpdateRole) {
                res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
                return
            }

            // check if this phone number is uniq
            const foundRole: IRole = (await Role.findOne({_id: id}).exec())!;


            if (!foundRole) {
                res.status(500).json({message: "نقشی با این نام یافت نشد."});
                return
            }


            const permissionsArray = [...myPermissionsArray]


            const userFound: IUser | null = await User.findOne({phoneNumber: myToken.phoneNumber})

            if (!userFound) {
                res.status(500).json({message: "کاربری تایید نشد."});
                return
            }

            debugger
            const userId = userFound?.id


            foundRole.name = newRoleData?.name || "بدون نام"
            foundRole.description = newRoleData?.description || " بدون توضیحات"
            foundRole.updateAt = getCurrentTimeStamp()
            foundRole.userId = userId


            permissionsArray.forEach(item => {
                let result = false
                newRoleData.statusListCreate.forEach((frontItem: string) => {
                    if (item === frontItem) {
                        result = true
                    }
                })
                foundRole[item] = result
            })

            await foundRole.save()
            clearRoleAccessListCache()
            res.status(200).json({message: 'نقش با موفقیت آپدیت شد',});
            return;

        } catch (error) {

            res.status(500).json({
                error: error?.toString(),

            });
            return
        }


    }
;

export {updateRoleController};
