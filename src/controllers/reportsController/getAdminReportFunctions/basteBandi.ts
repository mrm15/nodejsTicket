import {getBillsDataFromHesabfa} from "./getBillsDataFromHesabfa";
import {timestampToTimeFromHesabfa} from "../../utility/timestampToTimeFromHesabfa";

export const basteBandiCounter = async (myData: any) => {

    const dateFiltered = myData.queryInfo.filters.find((row: any) => row.Property === "Date").Value;
    const persianDate:string = timestampToTimeFromHesabfa(dateFiltered, true);

    // توی  تگ تاریخ رو  با خط تیره ذخیره کردیم
    const persianDateDash = persianDate.replaceAll("/" , "-")



    const myData1 = {
        type: 0, // Only sales invoices (type 0)
        queryInfo: {
            SortBy: 'Date',
            SortDesc: true,
            Take: 500,
            Skip: 0,
            filters: [
                {Property: "Status", Operator: "=", Value: "1"}
            ]
        },
    }


    const billsDataFromHesabfa = await getBillsDataFromHesabfa(myData1);

    const allData: any[] = billsDataFromHesabfa?.response?.data?.Result?.List
    if (allData) {
        const allFilteredData = allData.filter(row => row.Tag.includes(`db\":\"${persianDateDash}`))
        const lengthOfData = allFilteredData.length

        return {
            title: "تعداد بسته بندی",
            value: lengthOfData
        }
    }
    return {
        title: "تعداد بسته بندی",
        value: 0
    }

}