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
                foundUser[key] = newData[key]
            }


            foundUser.updateAt = getCurrentTimeStamp()
            const result = await foundUser.save()
            res.status(200).json({
                message: "کاربر با موفقیت به روز شد."
            });
            return;
        } catch (error) {
            // console.log(error)
            res.status(500).json({error});
            return
        }
    }
;

export {updateUserController};
