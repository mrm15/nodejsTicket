import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {NextFunction, Response} from "express";
import {getDataCollectionFromHesabfa} from "../utility/collectionsHandlers/getDataCollectionFromHesabfa";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {addLog} from "../../utils/logMethods/addLog";

const getBillListTableG = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;

    try {
        if (!myToken) {
            return res.status(200).json({message: 'Token not found in the request'});
        }

        const arrayListToCheck = [ACCESS_LIST.showFactorListInMenu]
        const hasAccessTo = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck})

        const arrayListToCheck2 = [ACCESS_LIST.showMyBillListForCustomer]

        if (!hasAccessTo && !arrayListToCheck2 ) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
            return
        }

        let {page = 1, pageSize = 3, filters = []} = req.body;

        const skip = (page - 1) * pageSize;

        filters = filters.map((row: { property: any; operator: any; value: any; }) => ({
            property: row.property,
            operator: row.operator,
            value: row.value,
        }))
        const ttt = {
            type: 0,
            "queryInfo": {
                // "SortBy": 'Date',
                "SortBy": "Id",
                // "SortBy": "Number",

                "SortDesc": true,
                "Take": pageSize,
                "Skip": skip,
                "filters": [
                    ...filters,
                    // {"property": "Status", "operator": "=", "value": 1},
                ]
            }
        }


        const url = "invoice/getinvoices";
        const myResult = await getDataCollectionFromHesabfa(ttt, url);

        const results = myResult.response?.data?.Result?.List
        const totalDocuments = myResult.response?.data?.Result?.TotalCount
        const currentPage = page
        await addLog({
            req: req,
            name: myToken?.UserInfo?.userData?.userData?.name + " " + myToken?.UserInfo?.userData?.userData?.familyName,
            phoneNumber: req?.myToken?.phoneNumber || "00000000000",
            description: ` لیست فاکتور ها رو مشاهده کرد. `,
            statusCode: 500,
        })
        res.status(200).json({results, totalDocuments, currentPage, pageSize});
        return;

    } catch (error: any) {

        await addLog({
            req: req,
            name: myToken?.UserInfo?.userData?.userData?.name + " " + myToken?.UserInfo?.userData?.userData?.familyName,
            phoneNumber: req?.myToken?.phoneNumber || "00000000000",
            description: `خطا در مشاهده ی لیست فاکتورها `,
            statusCode: 500,
            error,
        })
        if (error.hostname === 'api.hesabfa.com') {
            error.message = "هیچ پاسخی از حسابفا دریافت نشد!";
        }
        res.status(500).json({error});
        return
    }
};

export {getBillListTableG};

