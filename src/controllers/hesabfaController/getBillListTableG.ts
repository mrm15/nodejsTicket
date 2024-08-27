import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {NextFunction, Response} from "express";
import {IUser, User} from "../../models/User";
import axios from "axios";
import {handleResponse} from "../utility/handleResponse";
import {hesabfaApiRequest} from "../utility/hesabfa/functions";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {getDataCollection} from "../utility/collectionsHandlers/getDataCollection";
import {Role} from "../../models/roles";
import {getDataCollectionFromHesabfa} from "../utility/collectionsHandlers/getDataCollectionFromHesabfa";

const getBillListTableG = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {
    try {
        const {myToken} = req;
        if (!myToken) {
            return res.status(200).json({message: 'Token not found in the request'});
        }

        const arrayListToCheck = [ACCESS_LIST.ersal , ACCESS_LIST.basteBandi]
        const hasAccessTo = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck})
        if (!hasAccessTo) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
            return
        }

        const {page = 1, pageSize = 2, filters = []} = req.body;

        const skip = (page - 1) * pageSize;
        const ttt = {
            page , pageSize,
            type: 0, // فقط فاکتور فروش
            queryInfo: {
                SortDesc: true,
                Take: pageSize,
                skip,
                filter: [

                    {property: "Status", operator: "=", value: 1} , // فقط تایید شده ها رو میخوایم
                    ...filters],
            }
        }
        const url = "invoice/getinvoices";
        const myResult = await getDataCollectionFromHesabfa(ttt,url);

        const results = myResult.response?.data?.Result?.List
        const totalDocuments = myResult.response?.data?.Result?.TotalCount
        const currentPage= page
        res.status(200).json({results,totalDocuments,currentPage,pageSize});
        return;

    } catch (error:any) {

        debugger
        if(error.hostname==='api.hesabfa.com'){
            error.message="هیچ پاسخی از حسابفا دریافت نشد!";
        }
        res.status(500).json({error});
        return
    }
};

export {getBillListTableG};
