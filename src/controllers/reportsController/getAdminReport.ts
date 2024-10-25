import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {getBillsDataFromHesabfa} from "./getAdminReportFunctions/getBillsDataFromHesabfa";
import {getHeaderAndRowsDetails} from "../utility/hesabfa/functions";
import makeDataObject from "../../utils/ReportsUtils/reportFunctions/makeDataObject";
import {getBillsDataFromPoolBill} from "../../utils/getBillsDataFromPoolBill/getBillsDataFromPoolBill";


const getAdminReport = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(200).json({message});
        return
    }


    try {

        const {filterItems} = req.body;
        // const today = new Date();
        // today.setHours(0, 0, 0, 0);

        const myData = {
            type: 0, // Only sales invoices (type 0)
            queryInfo: {
                SortBy: 'Date',
                SortDesc: true,
                Take: 100000,
                Skip: 0,
                filters: filterItems
            },
        }
        if (!myData.queryInfo.filters) {
            res.status(500).json({message: "لطفا ورودی ها رو چک کنید"})
            return
        }


        // تاریخی که توی مقدار فیلتر هست رو بگیرم.
        // از حسابفا بپرسم کدوم تاریخا توی فاکتورها بخش تگ هستن؟
        // بعدش چک کنم که اون تاریخ توی بسته بندی هست یا نه
        // اگه بود تعداد آیتم بسته بندی شده اون روز رو اضافه میکنم


        // const billsDataFromHesabfa = await getBillsDataFromHesabfa(myData)
        //


        // const basteBandiCountObject = await basteBandiCounter(myData)
        // console.log(basteBandiCountObject)
        const allBills =await getBillsDataFromPoolBill({filters: filterItems})
        debugger
        // let temp11: any = (getHeaderAndRowsDetails(billsDataFromHesabfa.response?.data?.Result?.List))
        let temp11: any = (getHeaderAndRowsDetails(allBills))
        temp11 = temp11.rows;
        temp11 = temp11.filter((row: any) => row.myStatus === 1)

        // const myPivotDataObject = calculatePivotById({totalData: temp11, myArray:detailReportArray })
        // const pivotAll = [...myPivotDataObject.pivotAll]
        // const tables = makeTables(pivotAll)
        // const dataWithObject = makeDataObject({totalData: temp11})
        const dataObject = makeDataObject({totalData: temp11})
        res.status(200).json({
            // tables,
            treeView : dataObject.treeViewData,
            tableView : dataObject.tableView,
            // titleData: [
            //     // basteBandiCountObject,
            //     // ...pivotAll
            // ],
            message: 'داده ها به روز شد.',
        })
        return;


    } catch (error: any) {
        debugger
        res.status(500).json({error: error?.toString()});
        return
    }
}

export {getAdminReport};

