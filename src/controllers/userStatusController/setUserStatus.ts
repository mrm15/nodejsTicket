import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {changeUserStatus} from "../../utils/ChangeUserSatus/ChangeUserStatus";


const setUserStatus = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


        const {myToken} = req;
        if (!myToken) {
            const message = 'مقدار توکن توی ری کوئست موجود نیست'
            res.status(200).json({message});
            return
        }


        try {

            const newUserStatus = req.body.userStatus


            const arrayListToCheck = [
                ACCESS_LIST.USER_STATUS
            ]
            const hasAccessToUserStatus = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck})

            if (!hasAccessToUserStatus) {
                res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'})
                return
            }


            const {userId} = myToken?.UserInfo?.userData?.userData;


            await changeUserStatus({userId, userStatus:newUserStatus})
            // const foundUser: IUser | null = await User.findOne({_id: userId}).exec();
            //
            // if (!foundUser) {
            //     res.status(401).json({message: 'کاربری با این شماره تلفن یافت نشد'});
            //     return
            // }
            //
            // foundUser.userStatus = newUserStatus;
            //
            // await foundUser?.save();

            res.status(200).json({
                userStatus: newUserStatus,
                message: 'وضعیت ثبت شد.',
            })
            return;


        } catch (error) {

            res.status(500).json({error});
            return
        }


    }
;

export {setUserStatus};
