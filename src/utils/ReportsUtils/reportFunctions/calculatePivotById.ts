import {INeededObject} from "../../../controllers/reportsController/getAdminReportFunctions/getRowsOfBills";

export const findFilterRows = (totalData: any, myRowWithFilters: { filterIdForPivot:string[] ;caption: any; id: any; bgColor?: any; textColor?: any; myKey:string; } ) => {
    return totalData.filter((row: any) => {
        // Check if any of the keywords are included in the myKey field of the row
        const temp = myRowWithFilters?.filterIdForPivot.some((keyword: string) => {
            const ttt = row[myRowWithFilters?.myKey].includes(keyword)
            return ttt
        });
        return temp
    })
}

export const calculateFilteredRowsValues = (filteredRows: any, myRowWithFilters: any) => {
    return filteredRows.reduce((acc: any, row: any) => {
        return row[myRowWithFilters.countKey] + acc
    }, 0)
}

export const calculateValuesAndTotalPrice = (filteredRows: any, myRowWithFilters: any) => {

    const ttt  = filteredRows.reduce((acc: { totalValue: any; totalPrice: any; }, row: { [x: string]: any; }) => {
        acc.totalValue += row[myRowWithFilters.countKey];
        acc.totalPrice += row[myRowWithFilters.sumKey];
        return acc;
    }, {totalValue: 0, totalPrice: 0});

    return ttt
}

export const calculateFilteredPrices = (filteredRows: any, myRowWithFilters: any) => {
    return filteredRows.reduce((acc: any, row: any) => {
        return row[myRowWithFilters.sumKey] + acc
    }, 0)
}

export const calculateSingleObject = (totalData:any,myRowWithFilters:  { filterIdForPivot:string[] ;caption: any; id: any; bgColor?: any; textColor?: any; myKey:string; })=>{
    const filteredRows = findFilterRows(totalData, myRowWithFilters)
    const t = calculateFilteredRowsValues(filteredRows, myRowWithFilters)

    const calcTotalPrice = calculateFilteredPrices(filteredRows, myRowWithFilters);

    return {
        title: myRowWithFilters?.caption,
        value: t?.toFixed(2),
        totalPrice: calcTotalPrice || 0,
        id: myRowWithFilters?.id,
        bgColor: myRowWithFilters?.bgColor || "#fff",
        textColor: myRowWithFilters?.textColor || "#000"
    }
}


export const calculatePivotById = ({totalData, myArray}: any) => {


    const pivotData = myArray.map((myRowWithFilters: any) => {
        // Filter rows that contain any of the keywords in filterTextForPivot
        const filteredRows = totalData.filter((row: any) => {
            // Check if any of the keywords are included in the myKey field of the row

            const temp = myRowWithFilters.filterIdForPivot.some((keyword: string) => {
                const ttt = row[myRowWithFilters.myKey].includes(keyword)
                return ttt
            });

            return temp;
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

    const pivotAll = myArray.map((myRowWithFilters: any) => {
        return calculateSingleObject(totalData,myRowWithFilters)
    })


    return {
        pivotAll,
        pivotData
    }

};
//calculateSingleObjectSeperatedByContactCode

interface DataItem {
    myContactCode: string;
    // Include other properties as needed
    [key: string]: any;
}

const groupByContactCode = (totalData: DataItem[]): DataItem[][] => {
    const grouped: Record<string, DataItem[]> = totalData.reduce((acc:any, item) => {
        const code = item.myContactCode;
        if (!acc[code]) {
            acc[code] = [];
        }
        acc[code].push(item);
        return acc;
    }, {});

    // Convert the grouped object into an array of arrays
    return Object.values(grouped);
};



export const calculateSingleObjectSeperatedByContactCode = (totalData:INeededObject[],myRowWithFilters:  { filterIdForPivot:string[] ;caption: any; id: any; bgColor?: any; textColor?: any; myKey:string; })=>{
    const filteredRows = findFilterRows(totalData, myRowWithFilters)

    // اینجا میخوایم که بر حسب شماره مشتری جدا کنیم پس باید
    // ردیف های فیلتر شده که شامل اجرت ساخت هستند رو برحسب شماره مشتری گروه بندی میکنیم
    const groupedData = groupByContactCode(filteredRows);


    const arraysOfObjects = groupedData.map(singleArray=>{

        const t = calculateFilteredRowsValues(singleArray, myRowWithFilters)

        const singleContactValue = {
            myContactCode:singleArray[0]?.myContactCode,
            myContactName:singleArray[0]?.myContactName,
            phoneNumber:singleArray[0]?.myContactPhoneNumber,
            value: t,
        }
        return singleContactValue
    })

    arraysOfObjects.sort((a, b) => b.value - a.value);

    return arraysOfObjects
}

