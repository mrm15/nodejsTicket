import {Request, Response, NextFunction} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {getDataCollection} from "../utility/collectionsHandlers/getDataCollection";
import {IUser, User} from "../../models/User";
import {timestampToTime} from "../../utils/timestampToTime";
import {Role} from "../../models/roles";

const readUserController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {
    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست';
        res.status(403).json({message});
        return;
    }

    try {
        const arrayListToCheck = [ACCESS_LIST.USER_READ_ALL];
        const hasAccessToReadAllUsers = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck});
        if (!hasAccessToReadAllUsers) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
            return;
        }
        const myFetchedData = await getDataCollection(req.body, User)


        if (myFetchedData?.results) {
            const myList = await Promise.all(myFetchedData.results.map(async (singleUserInfo) => {
                const row: any = {...singleUserInfo};
                const userFound: IUser = (await Role.findOne({_id: row.role}).lean())!;
                row['roleName'] = userFound.name
                return row;
            }));
            myFetchedData.results = myList
        }


        res.status(200).json({

            ...myFetchedData
        });
        return;
    } catch (error) {
        res.status(500).json({error});
        return;
    }
};

export {readUserController};
