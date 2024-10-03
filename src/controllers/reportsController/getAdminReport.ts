import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {calculateTodayReport} from "../../utils/calculateTodayReport";
import {
    sendSMSAdminChaleniumSuedi,
    sendSMSAdminLaserDouble, sendSMSAdminNeon, sendSMSAdminPlastic,
    sendSMSAdminSMD,

} from "../../SMS/SMS.IR/sendSms";
import {destinationPhoneNumberArray} from "../../utils/cronFunctions/destinationPhoneNumber";
import {logEvents} from "../../utils/logEvents";
import {sendReportDaySMSToSomeOfUsers} from "../../utils/cronFunctions/sendReportDaySMSToSomeOfUsers";
import {makeTitleData} from "./getAdminReportFunctions/makeTitleData";
import {getBillsDataFromHesabfa} from "./getAdminReportFunctions/getBillsDataFromHesabfa";
import {formatDateForBackend} from "../../utils/functions";
import {getHeaderAndRowsDetails} from "../utility/hesabfa/functions";
import {makeDetailData} from "./getAdminReportFunctions/makeDetailData";
import {calculatePivotByTotalArray} from "./getAdminReportFunctions/calculatePivotByTotalArray";
import {basteBandiCounter} from "./getAdminReportFunctions/basteBandi";


const getAdminReport = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(200).json({message});
        return
    }


    try {

        const {filterItems} = req.body;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

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

        debugger
        // تاریخی که توی مقدار فیلتر هست رو بگیرم.
        // از حسابفا بپرسم کدوم تاریخا توی فاکتورها بخش تگ هستن؟
        // بعدش چک کنم که اون تاریخ توی بسته بندی هست یا نه
        // اگه بود تعداد آیتم بسته بندی شده اون روز رو اضافه میکنم


        const billsDataFromHesabfa = await getBillsDataFromHesabfa(myData)


        // const basteBandiCountObject = await basteBandiCounter(myData)
        // console.log(basteBandiCountObject)
        let temp11: any = (getHeaderAndRowsDetails(billsDataFromHesabfa.response?.data?.Result?.List))
        temp11 = temp11.rows;
        temp11 = temp11.filter((row: any) => row.myStatus === 1)
        const myPivotDataObject = calculatePivotByTotalArray({totalData: temp11})
        const pivotAll = [...myPivotDataObject.pivotAll]
        res.status(200).json({
            titleData: [
                // basteBandiCountObject,
                ...pivotAll
            ],
            detailsData: myPivotDataObject.pivotData,
            message: 'داده ها به روز شد.',
            myPivotDataObject
        })
        return;
        // else {
        //     res.status(500).json({message: "پیام ارسال نشد!!!"});
        //     return
        // }
        /////////////////////////////////////////

    } catch (error: any) {
        res.status(500).json({error: error?.toString()});
        return
    }
}

export {getAdminReport};

