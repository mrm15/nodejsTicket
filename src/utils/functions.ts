export const setNullIfEmpty = (value: string | null | undefined) => (value === '' ? null : value);

export const getProductListFromFile = () => {

    const fileAddress = "./productList.json";


}

export const formatDateForBackend = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00`;
};

export const reportArray = [
    {
        caption: "پلکسی 2.8",
        filterTextForPivot: [
            "اجرت برش لیزر ورق 2.8 میل"
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
    {
        caption: "پانچ ساده",
        filterTextForPivot: [
            "اجرت پانچی کردن ( حالت ساده ) طلق 2.8 میل"
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
    {
        caption: "پانچ طرح دار",
        filterTextForPivot: [
            "اجرت پانچی کردن ( حالت طرحدار ) طلق 2.8 میل"
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
    {
        caption: "دوبل",
        filterTextForPivot: [
            "اجرت دوبل همراه با مبلغ کلر فرم"
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },

    {
        caption: "دوغی 10 میل",
        filterTextForPivot: [
            "اجرت برش لیزر پلکسی 10 میل"
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
    {
        caption: "دوغی 5 میل",
        filterTextForPivot: [
            "اجرت برش لیزر پلکسی 5 میل"
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
    {
        caption: "استیل و فلز",
        filterTextForPivot: [
            "استیل و فلز",
            "اجرت ساخت استیل حروف های سخت",
            "اجرت ساخت جوش فایبر",
            "اجرت ساخت لبه یک تیکه ( دوطرفه ) جوش فایبر",
            "اجرت ساخت حروف آهن",
            "اجرت ساخت استیل حروف عادی"
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },

    {
        caption: "چلنیوم و سوئدی",
        filterTextForPivot: [
            "اجرت ساخت چلنیوم",
            "اجرت ساخت حروف سوئدی",
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },

    {
        caption: " نئون پلاستیک",
        filterTextForPivot: [
            "اجرت ساخت نئون پلاستیک ( حروف استاندارد ) لبه ۳ تا ۸ سانت",
            "اجرت ساخت نئون پلاستیک ( حروف سخت) لبه ۳ تا ۸ سانت",
            "اجرت ساخت نئون پلاستیک ( حروف استاندارد ) لبه 3 تا 8 سانت",
            "اجرت ساخت نئون پلاستیک ( حروف سخت) لبه 3 تا 8 سانت",
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },

    {
        caption: "نئون فلکسی",
        filterTextForPivot: [
            // "اجرت ساخت نئون فلکس ( حروف آسان )",
            // "اجرت ساخت نئون فلکس ( حروف سخت )",
            // "اجرت ساخت نئون فلکس ( لوگو و طرح آسان )",
            // "اجرت ساخت نئون فلکس ( لوگو و طرح سخت )",
            "اجرت ساخت نئون فلکس ",
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
]


export const calculatePivot = ({filterTextForPivot, totalData, myKey, sumKey, countKey,giveMeTotalSum=false}: any) => {
    // Filter rows that contain any of the keywords in filterTextForPivot

    debugger
    const rowsArrayWithSpecificWord = totalData.filter((row: any) => {
        // Check if any of the keywords are included in the myKey field of the row
        return filterTextForPivot.some((singleWord: any) => row[myKey].includes(singleWord));
    }).map((row: any) => {
        // Return only the specified keys

        return {
            [myKey]: row[myKey],
            [sumKey]: row[sumKey],
            [countKey]: row[countKey],
            rowHolder: {...row}
        };
    });




    let result = 0;
    if(giveMeTotalSum){
        result = rowsArrayWithSpecificWord.reduce((acc: any, row:any)=>{ return row[countKey] + acc },0)
    }else {
        // Reduce the filtered rows to unique values with summed counts and sums
        result = rowsArrayWithSpecificWord.reduce((acc: any, row: any) => {
            const existingRow = acc.find((item: any) => item[myKey] === row[myKey])
            if (existingRow) {
                existingRow["counter"] += 1;
                existingRow[sumKey] += row[sumKey];
                existingRow[countKey] += row[countKey];
                existingRow["rowData"].push(row.rowHolder)
            } else {
                acc.push({
                    [myKey]: row[myKey],
                    [sumKey]: row[sumKey],
                    [countKey]: row[countKey],
                    counter: 1,
                    rowData: [{...row.rowHolder}],
                });
            }

            return acc;
        }, []);
    }


    return result;
};

