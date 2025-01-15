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
import {addLog} from "../../utils/logMethods/addLog";


const updateUserController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

        const {myToken} = req;
        if (!myToken) {
            const message = 'مقدار توکن توی ری کوئست موجود نیست'
            res.status(403).json({message});
            return
        }




        try {
            const {id} = req.body
            const foundUser: IUser = (await User.findOne({_id: id}).exec())!;
            const newData = {...req.body}
            delete newData.id;
            delete newData._id;
            for (const key in newData) {
                // @ts-ignore
                foundUser[key] = newData[key]
            }


            foundUser.updateAt = getCurrentTimeStamp()
            const result = await foundUser.save()
            await addLog({
                req:req,
                name: foundUser?.name + " " + foundUser?.familyName ,
                phoneNumber:foundUser.phoneNumber,
                description : `
                مشخصات یه کاربر رو به روز 
                `,
                statusCode:200,
                responseTime:null,
                error:null,
            })
            res.status(200).json({
                message: "کاربر با موفقیت به روز شد."
            });
            return;
        } catch (error) {

            res.status(500).json({error});
            return
        }
    }
;

export {updateUserController};
