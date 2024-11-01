import {CustomRequestMyTokenInJwt} from "../../../middleware/verifyJWT";
import {NextFunction, Response} from "express";
import {getBillsDataFromPoolBill} from "../../../utils/getBillsDataFromPoolBill/getBillsDataFromPoolBill";
import getRowsOfInvoiceItemsFromBills from "../getAdminReportFunctions/getRowsOfBills";
import calculateBillDepartmentActivity
    from "../../../utils/calculateBillDepartmentActivity/calculateBillDepartmentActivity";

const getBillUsersReport = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(200).json({message});
        return
    }


    try {



        const startTime = Date.now();
        const {filterItems} = req.body;


        // تاریخی که توی مقدار فیلتر هست رو بگیرم.
        // از حسابفا بپرسم کدوم تاریخا توی فاکتورها بخش تگ هستن؟
        // بعدش چک کنم که اون تاریخ توی بسته بندی هست یا نه
        // اگه بود تعداد آیتم بسته بندی شده اون روز رو اضافه میکنم


        // const billsDataFromHesabfa = await getBillsDataFromHesabfa(myData)
        //


        // const basteBandiCountObject = await basteBandiCounter(myData)
        // console.log(basteBandiCountObject)
        const allBills = await getBillsDataFromPoolBill({filters: filterItems})

        // let temp11: any = (getHeaderAndRowsDetails(billsDataFromHesabfa.response?.data?.Result?.List))
        // let temp11: any = (getHeaderAndRowsDetails(allBills))
        let temp11: any = getRowsOfInvoiceItemsFromBills(allBills)
        // // temp11 = temp11.rows;
        // const temp11Status1 = temp11.filter((row: any) => row.myStatus === 1)
        // debugger
        // // const myPivotDataObject = calculatePivotById({totalData: temp11, myArray:detailReportArray })
        // // const pivotAll = [...myPivotDataObject.pivotAll]
        // // const tables = makeTables(pivotAll)
        // // const dataWithObject = makeDataObject({totalData: temp11})
        // const dataObject = makeDataObject({totalData: temp11Status1});

        const result =await calculateBillDepartmentActivity(temp11);





        const endTime = Date.now();
        const timeCalculationInSeconds = ((endTime - startTime) / 1000).toFixed(2); // Convert to seconds and format

        res.status(200).json({
            data: result,
            message: '  data Updated! ' + timeCalculationInSeconds + "s",
        })
        return;


    } catch (error: any) {

        res.status(500).json({error: error?.toString()});
        return
    }


}

export default getBillUsersReport