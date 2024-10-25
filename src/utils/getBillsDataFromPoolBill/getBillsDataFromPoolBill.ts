// Utility function to read all JSON files in the 'pool/bills' directory
import {readBillsData} from "./readBillsData";

export const getBillsDataFromPoolBill = async () => {

    const allData = await readBillsData()

    return allData
};
