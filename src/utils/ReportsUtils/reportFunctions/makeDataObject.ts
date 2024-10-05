import {calculateSingleObject} from "./calculatePivotById";
import productsObject from "../Constant/productsObject";

const myKey = "myItemName"
const sumKey = "myTotalAmount"
const countKey = "myQuantity";

const makeDataObject = ({totalData}: any) => {
    const keys = {myKey, sumKey, countKey,}

    const PLAXI_KOLLI = calculateSingleObject(totalData, {
        caption: "پلکسی کلی",
        id: "1",
        bgColor: "black",
        textColor: "white",
        ...keys,
        filterIdForPivot: [
            "000002",
            "000003",
            "000006",
            "000008",
            "000009",
            "000010",
            "000032",
            "000033",
            "000034",
            "000035",
            "000036",
            "000037",
            "000038",
            "000039",
            "000040",
            "000041",
            "000042",
            "000043",
            "000044",
            "000045",
            "000046",
            "000070",
            "000074",
            "000075",
            "000076",
            "000077",
            "000078",
            "000361",
            "000371",
            "000373",
            "000577",
            "000578",
            "000579",
            "000580",
            "000584",
            "000606",
            "000625",
            "000628",
            "000644",

        ]
    });
    const PLAXI_2_8_MILL = calculateSingleObject(totalData, {
        caption: "پلکسی  2.8 میل",
        id: "2",
        ...keys,
        filterIdForPivot: [
            "000002",
            "000003",
            "000006",
            "000008",
            "000009",
            "000010",
            "000032",
            "000033",
            "000034",
            "000035",
            "000036",
            "000037",
            "000038",
            "000039",
            "000040",
            "000041",
            "000042",
            "000043",
            "000044",
            "000045",
            "000046",
            "000074",
            "000075",
            "000076",
            "000077",
            "000078",
            "000361",
            "000371",
            "000577",
            "000578",
            "000579",
            "000580",
            "000584",
            "000606",
            "000625",
            "000628",

        ]
    });
    const PLAXI_duqi_5_Mill = calculateSingleObject(totalData, {
        caption: "دوغی 5 میل",
        id: "3",
        ...keys,
        filterIdForPivot: [
            "000070",
        ]
    })
    const PLAXI_duqi_10_Mill = calculateSingleObject(totalData, {
        caption: "دوغی 10 میل",
        id: "4",
        ...keys,
        filterIdForPivot: [
            "000373",
        ]
    })
    const PVC_10_MILL = calculateSingleObject(totalData, {
        caption: "پی وی سی 10 میل",
        id: "5",
        ...keys,
        filterIdForPivot: [
            "000066",
        ]
    })
    const PUNCH_KOLLI = calculateSingleObject(totalData, {
        caption: "پانچ کلی",
        id: "6",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })
    const PUNCH_SADE = calculateSingleObject(totalData, {
        caption: "پانچ ساده",
        id: "7",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })

    const PUNCH_TARHDAR = calculateSingleObject(totalData, {
        caption: "پانچ طرحدار",
        id: "8",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })
    const VARAQ_ESTIL_KOLLI = calculateSingleObject(totalData, {
        caption: "ورق استیل",
        id: "9",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })
    const VARAQ_ESTIL_TALAII_AYINEI = calculateSingleObject(totalData, {
        caption: "طلایی آیینه ای",
        id: "10",
        ...keys,
        filterIdForPivot: [
            "=",

        ]
    })
    const VARAQ_ESTIL_TALAII_KHASHDAR = calculateSingleObject(totalData, {
        caption: "طلایی خشدار",
        id: "11",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })
    const VARAQ_ESTIL_NOQREI_AYINEI = calculateSingleObject(totalData, {
        caption: "نقره ای آیینه ای",
        id: "12",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })
    const VARAQ_ESTIL_NOQREI_KHASHDAR = calculateSingleObject(totalData, {
        caption: "نقره ای خشدار",
        id: "13",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })

    const VARAQ_ESTIL_MESI_AYINEI = calculateSingleObject(totalData, {
        caption: "مسی آیینه ای",
        id: "14",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })
    const VARAQ_ESTIL_MESI_KHASHDAR = calculateSingleObject(totalData, {
        caption: "مسی خشدار",
        id: "15",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })

    const VARAQ_ESTIL_DOODI_AYINEI = calculateSingleObject(totalData, {
        caption: "دوغی آیینه ای",
        id: "16",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })
    const VARAQ_ESTIL_DOODI_KHASHDAR = calculateSingleObject(totalData, {
        caption: "دوغی خشدار",
        id: "17",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })

    const VARAQ_AHAN_KOLLI = calculateSingleObject(totalData, {
        caption: "ورق آهن کلی",
        id: "18",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })

    const VARAQ_AHAN_1MILL = calculateSingleObject(totalData, {
        caption: "ورق آهن یک میل",
        id: "19",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })

    const VARAQ_AHAN_7MILL = calculateSingleObject(totalData, {
        caption: "ورق آهن هفت میل",
        id: "20",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })

    const NEON_FELAX_KOLLI = calculateSingleObject(totalData, {
        caption: "نئون فلکس کلی",
        id: "21",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })
    const NEON_FELAX_SEFID_YAKHI = calculateSingleObject(totalData, {
        caption: "نئون فلکس سفید یخی",
        id: "22",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })
    const NEON_FELAX_ABI_FIROOZEI_ZIMEMSI = calculateSingleObject(totalData, {
        caption: "نئون فلکس آبی فیروزه ای -زیمنسی",
        id: "23",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })
    const NEON_FELAX_QERMEZ = calculateSingleObject(totalData, {
        caption: "نئون فلکس قرمز",
        id: "24",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })
    const NEON_FELAX_AFTABI = calculateSingleObject(totalData, {
        caption: "نئون فلکس آفتابی",
        id: "25",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })
    const NEON_FELAX_ABI_ASEMANI = calculateSingleObject(totalData, {
        caption: "نئون فلکس آبی آسمانی",
        id: "26",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })
    const NEON_FELAX_BANAFSH = calculateSingleObject(totalData, {
        caption: "نئون فلکس بنفش",
        id: "27",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })
    const NEON_FELAX_ANBEI = calculateSingleObject(totalData, {
        caption: "نئون فلکس انبه ای",
        id: "27",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })
    const NEON_FELAX_LIMOOI = calculateSingleObject(totalData, {
        caption: "نئون فلکس لیمویی",
        id: "28",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })

    const NEON_FELAX_SABZ = calculateSingleObject(totalData, {
        caption: "نئون فلکس سبز",
        id: "29",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })
    const NEON_FELAX_SOORATI = calculateSingleObject(totalData, {
        caption: "نئون فلکس صورتی",
        id: "30",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })
    const NEON_FELAX_KARBONI = calculateSingleObject(totalData, {
        caption: "نئون فلکس کاربنی",
        id: "31",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })

    const NEON_FELAX_NARENGI = calculateSingleObject(totalData, {
        caption: "نئون فلکس نارنجی",
        id: "32",
        ...keys,
        filterIdForPivot: [
            "=",
        ]
    })

    const CHALENIUM_SUEDI_KOLI = calculateSingleObject(totalData, {
        caption: "چلنیوم سوئدی باهم",
        id: "33",
        ...keys,
        filterIdForPivot: [
            "000011",
            "000012",
            "000014",
            "000015",
            "000016",
            "000017\n",
            "000018\n",
            "000019\n",

            "000020\n" ,
            "000364\n",

            "0000000000000",
            "0000000000000",
            "0000000000000",
            "0000000000000",
            "0000000000000",
        ]
    })

    const CHALENIUM_ONLY = calculateSingleObject(totalData, {
        caption: "فقط چلنیوم",
        id: "34",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })

    const CHALENIUM_LABE_NOQREI_7SANT_SADE = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه نقره ای 7 سانت ساده",
        id: "35",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })
    const CHALENIUM_LABE_NOQREI_9SANT_SADE = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه نقره ای 9 سانت ساده",
        id: "36",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })

    const CHALENIUM_LABE_NOQREI_7_SANT_PANCH = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه نقره ای 7 سانت پانچ",
        id: "37",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })
    const CHALENIUM_LABE_NOQREI_9_SANT_PANCH = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه نقره ای 9 سانت پانچ",
        id: "38",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })

    const CHALENIUM_LABE_NOQREI_SUPER_SIDE = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه نقره ای سوپر ساید",
        id: "39",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })

    const CHALENIUM_LABE_NOQREI_SONNATI = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه نقره ای سنتی",
        id: "40",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })


    /////////////////////////////////////////////////////////////////////////

    const CHALENIUM_LABE_TALAII_7SANT_SADE = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه طلایی 7 سانت ساده",
        id: "41",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })
    const CHALENIUM_LABE_TALAII_9SANT_SADE = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه طلایی 9 سانت ساده",
        id: "42",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })

    const CHALENIUM_LABE_TALAII_7_SANT_PANCH = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه طلایی 7 سانت پانچ",
        id: "43",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })
    const CHALENIUM_LABE_TALAII_9_SANT_PANCH = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه طلایی 9 سانت پانچ",
        id: "44",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })

    const CHALENIUM_LABE_TALAII_SUPER_SIDE = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه طلایی سوپر ساید",
        id: "45",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })

    const CHALENIUM_LABE_TALAII_SONNATI = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه طلایی سنتی",
        id: "46",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })

    ///////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////

    const CHALENIUM_LABE_MESHKI_7SANT_SADE = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه مشکی 7 سانت ساده",
        id: "47",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })
    const CHALENIUM_LABE_MESHKI_9SANT_SADE = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه مشکی 9 سانت ساده",
        id: "48",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })

    const CHALENIUM_LABE_MESHKI_7_SANT_PANCH = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه مشکی 7 سانت پانچ",
        id: "49",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })
    const CHALENIUM_LABE_MESHKI_9_SANT_PANCH = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه مشکی 9 سانت پانچ",
        id: "50",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })

    const CHALENIUM_LABE_MESHKI_SUPER_SIDE = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه مشکی سوپر ساید",
        id: "51",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })


    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////

    const CHALENIUM_LABE_SEFID_7SANT_SADE = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه سفید 7 سانت ساده",
        id: "47",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })
    const CHALENIUM_LABE_SEFID_9SANT_SADE = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه سفید 9 سانت ساده",
        id: "48",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })

    const CHALENIUM_LABE_SEFID_7_SANT_PANCH = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه سفید 7 سانت پانچ",
        id: "49",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })
    const CHALENIUM_LABE_SEFID_9_SANT_PANCH = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه سفید 9 سانت پانچ",
        id: "50",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })

    const CHALENIUM_LABE_BANAFSH_9SANT_SADE = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه بنفش 9 سانت ساده",
        id: "51",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })


    ///////////////////////////////////////////////////////

    const SUEDI_KOLLI = calculateSingleObject(totalData, {
        caption: "فقط سوئدی",
        id: "52",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })
    const SUEDI_LABE_NOQREI_5_SANT_BARRAT = calculateSingleObject(totalData, {
        caption: "سوئدی لبه نقره ای 5 سانت براق",
        id: "53",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })
    const SUEDI_LABE_NOQREI_7_SANT_BARRAT = calculateSingleObject(totalData, {
        caption: "سوئدی لبه نقره ای 7 سانت براق",
        id: "54",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })
    const SUEDI_LABE_NOQREI_5_SANT_KHASHDAR = calculateSingleObject(totalData, {
        caption: "سوئدی لبه نقره ای 5 سانت خشدار",
        id: "55",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })
    const SUEDI_LABE_NOQREI_7_SANT_KHASHDAR = calculateSingleObject(totalData, {
        caption: "سوئدی لبه نقره ای 7 سانت خشدار",
        id: "56",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })
    ////////////////////////
    const SUEDI_LABE_TALAII_5_SANT_BARRAT = calculateSingleObject(totalData, {
        caption: "سوئدی لبه طلایی 5 سانت براق",
        id: "57",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })
    const SUEDI_LABE_TALAII_7_SANT_BARRAT = calculateSingleObject(totalData, {
        caption: "سوئدی لبه طلایی 7 سانت براق",
        id: "58",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })
    const SUEDI_LABE_TALAII_5_SANT_KHASHDAR = calculateSingleObject(totalData, {
        caption: "سوئدی لبه طلایی 5 سانت خشدار",
        id: "59",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })
    const SUEDI_LABE_TALAII_7_SANT_KHASHDAR = calculateSingleObject(totalData, {
        caption: "سوئدی لبه طلایی 7 سانت خشدار",
        id: "60",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })
    ////////////////////////////////////////////
    const SUEDI_LABE_MESHKI_5_SANT = calculateSingleObject(totalData, {
        caption: "سوئدی لبه مشکی 5 سانت ",
        id: "61",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })
    const SUEDI_LABE_MESHKI_7_SANT = calculateSingleObject(totalData, {
        caption: "سوئدی لبه مشکی 7 سانت ",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "",
        ]
    })


    const tableView = [
        [
            {
                ...PLAXI_KOLLI,
            },
            {
                ...SUEDI_KOLLI,
            },
            {
                ...CHALENIUM_SUEDI_KOLI,
            },

        ],
        [
            {
                title: "نئون پلاستیک ",
                value: "نداریم",
            }
        ],
        [
            {
               ...NEON_FELAX_KOLLI
            }
        ],
        [
            {
                ...VARAQ_ESTIL_KOLLI
            },
            {
                ...VARAQ_AHAN_KOLLI
            },
            {
                title: "جوش فایبر",
                value: "نداریم",
            },
            {
            title: "جمع کل فلزات ",
            value: "نداریم",
        },
        ],


    ]

    const treeViewData = [
        {

            // title: 'پلکسی کلی',
            // value : "",
            ...PLAXI_KOLLI,
            subItems: [
                {
                    // title: 'پلکسی 2.8 میل',
                    // value: '120',
                    ...PLAXI_2_8_MILL,

                },
                {
                    // title: 'پلکسی دوغی 5 میل',
                    // value: '120',
                    ...PLAXI_duqi_5_Mill

                },
                {
                    // title: 'پلکسی دوغی 10 میل',
                    // value: '120',
                    ...PLAXI_duqi_10_Mill

                },

            ]
        },
        ////////////////////
        {
            // title: 'پی وی سی 10 میل',
            // value: '2000 متر',
            ...PVC_10_MILL,
        },
        /////////
        {
            // title: 'پانچ',
            // value: '2000 متر',
            ...PUNCH_KOLLI,
            subItems: [
                {
                    // title: 'ساده ',
                    // value: '120',
                    ...PUNCH_SADE

                },
                {
                    // title: 'طرحدار',
                    // value: '120',
                    ...PUNCH_TARHDAR

                },
            ]
        },
        /////////
        {
            // title: 'ورق استیل',
            // value: '2000 متر',
            ...VARAQ_ESTIL_KOLLI,
            subItems: [
                {
                    // title: 'طلایی آیینه ای',
                    // value: '120',
                    ...VARAQ_ESTIL_TALAII_AYINEI

                },
                {
                    // title: 'طلایی خشدار',
                    // value: '120',
                    ...VARAQ_ESTIL_TALAII_KHASHDAR

                },
                {
                    // title: 'نقره ای آیینه ای',
                    // value: '120',
                    ...VARAQ_ESTIL_NOQREI_AYINEI

                },
                {
                    // title: 'نقره ای خشدار',
                    // value: '120',
                    ...VARAQ_ESTIL_NOQREI_KHASHDAR


                },
                {
                    // title: 'مسی آیینه ای ',
                    // value: '120',
                    ...VARAQ_ESTIL_MESI_AYINEI


                },
                {
                    // title: 'مسی خشدار',
                    // value: '120',
                    ...VARAQ_ESTIL_MESI_KHASHDAR


                },
                {
                    // title: 'دودی آیینه ای',
                    // value: '120',
                    ...VARAQ_ESTIL_DOODI_AYINEI


                },
                {
                    // title: 'دودی خشدار',
                    // value: '120',
                    ...VARAQ_ESTIL_DOODI_KHASHDAR


                },
            ]
        },
        //////////
        {
            // title: "ورق آهن",
            // value: "120",
            ...VARAQ_AHAN_KOLLI,
            subItems: [
                {
                    // title: 'ورق آهن یک میل',
                    // value: '120',
                    ...VARAQ_AHAN_1MILL,
                },
                {
                    // title: 'ورق آهن هفت میل',
                    // value: '120',
                    ...VARAQ_AHAN_7MILL,
                },
            ]
        },
        ///////
        // ////////
        {
            // title: "نئون فلکس",
            // value: "120",
            ...NEON_FELAX_KOLLI,
            subItems: [
                {
                    // title: 'سفید یخی',
                    // value: '120',
                    ...NEON_FELAX_SEFID_YAKHI

                },
                {
                    // title: 'زیمسی ( آبی فیروزه ای)',
                    // value: '120',
                    ...NEON_FELAX_ABI_FIROOZEI_ZIMEMSI

                },
                {
                    // title: 'قرمز:',
                    // value: '120',
                    ...NEON_FELAX_QERMEZ


                },
                {
                    // title: 'آفتابی',
                    // value: '120',
                    ...NEON_FELAX_AFTABI


                },
                {
                    // title: 'آبی آسمانی',
                    // value: '120',
                    ...NEON_FELAX_ABI_ASEMANI


                },
                {
                    // title: 'بنفش',
                    // value: '120',
                    ...NEON_FELAX_BANAFSH

                },
                {
                    // title: 'انبه ای',
                    // value: '120',
                    ...NEON_FELAX_ANBEI

                },
                {
                    // title: 'لیمویی',
                    // value: '120',
                    ...NEON_FELAX_LIMOOI


                },
                {
                    // title: 'سبز',
                    // value: '120',
                    ...NEON_FELAX_SABZ

                },
                {
                    // title: 'صورتی',
                    // value: '120',
                    ...NEON_FELAX_SOORATI

                },
                {
                    // title: 'کاربنی',
                    // value: '120',
                    ...NEON_FELAX_KARBONI

                },
                {
                    // title: 'نارنجی',
                    // value: '120',
                    ...NEON_FELAX_NARENGI

                },
            ]
        },
        ///////
        // ////////
        {
            // title: "متراژ چلنیوم و سوئدی ",
            // value: "120",
            ...CHALENIUM_SUEDI_KOLI,

            subItems: [
                {
                    // title: 'چلنیوم',
                    // value: '120',
                    ...CHALENIUM_ONLY,
                    subItems: [
                        {
                            // title: "لبه نقره ای 7 سانت ساده",
                            // value: "120",
                            ...CHALENIUM_LABE_NOQREI_7SANT_SADE,
                        },
                        {
                            // title: "لبه نقره ای 9 سانت ساده",
                            // value: "120",
                            ...CHALENIUM_LABE_NOQREI_9SANT_SADE,

                        },
                        {
                            // title: "لبه نقره ای پانج 7 سانت",
                            // value: "120",
                            ...CHALENIUM_LABE_NOQREI_7_SANT_PANCH,


                        },
                        {
                            // title: "لبه نقره ای پانچ 9 سانت",
                            // value: "120",
                            ...CHALENIUM_LABE_NOQREI_9_SANT_PANCH,


                        },
                        {
                            // title: "لبه نقره ای سوپرساید ",
                            // value: "120",
                            ...CHALENIUM_LABE_NOQREI_SUPER_SIDE,


                        },
                        {
                            // title: "لبه نقره ای سنتی",
                            // value: "120",
                            ...CHALENIUM_LABE_NOQREI_SONNATI,


                        },
                        {
                            // title: "لبه طلایی 7 سانت ساده",
                            // value: "120",
                            ...CHALENIUM_LABE_TALAII_7SANT_SADE,


                        },
                        {
                            // title: "لبه طلایی 9 سانت ساده",
                            // value: "120",
                            ...CHALENIUM_LABE_TALAII_9SANT_SADE

                        },
                        {
                            // title: "لبه طلایی پانج 7 سانت",
                            // value: "120",
                            ...CHALENIUM_LABE_TALAII_7_SANT_PANCH

                        },
                        {
                            // title: "لبه طلایی پانچ 9 سانت",
                            // value: "120",
                            ...CHALENIUM_LABE_TALAII_9_SANT_PANCH

                        },
                        {
                            // title: "لبه طلایی سوپرساید ",
                            // value: "120",
                            ...CHALENIUM_LABE_TALAII_SUPER_SIDE

                        },
                        {
                            // title: "لبه طلایی سنتی",
                            // value: "120",
                            ...CHALENIUM_LABE_TALAII_SONNATI

                        },
                        {
                            // title: "لبه مشکی 7 سانت ساده",
                            // value: "120",
                            ...CHALENIUM_LABE_MESHKI_7SANT_SADE,

                        },
                        {
                            // title: "لبه مشکی 9 سانت ساده",
                            // value: "120",
                            ...CHALENIUM_LABE_MESHKI_9SANT_SADE

                        },
                        {
                            // title: "لبه مشکی 7 سانت پانج",
                            // value: "120",
                            ...CHALENIUM_LABE_MESHKI_7_SANT_PANCH,

                        },
                        {
                            // title: "لبه مشکی 9 سانت پانچ",
                            // value: "120",
                            ...CHALENIUM_LABE_MESHKI_9_SANT_PANCH


                        },
                        {
                            // title: "لبه مشکی سوپر ساید",
                            // value: "120",
                            ...CHALENIUM_LABE_MESHKI_SUPER_SIDE

                        },
                        {
                            // title: "لبه سفید 7 سانت ساده",
                            // value: "120",
                            ...CHALENIUM_LABE_SEFID_7SANT_SADE,


                        },
                        {
                            // title: "لبه سفید 9 سانت ساده",
                            // value: "120",
                            ...CHALENIUM_LABE_SEFID_9SANT_SADE,

                        },
                        {
                            // title: "لبه سفید 7 سانت پانچ",
                            // value: "120",
                            ...CHALENIUM_LABE_SEFID_7_SANT_PANCH,


                        },
                        {
                            // title: "لبه سفید 9 سانت پانچ",
                            // value: "120",
                            ...CHALENIUM_LABE_SEFID_9_SANT_PANCH

                        },
                        {
                            // title: "لبه بنفش 9 سانت ساده",
                            // value: "120",
                            ...CHALENIUM_LABE_BANAFSH_9SANT_SADE,


                        },
                    ]
                },
                {
                    // title: 'سوئدی',
                    // value: '120',
                    ...SUEDI_KOLLI,
                    subItems: [
                        {
                            // title: "لبه نقره ای 5 سانت براق",
                            // value: "120",
                            ...SUEDI_LABE_NOQREI_5_SANT_BARRAT,

                        },
                        {
                            // title: "لبه نقره ای 7 سانت براق",
                            // value: "120",
                            ...SUEDI_LABE_NOQREI_7_SANT_BARRAT,


                        },
                        {
                            // title: "لبه نقره ای 5 سانت خشدار",
                            // value: "120",
                            ...SUEDI_LABE_NOQREI_5_SANT_KHASHDAR,


                        },
                        {
                            // title: "لبه نقره ای 7 سانت خشدار",
                            // value: "120",
                            ...SUEDI_LABE_NOQREI_7_SANT_KHASHDAR,


                        },
                        {
                            // title: "لبه طلایی 5 سانت براق",
                            // value: "120",
                            ...SUEDI_LABE_TALAII_5_SANT_BARRAT,


                        },
                        {
                            // title: "لبه طلایی ای 7 سانت براق",
                            // value: "120",
                            ...SUEDI_LABE_TALAII_7_SANT_BARRAT

                        },
                        {
                            // title: "لبه طلایی 5 سانت خشدار",
                            // value: "120",
                            ...SUEDI_LABE_TALAII_5_SANT_KHASHDAR,

                        },
                        {
                            // title: "لبه طلایی ای 7 سانت خشدار",
                            // value: "120",
                            ...SUEDI_LABE_TALAII_7_SANT_KHASHDAR,


                        },
                        {
                            // title: "لبه مشکی 5 سانت",
                            // value: "120",
                            ...SUEDI_LABE_MESHKI_5_SANT,


                        },
                        {
                            // title: "لبه مشکی 7 سانت",
                            // value: "120",
                            ...SUEDI_LABE_MESHKI_7_SANT,


                        },

                    ]
                },

            ]
        }
        ///////

    ]


    return {
        tableView,
        treeViewData,
    }
}

export default makeDataObject