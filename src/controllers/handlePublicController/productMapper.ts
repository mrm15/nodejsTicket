import {mainArray} from "./mainArray";

let cachedData: any = null;
let lastFetchTime: number | null = null;
const CACHE_DURATION_MS = 6 * (60 * 60 * 1000); // 6 hours in milliseconds

export const productMapper = (productList: any[]) => {
    const now = Date.now();

    // Check if cache is still valid
    if (cachedData && lastFetchTime && now - lastFetchTime < CACHE_DURATION_MS) {
        // console.log("Returning cached data");
        return cachedData;
    }

    // Process and cache the data
    const myMainArray = [...mainArray];
    myMainArray.forEach(mainRow => {
        mainRow.subMenu.forEach(subMenuRow => {
            subMenuRow.items.forEach(itemRow => {
                const foundProduct = productList.find(singleItem => singleItem.Code === itemRow.Code) || null;
                if (foundProduct) {
                    Object.assign(itemRow, foundProduct); // Updates `itemRow` properties directly
                }
            });
        });
    });

    // Update cache
    cachedData = myMainArray;
    lastFetchTime = now;

    return myMainArray;
};
