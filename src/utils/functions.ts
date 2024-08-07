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
    //0
    {
        caption: "پلکسی 2.8",
        filterTextForPivot: [
            "اجرت برش لیزر ورق 2.8 میل"
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
    //1
    {
        caption: "پانچ ساده",
        filterTextForPivot: [
            "اجرت پانچی کردن ( حالت ساده ) طلق 2.8 میل"
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
    //2
    {
        caption: "پانچ طرح دار",
        filterTextForPivot: [
            "اجرت پانچی کردن ( حالت طرحدار ) طلق 2.8 میل"
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
    //3
    {
        caption: "دوبل",
        filterTextForPivot: [
            "اجرت دوبل همراه با مبلغ کلر فرم"
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
    //4
    {
        caption: "دوغی 10 میل",
        filterTextForPivot: [
            "اجرت برش لیزر پلکسی 10 میل"
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
    //5
    {
        caption: "دوغی 5 میل",
        filterTextForPivot: [
            "اجرت برش لیزر پلکسی 5 میل"
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
    //6
    {
        caption: "استیل و فلز",
        filterTextForPivot: [
            // "استیل و فلز",
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
    //7
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
    //8
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
    //9
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
    //10
    {
        caption: "SMD",
        filterTextForPivot: [
            "SMD آفتابی با سیم کشی و منگنه",
            "SMD سفید با سیم کشی و منگنه",
            "SMD قرمز با سیم کشی و منگنه",
            "SMD انبه ای با سیم کشی و منگنه",
            "اینجکشن آفتابی با سیم کشی و منگنه",
            "اینجکشن سفید با سیم کشی و منگنه",
            "اینجکشن قرمز با سیم کشی و منگنه",
            "اینجکشن انبه ای با سیم کشی و منگنه",
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
    // 11 اجرت نصب استیکر11
    {
        caption: "اجرت استیکر",
        filterTextForPivot: [
            "استیکر آبی کاربنی همراه با اجرت نصب روی پلکسی",
            "استیکر مشکی همراه با اجرت نصب روی پلکسی",
            "استیکر قرمز با اجرت نصب روی پلکسی",
            "استیکر سبز همراه با اجرت نصب روی پلکسی",
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
    // 12 ورق 12
    {
        caption: "ورق ها",
        filterTextForPivot: [
            // "ورق استیل طلایی",
            // "ورق آهن",
            // "ورق استیل نقره ای",
            // "ورق استیل دودی",
            // "ورق استیل مسی",
            // "ورق مشکی 2.5 میل",
            // "ورق مشکی ۲/۵ میل",
            // "ورق دودی آینه ای 1 میل",
            // "ورق دودی آینه ای ۱ میل",
            // "ورق",
            // "ورق",
            'ورق آهن 1 یک میل ابعاد 120 * 240',
            'ورق استیل طلایی آینه ای 7 دهم میل  کد 304 ابعاد 120*240',
            'ورق استیل طلایی اینه ای 1 میل کد 304 ابعاد 120*240',
            'ورق استیل طلایی خشدار 7 دهم میل کد 304 ابعاد 120*240',
            'ورق استیل طلایی خشدار 1 میل کد 304 ابعاد 120*240',
            'ورق استیل نقره ای آینه ای  7 دهم میل کد 304 ابعاد 120*240',
            'ورق استیل نقره ای اینه ای 1 میل کد 304 ابعاد 120*240',
            'ورق استیل نقره ای خشدار 7 دهم میل کد 304 ابعاد 120*240',
            'ورق استیل نقره ای خشدار  1 میل کد 304 ابعاد 120*240',
            'ورق استیل دودی اینه ای 7 دهم میل کد 304 ابعاد 120*240',
            'ورق استیل دودی اینه ای 1 میل کد 304 ابعاد 120*240',
            'ورق استیل دودی خشدار 7 دهم میل کد 304 ابعاد 120*240',
            'ورق استیل دودی خشدار  1 میل کد 304 ابعاد 120*240',
            'ورق استیل مسی ( رزگلد ) اینه ای 7 دهم میل کد 304 ابعاد 120*240',
            'ورق استیل مسی ( رزگلد ) اینه ای 1 دهم میل کد 304 ابعاد 120*240',
            'ورق استیل مسی ( رزگلد ) خشدار 7 دهم میل کد 304 ابعاد 120*240',
            'ورق استیل مسی ( رزگلد ) خشدار 1 میل کد 304 ابعاد 120*240',
            'ورق آهن 1/5 یک و نیم میل ابعاد 120 * 240',
            'ورق آهن 0/8 میل ابعاد 120*240',
            'ورق 1 میل کالوانیزه',
            'ورق 1.2 میل روغنی',
            'ورق استیل طلایی آینه ای 0/5',
            'ورق استیل طلایی خشدار 0/5',
            'ورق استیل طلایی خشدار 0/6',
            'ورق استیل دودی آینه ای 0/5',
            'ورق مشکی 2/5 میل',
            'ورق استیل نقره ای خشدار 0/5 دهم',
            'ورق استیل عرض 1 cm',
            'ورق استیل عرض 2 cm',
            'ورق استیل عرض 3 cm',
            'ورق استیل عرض 5 و 7 cm',
            'ورق استیل عرض 7 cm',
            'ورق استیل نقره ای آینه ای 0/5 میل',
            'ورق استیل مسی خشدار /06 میل',
            '000167 - ورق استیل دودی خشدار 5 دهم میل کد 304 ابعاد 120*240',
            'ورق دودی آینه ای 1 میل',
            'ورق آهن 1/25 یک و بیست و پنج میل ابعاد 120 * 240 -',
            'ورق استیل مسی 0/6 دهم',
            'ورق استیل مسی 0/6 دهم خشدار',
            'ورق استیل طلایی 0/5 دهم',
            'ورق استیل دودی خشدار 0/6 دهم',
            'ورق آهن 2 دو میل ابعاد 120 * 240',
            'ورق آهن 0.5  میل ابعاد 120 * 240',
            'ورق استیل نقره ای خشدار 0/8 دهم',
            'ورق استیل نقره ای آینه ای  6 دهم میل کد 304 ابعاد 120*240',

        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
    // 13  پی وی سی   13
    {
        caption: "پی وی سی",
        filterTextForPivot: [
            "پی وی سی ده میل"
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },

]


export const calculatePivot = ({
                                   filterTextForPivot,
                                   totalData,
                                   myKey,
                                   sumKey,
                                   countKey,
                                   giveMeTotalSum = false
                               }: any) => {
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
    if (giveMeTotalSum) {
        result = rowsArrayWithSpecificWord.reduce((acc: any, row: any) => {
            return row[countKey] + acc
        }, 0)
    } else {
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

