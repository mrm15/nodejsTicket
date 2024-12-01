import {hesabfaApiRequest} from "../../controllers/utility/hesabfa/functions";
import {JsDateToIso8601ToHesabfaSetZeroHours} from "../dateConvert";
import ensureDataFolderExists from "../ensureDataFolderExists";
import saveDataToFile from "../saveDataToFile";
import sleep from "../sleep";

// Function to increment the date by one day
const incrementDateByOneDay = (date: Date): Date => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
};


const updateBillsFileFunction = async (startDate: Date, endDate: Date) => {
    const directoryUrl = "../../pool/bills";
    const fileName = "bills";
    let currentDate = startDate

    while (currentDate <= endDate) {
        try {

            const myData = {
                take: 1000,
                skip: 0,
                type: 0, // فاکتور های فروش رو میخوام
                queryInfo: {
                    sortBy: 'Date',
                    sortDesc: true,
                    take: 1000,
                    skip: 0,
                    filters: [
                        {
                            property: 'Date',
                            operator: '=',
                            value: JsDateToIso8601ToHesabfaSetZeroHours(currentDate)
                        }
                    ]
                }
            }
            const myResult: any = await hesabfaApiRequest("invoice/getinvoices", myData);
            if (myResult.response.status === 200) {

                const hesabfaResult = myResult.response.data.Result
                if (hesabfaResult) {
                    if (hesabfaResult.List.length > 0) {
                        await saveDataToFile({directoryUrl, date: (currentDate + ""), fileName, data: hesabfaResult.List})
                    }
                }

            }
            // console.log(`Data for ${currentDate.toISOString().split('T')[0]} fetched successfully.`);
            currentDate = incrementDateByOneDay(currentDate);
            await sleep(1000); // Sleep for 1 second between requests
        } catch (error) {
            console.error(`Error fetching data for ${currentDate.toISOString().split('T')[0]}:`, error);
        }
    }
    return 'دریافت داده‌ها کامل شد! 🎉'
}


export default updateBillsFileFunction