import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {User} from "../../models/User";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";


const userListDetails = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

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
        const arrayListToCheck = [ACCESS_LIST.ticketCreateAdvanced]
        const hasAccessToTicketCreateAdvanced = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck})
        if (!hasAccessToTicketCreateAdvanced) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
            return
        }

        const userListFromCollection = await User.find({}).lean()



        // const list = userListFromCollection.map(row => {
        //
        //     return {
        //         value: row.id ? row.id : row._id,
        //         key: `${row.name}  ${row.familyName}`,
        //         phoneNumber:row.phoneNumber
        //     }
        // })


        res.status(200).json({
            list:userListFromCollection, message: 'لیست بارگزاری شد.',
        });
        return;

    } catch (error) {

        res.status(500).json({error});
        return
    }


};

export {userListDetails};
