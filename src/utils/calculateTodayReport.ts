import {calculatePivot, formatDateForBackend, reportArray} from "./functions";
import {getHeaderAndRowsDetails, hesabfaApiRequest} from "../controllers/utility/hesabfa/functions";
import {getCurrentTimeStamp} from "./timing";

export const calculateTodayReport = async (resultType: "all" | "detail" = "all") => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayFormatted = formatDateForBackend(today);

    // const todayData = countFilterResultDateStatus(temp11, todayFormatted)

    const filterItems = [
        {
            Property: 'Date',
            Operator: '=',
            Value: todayFormatted,
        },
    ];


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
    const myResult = await hesabfaApiRequest("invoice/getinvoices", myData)

    if (!myResult?.response?.data?.Success) {
        throw new Error("مشکل در دریافت اطلاعات از حسابفا")
    }


    let temp11: any = (getHeaderAndRowsDetails(myResult.response?.data.Result.List))
    temp11 = temp11.rows;
    temp11 = temp11.filter((row: any) => row.myStatus === 1)
    const currentTimeHere = getCurrentTimeStamp()?.toLocaleTimeString('fa-ir')
    /////////////////////////////////////////


    const getPivotValue = (index: any) => {

        const pivotResult = calculatePivot({
            filterTextForPivot: reportArray[index].filterTextForPivot,
            totalData: temp11,
            myKey: reportArray[index].myKey,
            sumKey: reportArray[index].sumKey,
            countKey: reportArray[index].countKey,
            giveMeTotalSum: true
        });
        return (pivotResult?.toFixed(2)) || 0;
    }


    if (resultType === "all") {
        const plaksi2_8Value = getPivotValue(0);
        const simplePunchValue = getPivotValue(1);
        const proPunchValue = getPivotValue(2);
        const doubleValue = getPivotValue(3);
        const duqi10milValue = getPivotValue(4);
        const duqi5milValue = getPivotValue(5);

        const ESTILFELEZ = getPivotValue(6);
        const CHALANDSUEDI = getPivotValue(7);
        const NEONPLASTIC = getPivotValue(8);
        const NEONFELAXI = getPivotValue(9);
        const SMD = getPivotValue(10);
        const STICKER_OJRAT = getPivotValue(11);
        const AMAR_VARAQ_Estil = getPivotValue(12);
        const AMAR_PVC = getPivotValue(13);
        const PLAKSI_Varaq = getPivotValue(14);

        return {
            plaksi2_8Value,
            simplePunchValue,
            proPunchValue,
            doubleValue,
            duqi10milValue,
            duqi5milValue,
            ESTILFELEZ,
            CHALANDSUEDI,
            NEONPLASTIC,
            NEONFELAXI,
            SMD,
            STICKER_OJRAT,
            AMAR_VARAQ_Estil,
            AMAR_PVC,
            PLAKSI_Varaq
        }
    } else if (resultType === "detail") {

        const resData = reportArray.map(row => {

            const caption= row.caption
            const temp =  calculatePivot({
                filterTextForPivot: row.filterTextForPivot,
                totalData: temp11,
                myKey: row.myKey,
                sumKey: row.sumKey,
                countKey: row.countKey,
                giveMeTotalSum : false


            })



            return {
                caption,
                temp,
            }

        })

        return resData


    }

}