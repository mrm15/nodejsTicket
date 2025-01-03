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

// اینجا من خودم به صورت دستی  آیدی اضافه میکنم که بهدا لازم دارم/
// در حال حاضر دارم توی بخش  نمایش گزارش مدیرتی نشون میدم و میخوام جدا جدا جمع کنم و نشون بدم واسه همین  دارم اینجا آیدی اضافه میکنم
export const reportArray = [
    //0
    {
        caption: "پلکسی 2.8",
        id:0,
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
        id:1,
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
        id:2,
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
        id:3,
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
        id:4,
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
        id:5,
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
        id:6,
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
        id: 7,
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
        id: 8,
        filterTextForPivot: [
            "اجرت ساخت نئون پلاستیک",
            // "اجرت ساخت نئون پلاستیک ( حروف استاندارد ) لبه ۳ تا ۸ سانت",
            // "اجرت ساخت نئون پلاستیک ( حروف سخت) لبه ۳ تا ۸ سانت",
            // "اجرت ساخت نئون پلاستیک ( حروف استاندارد ) لبه 3 تا 8 سانت",
            // "اجرت ساخت نئون پلاستیک ( حروف سخت) لبه 3 تا 8 سانت",
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
    //9
    {
        caption: "نئون فلکسی",
        id: 9,
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
        id: 10,
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
        id: 11,
        filterTextForPivot: [
            "استیکر آبی کاربنی همراه با اجرت  نصب روی پلکسی",
            "استیکر مشکی همراه با اجرت نصب روی پلکسی",
            "استیکر قرمز با اجرت نصب روی پلکسی",
            "استیکر سبز همراه با اجرت  نصب روی پلکسی",

        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
    // 12 ورق 12
    {
        caption: "ورق استیل",
        id: 12,
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
            'ورق آهن 1/25 یک و بیست و پنج میل ابعاد 120 * 240',
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
        id: 13,
        filterTextForPivot: [
            "پی وی سی ده میل"
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
    // 14
    {
        caption: "ورق پلکسی",
        id: 14,
        filterTextForPivot: [
            "پلکسی قرمز  2.8 میل کد 136",
            "پلکسی آبی کاربنی 2.8 میل کد 327",
            "پلکسی سفید 2.8 میل کد 433",
            "پلکسی مشکی 2.8 میل کد 502",
            "پلکسی صورتی 2.8 میل کد 100",
            "پلکسی زرد لیمویی 2.8 میل کد 235",
            "پلکسی سبز 2.8 میل کد 617",
            "پلکسی آبی 2.8 میل کد 322",
            "پلکسی مشکی مات 2.8 میل تایوان  کد 502 m1",
            "پلکسی سبز 2.8 میل کد 348",
            "پلکسی سبز 2.8 میل کد 184",
            "پلکسی نارنجی 2.8 میل کد 266",
            "پلکسی بنفش 2.8 میل کد 377",
            "پلکسی کرم 2.8 میل کد 802",
            "پلکسی آبی آسمانی 2.8 میل کد 835",
            "پلکسی زیمنسی 2.8 میل کد 844",
            "پلکسی شیشه ای شفاف 2.8 میل کد 0",
            "پلکسی طوسی 2.8 میل کد 500",
            "پلکسی قهوه ای 2.8 میل کد 814",
            "پلکسی قرمز شیشه ای 2.8 میل کد 102",
            "پلکسی زرد شیشه ای 2.8 میل کد 212",
            "پلکسی دوغی 5میل",
            "پلکسی پیلاری 2.8 میل کد245",
            "پلکسی پیلاری 2.8 میل کد 238",
            "پلکسی آگاما مشکی 3 میل تایوان کد 9t19",
            "پلکسی طلایی آینه ای",
            "پلکسی دودی 2.8 میل کد 830",
            "پلکسی پرتقالی شیشه ای 2.8 میل",
            "پلکسی سبز 2.8 میل کد 347",
            "پلکسی دوغی 10 میل",
            "پلکسی زرد پیلاری 2.5 میل",
            "پلکسی قرمز  2.5میل کد 136",
            "پلکسی نارنجی 2.5میل کد 266",
            "پلکسی دوغی 2.8 میل",
            "پلکسی مشکی 2.5 میل",
            "پلکسی آبی کاربنی 2.5 میل کد 327",
            "پلکسی شیشه ای شفاف 2.5 میل کد 0",
            "پلکسی سبز 2.5 میل کد 617",
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
    // 15 only Chalenium
    {
        caption: " فقط چلنیوم ",
        id: 15,
        filterTextForPivot: [
            "اجرت ساخت چلنیوم",
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
    // 16  only S o e d i
    {
        caption: " فقط سوئدی",
        id: 16,
        filterTextForPivot: [
            "اجرت ساخت حروف سوئدی",
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
///////////////////////////////////////////////////////////
// از اینجا ب بعد رو باید آیتم ها رو بزرام
///////////////////////////////////////////////////////////
    // 17 faqat estil
    {
        caption: " فقط استیل- working",
        id: 17,
        filterTextForPivot: [
            "استیل",
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
    // 18 faqat ahan
    {
        caption: " فقط آهنworking ",
        id: 18,
        filterTextForPivot: [
            "آهن",
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
    // 19 faqat josh Fiber
    {
        caption: "جوش فایبر working ",
        id: 19,
        filterTextForPivot: [
            "فایبر",
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
    // 20 faqat josh Fiber
    {
        caption: "جمع فلزات working ",
        id: 20,
        filterTextForPivot: [
            "فایبر",
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },

    // 21 جمع همه آیتم ها
    {
        caption: "متراژ ساخت کلی روز working ",
        id: 21,
        filterTextForPivot: [
            "فایبر",
        ],
        myKey: "myItemName",
        sumKey: "myTotalAmount",
        countKey: "myQuantity",
    },
    // 22
    {
        caption: "اجرت برش پی وی سی - سی ان سی",
        id: 21,
        filterTextForPivot: [
            "اجرت برش پی وی سی - سی ان سی",
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

