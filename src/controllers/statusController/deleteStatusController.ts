import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";

import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";

import {IRole, Role} from "../../models/roles";
import {Department} from "../../models/department";
import {IStatus, Status} from "../../models/status";
import {addLog} from "../../utils/logMethods/addLog";


const deleteStatusController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }
    try {

        const {id} = req.params;

        // Attempt to find and delete the user by ID
        const deletedStatus = await Status.findByIdAndDelete(id);

        // Check if a user was found and deleted
        if (!deletedStatus) {
            res.status(404).json({message: 'Department not found'});
            return
        }


        const message = 'تیکت هایی که اون استاتوس رو داشتن به حالت  تعریف نشده در اومدن';
        // Successfully deleted the user
        await addLog({
            req: req,
            name: myToken?.UserInfo?.userData?.userData?.name + " " + myToken?.UserInfo?.userData?.userData?.familyName,
            phoneNumber: req?.myToken?.phoneNumber || "00000000000",
            description: ` استاتوس رو حذف کرد
            
                ${deletedStatus}
                `,
            statusCode: 200,
        })
        res.status(200).json({message: `وضعیت با نام ${deletedStatus.name} برای همیشه حذف شد.` + message,});
        return
    } catch (error: any) {
        // Handle potential errors, such as invalid ObjectId format
        res.status(500).json({message: 'Error deleting ', error: error?.message});
        return
    }


};

export {deleteStatusController};
