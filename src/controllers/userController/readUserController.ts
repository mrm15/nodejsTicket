import {Request, Response, NextFunction} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {getDataCollection} from "../utility/collectionsHandlers/getDataCollection";
import {buildFilterObject} from "../utility/collectionsHandlers/filterUtils";
import {fetchPaginatedResults, SortOptions} from "../utility/collectionsHandlers/queryUtils";
import {User} from "../../models/User";

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
        debugger
        const {page = 1, pageSize = 2, filters = []} = req.body;

        // Build the filter object
        const filterObject = buildFilterObject(filters);

        // Define sorting options
        const sortOptions: SortOptions = {createdAt: 1};

        // Define pagination options
        const paginationOptions = {page, pageSize};
        debugger        // Fetch the users with pagination
        const myFetchedData = await getDataCollection(req.body, User)
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
