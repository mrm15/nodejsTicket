// Utility function to read all JSON files in the 'pool/bills' directory
import {readBillsData} from "./readBillsData";
import evaluateConditionFilters from "./evaluateConditionFilters";

export const getBillsDataFromPoolBill = async ({filters}: { filters: any[] }) => {
    debugger
    const allData = await readBillsData();

    debugger
    // Filter the data based on all conditions
    if (filters.length > 0) {
        const filteredData = allData.filter((row) => {
            // Apply all filters and ensure all conditions are met
            debugger
            return filters.every((filter: any) => evaluateConditionFilters(row, filter));
        })

        return filteredData;
    }
    debugger
    return allData;
};
