// Utility function to read all JSON files in the 'pool/bills' directory
import {readBillsData} from "./readBillsData";
import evaluateConditionFilters from "./evaluateConditionFilters";

let billsCache: any[] | null = null;
let lastCacheUpdate: number | null = null; // زمان آخرین به‌روزرسانی کش
const CACHE_TTL = 1000 * 60 * 15; // 15 دقیقه

// تابع برای مدیریت کش
const getCachedBillsData = async (): Promise<any[]> => {
    const now = Date.now();

    if (!billsCache || !lastCacheUpdate || now - lastCacheUpdate > CACHE_TTL) {
        console.log("Cache expired or not available. Reading data from file system.");
        billsCache = await readBillsData();
        lastCacheUpdate = now; // به‌روزرسانی زمان کش
    } else {
        console.log("Using cached data.");
    }

    return billsCache;
};

export const getBillsDataFromPoolBill = async ({filters}: { filters: any[] }) => {

    // const allData = await readBillsData();
    const allData = await getCachedBillsData();

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
