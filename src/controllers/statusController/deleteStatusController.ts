import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";

import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";

import {IRole, Role} from "../../models/roles";
import {Department} from "../../models/department";


const deleteStatusController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }
    try {

        const {id} = req.params;
        try {
            const foundUser: IUser | null = await User.findOne({departmentId: id}).exec()
            if (foundUser) {
                res.status(409).json({
                    message: `برای حذف این دپارتمان ابتدا کاربرانی که عضو این دپارتمان هستند را حذف کنید!!!.🙄`
                });
                return
            }

        } catch (error: any) {
            res.status(500).json({message: 'Error deleting department', error: error?.message});
            return
        }

        // Attempt to find and delete the user by ID
        const deletedDepartment = await Department.findByIdAndDelete(id);

        // Check if a user was found and deleted
        if (!deletedDepartment) {
            res.status(404).json({message: 'Department not found'});
            return
        }

        // Successfully deleted the user
        res.status(200).json({message: `نقش با نام ${deletedDepartment.name} برای همیشه حذف شد.`,});
        return
    } catch (error: any) {
        // Handle potential errors, such as invalid ObjectId format
        res.status(500).json({message: 'Error deleting ROLE', error: error?.message});
        return
    }


};

export {deleteStatusController};
