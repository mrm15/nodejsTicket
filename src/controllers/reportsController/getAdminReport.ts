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

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayFormatted = formatDateForBackend(today);
        const filterItems = [
            {
                Property: 'Date',
                Operator: '=',
                Value: todayFormatted,
            },
        ];
        // get Data From Hesabfa
        const myData = {
            type: 0, // Only sales invoices (type 0)
            queryInfo: {
                SortBy: 'Date',
                SortDesc: true,
                Take: 10000,
                Skip: 0,
                filters: filterItems
            },
        }
        const billsDataFromHesabfa = await getBillsDataFromHesabfa(myData)

        let temp11: any = (getHeaderAndRowsDetails(billsDataFromHesabfa.response?.data?.Result?.List))
        temp11 = temp11.rows;
        temp11 = temp11.filter((row: any) => row.myStatus === 1)
        const myPivotData = calculatePivotByTotalArray({totalData:temp11})

        const calculateTodayReportResult = await calculateTodayReport();


        const titleData = makeTitleData(calculateTodayReportResult);
        // const detailData = makeDetailData(temp11)


        if (true) {
            res.status(200).json({
                titleData,
                detailsData:myPivotData,
                message: 'تسک انجام شد.',
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

