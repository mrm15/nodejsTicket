import {Request, Response, NextFunction} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {getDataCollection} from "../utility/collectionsHandlers/getDataCollection";
import {IUser, User} from "../../models/User";
import {timestampToTime} from "../../utils/timestampToTime";
import {IRole, Role} from "../../models/roles";
import {addLog} from "../../utils/logMethods/addLog";

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
        const myFetchedData = await getDataCollection(req.body, User , {userStatus: -1})


        if (myFetchedData?.results.length > 0) {
            const myList = await Promise.all(myFetchedData.results.map(async (singleUserInfo) => {
                const row: any = {...singleUserInfo};
                try {

                    if(row.role){
                        const foundedRole: IRole = (await Role.findOne({_id: row.role}).lean())!;
                        row['roleName'] = foundedRole.name
                    }else {
                        row['roleName'] = ' ندارد '
                    }

                    if(row?.isActive){
                        row['isActive']="1"
                    }else {
                        row['isActive']="0"
                    }

                } catch (error: any) {
                    //
                }
                return row;
            }));
            myFetchedData.results = myList
        }

        await addLog({
            req: req,
            phoneNumber: req?.myToken?.phoneNumber || "00000000000",
            description: `صفحه ی کاربران رو مشاهده کرد.`,
            statusCode: 200,
        })
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
