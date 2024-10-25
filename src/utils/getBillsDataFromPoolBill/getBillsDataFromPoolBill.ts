// Utility function to read all JSON files in the 'pool/bills' directory
import {readBillsData} from "./readBillsData";
import evaluateConditionFilters from "./evaluateConditionFilters";

export const getBillsDataFromPoolBill = async ({filters}: { filters: any[] }) => {

    const allData = await readBillsData();


    // Filter the data based on all conditions
    if (filters.length > 0) {
        const filteredData = allData.filter((row) => {
            // Apply all filters and ensure all conditions are met

            return filters.every((filter: any) => evaluateConditionFilters(row, filter));
        })

        return filteredData;
    }

    return allData;
};
