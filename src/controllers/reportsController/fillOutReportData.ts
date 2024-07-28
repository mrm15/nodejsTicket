import {hesabfaApiRequest} from "../utility/hesabfa/functions";

export const fillOutReportData = async (accessList: string[]) => {
    debugger
    const temp = []
    if (accessList.includes("widgetAmountOfBills7days")) {
        // Calculate the date three days before today
        const formatDateForBackend = (date: Date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}T00:00:00`;
        };

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
        fourDaysAgo.setDate(today.getDate() - 2);
        const fiveDaysAgo = new Date(today);
        fiveDaysAgo.setDate(today.getDate() - 2);
        const sixDaysAgo = new Date(today);
        sixDaysAgo.setDate(today.getDate() - 2);
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 2);

        const todayFormatted = formatDateForBackend(today);
        const yesterdayFormatted = formatDateForBackend(yesterday);
        const dayBeforeYesterdayFormatted = formatDateForBackend(dayBeforeYesterday);
        const fourDaysAgoFormatted = formatDateForBackend(fourDaysAgo);
        const fiveDaysAgoFormatted = formatDateForBackend(fourDaysAgo);
        const sixDaysAgoFormatted = formatDateForBackend(sixDaysAgo);
        const sevenDaysAgoFormatted = formatDateForBackend(sevenDaysAgo);

        const nowToday = todayForm


        const filterItems = [
            {
                Property: 'Date',
                Operator: '>=',
                Value: dayBeforeYesterdayFormatted,
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






        temp.push({
            type: "text",
            title: "تعداد فاکتور های سه روز گذشته",
            data: [
                {text: "21-09-1402", value: "123",},
                {text: "20-09-1402", value: "456",},
                {text: "19-09-1402", value: "789",},
            ]
        })
    }

    return temp


}