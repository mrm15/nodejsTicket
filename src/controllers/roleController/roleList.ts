import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {Role} from "../../models/roles";


const roleList = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    // res.status(201).json({myToken})
    //
    // return


    try {
        // const arrayListToCheck = [ACCESS_LIST.USER_READ_ALL]
        // const hasAccessToReadAllUsers = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck})
        // if (!hasAccessToReadAllUsers) {
        //     res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
        //     return
        // }

        const roleListFromCollection = await Role.find({}).exec();


        const list = roleListFromCollection.map(row => {

            return {
                value: row.id ? row.id : row._id,
                key: row.name
            }
        })


        res.status(200).json({
            list, message: 'لیست بارگزاری شد.',
        });
        return;

    } catch (error) {
        // console.log(error)
        res.status(500).json({error});
        return
    }


};

export {roleList};
