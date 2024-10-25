import {countFilterResultDateStatus, getHeaderAndRows, hesabfaApiRequest} from "../utility/hesabfa/functions";
import {formatDateForBackend} from "../../utils/functions";

export const fillOutReportData = async (accessList: string[]) => {

    const temp: any[] = []
    if (accessList.includes("widgetAmountOfBills7days")) {
        // Calculate the date three days before today


        // Get today's date and set the time to the start of the day
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Calculate yesterday's date
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        // Calculate the day before yesterday's date
        const dayBeforeYesterday = new Date(today);
        dayBeforeYesterday.setDate(today.getDate() - 2);

        const fourDaysAgo = new Date(today);
        fourDaysAgo.setDate(today.getDate() - 3);
        const fiveDaysAgo = new Date(today);
        fiveDaysAgo.setDate(today.getDate() - 4);
        const sixDaysAgo = new Date(today);
        sixDaysAgo.setDate(today.getDate() - 5);
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 6);

        const todayFormatted = formatDateForBackend(today);
        const yesterdayFormatted = formatDateForBackend(yesterday);
        const dayBeforeYesterdayFormatted = formatDateForBackend(dayBeforeYesterday);
        const fourDaysAgoFormatted = formatDateForBackend(fourDaysAgo);
        const fiveDaysAgoFormatted = formatDateForBackend(fourDaysAgo);
        const sixDaysAgoFormatted = formatDateForBackend(sixDaysAgo);
        const sevenDaysAgoFormatted = formatDateForBackend(sevenDaysAgo);

        const nowTodayToShowFront = today.toLocaleDateString('fa-ir')
        const yesterdayToShowFront = yesterday.toLocaleDateString('fa-ir')
        const dayBeforeYesterdayToShowFront = dayBeforeYesterday.toLocaleDateString('fa-ir')
        const fourDaysAgoToShowFront = fourDaysAgo.toLocaleDateString('fa-ir')
        const fiveDaysAgoToShowFront = fiveDaysAgo.toLocaleDateString('fa-ir')
        const sixDaysAgoToShowFront = sixDaysAgo.toLocaleDateString('fa-ir')
        const sevenDaysAgoToShowFront = sevenDaysAgo.toLocaleDateString('fa-ir')


        const filterItems = [
            {
                Property: 'Date',
                Operator: '>=',
                Value: sevenDaysAgoFormatted,
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
        let myResult
        try {
            myResult = await hesabfaApiRequest("invoice/getinvoices", myData)
        } catch (error) {
            throw new Error("مشکل در دریافت اطلاعات از حسابفا")
        }


        let temp11: any = (getHeaderAndRows(myResult.response?.data.Result.List))
        temp11 = temp11.rows


        const todayData = countFilterResultDateStatus(temp11, todayFormatted)
        const yesterdayData = countFilterResultDateStatus(temp11, yesterdayFormatted)
        const dayBeforeYesterdayData = countFilterResultDateStatus(temp11, dayBeforeYesterdayFormatted)
        const fourDaysAgoData = countFilterResultDateStatus(temp11, fourDaysAgoFormatted)
        const fiveDaysAgoData = countFilterResultDateStatus(temp11, fiveDaysAgoFormatted)
        const sixDaysAgoData = countFilterResultDateStatus(temp11, sixDaysAgoFormatted)
        const sevenDaysAgoData = countFilterResultDateStatus(temp11, sevenDaysAgoFormatted)

        const dt = {
            todayData,
            yesterdayData,
            dayBeforeYesterdayData,
            fourDaysAgoData,
            fiveDaysAgoData,
            sixDaysAgoData,
            sevenDaysAgoData,
        }

        const chartData = {
            type: "reChart",
            dataKey: "Date",
            keyArray: ["تعداد فاکتور", "تایید شده", "جمع تایید شده"],
            data: [
                {
                    Date: sevenDaysAgoToShowFront,
                    "تعداد فاکتور": dt.sevenDaysAgoData.verifiedBillsNumber,
                    "جمع تایید شده": dt.sevenDaysAgoData.submittedBillTotalSum,
                    "تایید شده": dt.sevenDaysAgoData.verifiedBillsNumber
                },
                {
                    Date: sixDaysAgoToShowFront,
                    "تعداد فاکتور": dt.sixDaysAgoData.verifiedBillsNumber,
                    "جمع تایید شده": dt.sixDaysAgoData.submittedBillTotalSum,
                    "تایید شده": dt.sixDaysAgoData.verifiedBillsNumber
                },

                {
                    Date: fiveDaysAgoToShowFront,
                    "تعداد فاکتور": dt.fiveDaysAgoData.verifiedBillsNumber,
                    "جمع تایید شده": dt.fiveDaysAgoData.submittedBillTotalSum,
                    "تایید شده": dt.fiveDaysAgoData.verifiedBillsNumber
                },

                {
                    Date: fourDaysAgoToShowFront,
                    "تعداد فاکتور": dt.fourDaysAgoData.verifiedBillsNumber,
                    "جمع تایید شده": dt.fourDaysAgoData.submittedBillTotalSum,
                    "تایید شده": dt.fourDaysAgoData.verifiedBillsNumber
                },

                {
                    Date: dayBeforeYesterdayToShowFront,
                    "تعداد فاکتور": dt.dayBeforeYesterdayData.verifiedBillsNumber,
                    "جمع تایید شده": dt.dayBeforeYesterdayData.submittedBillTotalSum,
                    "تایید شده": dt.dayBeforeYesterdayData.verifiedBillsNumber
                },

                {
                    Date: nowTodayToShowFront,
                    "تعداد فاکتور": dt.todayData.verifiedBillsNumber,
                    "جمع تایید شده": dt.todayData.submittedBillTotalSum,
                    "تایید شده": dt.todayData.verifiedBillsNumber
                },
            ]
        }
        temp.push(chartData)
    }

    return temp


}