import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {buildFilterObject} from "../utility/collectionsHandlers/filterUtils";
import {fetchPaginatedResults, SortOptions} from "../utility/collectionsHandlers/queryUtils";

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
        const myFetchedData  = await fetchPaginatedResults(
            User,
            filterObject,
            paginationOptions,
            sortOptions,
        )

        const columnDefs = [
            {minWidth: 150, headerName: "name", field: "name"},
            {minWidth: 150, headerName: "شماره تماس", field: "phoneNumber"},
            {minWidth: 150, headerName: "phoneNumber3", field: "phoneNumber3"},
            {minWidth: 150, headerName: "postalCode", field: "postalCode"},
            {minWidth: 150, headerName: "profilePictureUrl", field: "profilePictureUrl"},
            {minWidth: 150, headerName: "province", field: "province"},
            {minWidth: 150, headerName: "registerNumberCompany", field: "registerNumberCompany"},
            {minWidth: 150, headerName: "tasks", field: "tasks"},
            {minWidth: 150, headerName: "tickets", field: "tickets"},
            {minWidth: 150, headerName: "title", field: "title"},
            {minWidth: 150, headerName: "tokens", field: "tokens"},
            {minWidth: 150, headerName: "updateAt", field: "updateAt"},
            {minWidth: 150, headerName: "userName", field: "userName"},
            {minWidth: 150, headerName: "website", field: "website"}
        ];

        const rowData = [...myFetchedData.results];
        // rowData = rowData.map(r=>r.phoneNumber)

        const list = {columnDefs, rowData};

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
