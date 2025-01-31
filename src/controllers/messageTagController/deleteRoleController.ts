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


const deleteRoleController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }
    try {

        const {id} = req.params;
        try {
            const foundUser: IUser | null = await User.findOne({role: id}).exec()
            if (foundUser) {
                res.status(409).json({
                    message: `برای حذف نقش ابتدا کاربرانی که این نقش را دارند حذف کنید!!!.🙄`
                });
                return
            }

        } catch (error: any) {
            res.status(500).json({message: 'Error deleting user', error: error?.message});
            return
        }

        // Attempt to find and delete the user by ID
        const deletedRole = await Role.findByIdAndDelete(id);

        // Check if a user was found and deleted
        if (!deletedRole) {
            res.status(404).json({message: 'ROLE not found'});
            return
        }

        // Successfully deleted the user
        res.status(200).json({message: `نقش با نام ${deletedRole.name} برای همیشه حذف شد.`,});
        return
    } catch (error: any) {
        // Handle potential errors, such as invalid ObjectId format
        res.status(500).json({message: 'Error deleting ROLE', error: error?.message});
        return
    }


};

export {deleteRoleController};
