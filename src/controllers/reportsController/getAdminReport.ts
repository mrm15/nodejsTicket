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


        const billsDataFromHesabfa = await getBillsDataFromHesabfa(myData)

        let temp11: any = (getHeaderAndRowsDetails(billsDataFromHesabfa.response?.data?.Result?.List))
        temp11 = temp11.rows;
        temp11 = temp11.filter((row: any) => row.myStatus === 1)
        const myPivotDataObject = calculatePivotByTotalArray({totalData: temp11})
        const detailsData = myPivotDataObject.pivotData
        const pivotAll = myPivotDataObject.pivotAll
        if (true) {
            res.status(200).json({
                titleData: pivotAll,
                detailsData,
                message: 'داده ها به روز شد.',
            })
            return;
        }
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

