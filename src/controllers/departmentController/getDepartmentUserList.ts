import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {IUser, User} from "../../models/User";


const getDepartmentUserList = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    // const message = departmentId
    // res.status(200).json({message});
    // return


    try {
        const departmentId = req.params.departmentId
        if (!departmentId) {
            res.status(500).json({
                message: `پارامتری های ارسالی صحیح نیست. ${req.params}`,
            });
            return;
        }


        let userList: any = []
        let usersArray: IUser[] | null = await User.find({departmentId}).lean()
        userList = usersArray?.map(singleUser => {
            const _id = singleUser._id;
            const name = singleUser.name;
            const familyName = singleUser.familyName;
            const userStatus = singleUser.userStatus;
            const isActive = singleUser.isActive;
            const profilePictureUrl = singleUser.profilePictureUrl;

            return {
                _id,
                name,
                familyName,
                userStatus,
                profilePictureUrl,
                isActive,
            }
        }).filter(user => (user?.isActive || user?.isActive==="1")).map(user => {
            const {isActive, ...rest} = user
            return rest;
        }) || []


        res.status(200).json({
            userList, message: 'لیست بارگزاری شد.',
        });
        return;

    } catch (error: any) {
        const temp = error.toString()
        res.status(500).json({error, temp})
        return
    }


};

export {getDepartmentUserList};
