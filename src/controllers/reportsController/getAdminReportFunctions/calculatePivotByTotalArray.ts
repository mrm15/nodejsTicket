import {reportArray} from "../../../utils/functions";


export const calculatePivotByTotalArray = ({totalData}: any) => {

    return reportArray.map(myRowWithFilters => {
        // Filter rows that contain any of the keywords in filterTextForPivot
        const filteredRows = totalData.filter((row: { [x: string]: string | string[]; }) => {
            // Check if any of the keywords are included in the myKey field of the row
            return myRowWithFilters.filterTextForPivot.some(keyword => row[myRowWithFilters.myKey].includes(keyword));
        });
        // Reduce the filtered rows to accumulate the data
        const pivotResult = filteredRows.reduce((acc: any[], row: any) => {
            const key = row[myRowWithFilters.myKey];
            // Find if the key already exists in the accumulator
            const existingEntry = acc.find((item: any) => item[myRowWithFilters.myKey] === key);

            if (existingEntry) {
                // If the key exists, accumulate the sumKey and countKey
                existingEntry[myRowWithFilters.sumKey] += row[myRowWithFilters.sumKey];
                existingEntry[myRowWithFilters.countKey] += (row[myRowWithFilters.countKey]);
                existingEntry["counter"] += 1;
                existingEntry["rowData"].push(row);  // Keep track of the original rows
            } else {
                // If the key does not exist, create a new entry
                acc.push({
                    [myRowWithFilters.myKey]: key,
                    [myRowWithFilters.sumKey]: row[myRowWithFilters.sumKey],
                    [myRowWithFilters.countKey]: row[myRowWithFilters.countKey],
                    counter: 1,
                    rowData: [row],  // Start with the current row
                });
            }

            return acc;
        }, [])



        return {
            caption: myRowWithFilters.caption,
            myKey: myRowWithFilters.myKey,
            sumKey: myRowWithFilters.sumKey,
            countKey: myRowWithFilters.countKey,
            pivotResult
        };
    });
};
