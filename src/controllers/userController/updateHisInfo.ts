import {NextFunction, Response} from 'express';
import {IUser, User} from "../../models/User";
import {getCurrentTimeStamp} from "../../utils/timing";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {addLog} from "../../utils/logMethods/addLog";


const updateHisInfo = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

        const {myToken} = req;
        if (!myToken) {
            const message = 'مقدار توکن توی ری کوئست موجود نیست'
            res.status(403).json({message});
            return
        }


        try {
            // const {id} = req.body
            const _id = myToken.UserInfo.userData.userData.userId;


            const foundUser: IUser = (await User.findOne({_id}).exec())!;

            const newData = {...req.body}
            // newData._id = _id
            // delete newData._id;
            for (const key in newData) {
                // @ts-ignore
                foundUser[key] = newData[key]
            }


            foundUser.updateAt = getCurrentTimeStamp()
            const result = await foundUser.save()
            await addLog({
                req: req,
                name: foundUser?.name + " " + foundUser?.familyName,
                phoneNumber: foundUser.phoneNumber,
                description: `
                مشخصات خودشو به روز کرد.
                ${newData}
                
                         `,
                statusCode: 200,
                responseTime: null,
                error: null,
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

export {updateHisInfo};
