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


const deleteUserController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }
    try {

        const {id} = req.params;
        try {
            const requestUser: IUser =(await User.findOne({_id:id}).exec())!;
            if (requestUser.phoneNumber === myToken.phoneNumber) {
                res.status(409).json({
                    message: `عزیزم تو نمیتونی خودت رو حذف کنی.🙄`
                });
                return
            }

        } catch (error:any) {
            res.status(500).json({message: 'Error deleting user', error: error?.message});
            return
        }

        // Attempt to find and delete the user by ID
        const deletedUser = await User.findByIdAndDelete(id);

        // Check if a user was found and deleted
        if (!deletedUser) {
            res.status(404).json({message: 'User not found'});
            return
        }

        // Successfully deleted the user
        await addLog({
            req: req,
            name: myToken?.UserInfo?.userData?.userData?.name + " " + myToken?.UserInfo?.userData?.userData?.familyName,
            phoneNumber: myToken.phoneNumber,
            description: `
                یه کاربر رو حذف کرد.
                
               ${JSON.stringify(deletedUser)}
                `,
            statusCode: 200,
            responseTime: null,
            error: null,
        })
        res.status(200).json({message: `کاربر با شماره ${deletedUser.phoneNumber} برای همیشه حذف شد.`,});
        return
    } catch (error: any) {
        // Handle potential errors, such as invalid ObjectId format
        res.status(500).json({message: 'Error deleting user', error: error?.message});
        return
    }


};

export {deleteUserController};
