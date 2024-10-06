import {calculateSingleObject} from "./calculatePivotById";
import productsObject from "../Constant/productsObject";

const myKey = "myItemCode"
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
            "000069",
            "000156",
        ]
    })
    const PUNCH_SADE = calculateSingleObject(totalData, {
        caption: "پانچ ساده",
        id: "7",
        ...keys,
        filterIdForPivot: [
            "000069",

        ]
    })

    const PUNCH_TARHDAR = calculateSingleObject(totalData, {
        caption: "پانچ طرحدار",
        id: "8",
        ...keys,
        filterIdForPivot: [
            "000156",
        ]
    })
    const VARAQ_ESTIL_KOLLI = calculateSingleObject(totalData, {
        caption: "ورق استیل",
        id: "9",
        ...keys,
        filterIdForPivot: [
            "000083",
            "000084",
            "000155",
            "000160",
            "000161",
            "000162",
            "000163",
            "000164",
            "000165",
            "000166",
            "000167",
            "000168",
            "000169",
            "000170",
            "000171",
            "000172",

        ]
    })
    const VARAQ_ESTIL_TALAII_AYINEI = calculateSingleObject(totalData, {
        caption: "طلایی آیینه ای",
        id: "10",
        ...keys,
        filterIdForPivot: [
            "000083",
            "000084",


        ]
    })
    const VARAQ_ESTIL_TALAII_KHASHDAR = calculateSingleObject(totalData, {
        caption: "طلایی خشدار",
        id: "11",
        ...keys,
        filterIdForPivot: [
            "000155",
            "000160"

        ]
    })
    const VARAQ_ESTIL_NOQREI_AYINEI = calculateSingleObject(totalData, {
        caption: "نقره ای آیینه ای",
        id: "12",
        ...keys,
        filterIdForPivot: [
            "000161",
            "000162"

        ]
    })
    const VARAQ_ESTIL_NOQREI_KHASHDAR = calculateSingleObject(totalData, {
        caption: "نقره ای خشدار",
        id: "13",
        ...keys,
        filterIdForPivot: [
            "000163",
            "000164"

        ]
    })

    const VARAQ_ESTIL_MESI_AYINEI = calculateSingleObject(totalData, {
        caption: "مسی آیینه ای",
        id: "14",
        ...keys,
        filterIdForPivot: [
            "000169",
            "000170",
        ]
    })
    const VARAQ_ESTIL_MESI_KHASHDAR = calculateSingleObject(totalData, {
        caption: "مسی خشدار",
        id: "15",
        ...keys,
        filterIdForPivot: [
            "000171",
            "000172",
        ]
    })

    const VARAQ_ESTIL_DOODI_AYINEI = calculateSingleObject(totalData, {
        caption: "دودی آیینه ای",
        id: "16",
        ...keys,
        filterIdForPivot: [
            "000165",
            "000166"

        ]
    })
    const VARAQ_ESTIL_DOODI_KHASHDAR = calculateSingleObject(totalData, {
        caption: "دودی خشدار",
        id: "17",
        ...keys,
        filterIdForPivot: [
            "000167",
            "000168",

        ]
    })

    const VARAQ_AHAN_KOLLI = calculateSingleObject(totalData, {
        caption: "ورق آهن کلی",
        id: "18",
        ...keys,
        filterIdForPivot: [
            "000001",
            "000250",
            "000394",
            "000432",
            "000453",
            "000471",
            "000557",
        ]
    })

    const VARAQ_AHAN_1MILL = calculateSingleObject(totalData, {
        caption: "ورق آهن یک میل",
        id: "19",
        ...keys,
        filterIdForPivot: [
            "000001",
        ]
    })

    const VARAQ_AHAN_1_5_MILL = calculateSingleObject(totalData, {
        caption: "ورق آهن 1.5 میل",
        id: "20",
        ...keys,
        filterIdForPivot: [
            "000250",
        ]
    })
    const VARAQ_AHAN_0_8_MILL = calculateSingleObject(totalData, {
        caption: "ورق آهن 0.8 میل",
        id: "20",
        ...keys,
        filterIdForPivot: [
            "000394",
        ]
    })
    const VARAQ_AHAN_1_25_MILL = calculateSingleObject(totalData, {
        caption: "ورق آهن 1.25 میل",
        id: "20",
        ...keys,
        filterIdForPivot: [
            "000432",
        ]
    })
    const VARAQ_AHAN_1_25_MILL__BOLAND = calculateSingleObject(totalData, {
        caption: "ورق آهن 1.25 میل بلند",
        id: "20",
        ...keys,
        filterIdForPivot: [
            "000453",
        ]
    })
    const VARAQ_AHAN_2_MILL = calculateSingleObject(totalData, {
        caption: "ورق آهن 2 میل",
        id: "20",
        ...keys,
        filterIdForPivot: [
            "000471",
        ]
    })
    const VARAQ_AHAN_0_5_MILL = calculateSingleObject(totalData, {
        caption: "ورق آهن 0.5 میل",
        id: "20",
        ...keys,
        filterIdForPivot: [
            "000557",
        ]
    })

    const NEON_FELAX_KOLLI = calculateSingleObject(totalData, {
        caption: "نئون فلکس کلی",
        id: "21",
        ...keys,
        filterIdForPivot: [
            "000479",
            "000480",
            "000481",
            "000482",
            "000483",
            "000484",
            "000485",
            "000486",
            "000487",
            "000488",
            "000489",
            "000490",
            "000491",
            "000492",
        ]
    })
    const NEON_FELAX_SEFID_YAKHI = calculateSingleObject(totalData, {
        caption: "نئون فلکس سفید یخی",
        id: "22",
        ...keys,
        filterIdForPivot: [
            "000479",
        ]
    })
    const NEON_FELAX_ABI_FIROOZEI_ZIMEMSI = calculateSingleObject(totalData, {
        caption: "نئون فلکس آبی فیروزه ای یا آسمانی",
        id: "23",
        ...keys,
        filterIdForPivot: [
            "000485",
        ]
    })
    const NEON_FELAX_QERMEZ = calculateSingleObject(totalData, {
        caption: "نئون فلکس قرمز",
        id: "24",
        ...keys,
        filterIdForPivot: [
            "000481",
        ]
    })
    const NEON_FELAX_AFTABI = calculateSingleObject(totalData, {
        caption: "نئون فلکس آفتابی",
        id: "25",
        ...keys,
        filterIdForPivot: [
            "000480",
        ]
    })

    const NEON_FELAX_BANAFSH = calculateSingleObject(totalData, {
        caption: "نئون فلکس بنفش",
        id: "27",
        ...keys,
        filterIdForPivot: [
            "000490",
        ]
    })
    const NEON_FELAX_ANBEI = calculateSingleObject(totalData, {
        caption: "نئون فلکس انبه ای",
        id: "27",
        ...keys,
        filterIdForPivot: [
            "000483",
        ]
    })
    const NEON_FELAX_LIMOOI = calculateSingleObject(totalData, {
        caption: "نئون فلکس لیمویی",
        id: "28",
        ...keys,
        filterIdForPivot: [
            "000484",
        ]
    })

    const NEON_FELAX_SABZ_ZIMENSI = calculateSingleObject(totalData, {
        caption: "نئون فلکس سبز زیمنسی",
        id: "29",
        ...keys,
        filterIdForPivot: [
            "000487",
        ]
    })
    const NEON_FELAX_SABZ_CHAMANI = calculateSingleObject(totalData, {
        caption: "نئون فلکس سبز چمنی",
        id: "29",
        ...keys,
        filterIdForPivot: [
            "000488",
        ]
    })
    const NEON_FELAX_SOORATI = calculateSingleObject(totalData, {
        caption: "نئون فلکس صورتی",
        id: "30",
        ...keys,
        filterIdForPivot: [
            "000482",
        ]
    })
    const NEON_FELAX_KARBONI = calculateSingleObject(totalData, {
        caption: "نئون فلکس کاربنی",
        id: "31",
        ...keys,
        filterIdForPivot: [
            "000486",
        ]
    })

    const NEON_FELAX_NARENGI = calculateSingleObject(totalData, {
        caption: "نئون فلکس نارنجی",
        id: "32",
        ...keys,
        filterIdForPivot: [
            "000489",
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
            "000017",
            "000018",
            "000019",
            "000020",
            "000021",
            "000022",
            "000023",
            "000024",
            "000025",
            "000026",
            "000027",
            "000028",
            "000029",
            "000030",
            "000031",
            "000129",
            "000130",
            "000364",
            "000370",
            "000387",
            "000458",
            "000619",
            "000621",
            //// فقط سوئدی ها
            "000118",
            "000119",
            "000120",
            "000121",
            "000133",
            "000134",
            "000135",
            "000136",
            "000372",
            "000376",
            "000382",


        ],
        bgColor:"#989898",
        textColor:"black",
    })

    const CHALENIUM_ONLY = calculateSingleObject(totalData, {
        caption: "فقط چلنیوم",
        id: "34",
        ...keys,
        filterIdForPivot: [
            "000011",
            "000012",
            "000014",
            "000015",
            "000016",
            "000017",
            "000018",
            "000019",
            "000020",
            "000021",
            "000022",
            "000023",
            "000024",
            "000025",
            "000026",
            "000027",
            "000028",
            "000029",
            "000030",
            "000031",
            "000129",
            "000130",
            "000364",
            "000370",
            "000387",
            "000458",
            "000619",
            "000621",


        ]
    })

    const CHALENIUM_LABE_NOQREI_7SANT_SADE = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه نقره ای 7 سانت ساده",
        id: "35",
        ...keys,
        filterIdForPivot: [
            "000011",
        ]
    })
    const CHALENIUM_LABE_NOQREI_9SANT_SADE = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه نقره ای 9 سانت ساده",
        id: "36",
        ...keys,
        filterIdForPivot: [
            "000020",
        ]
    })

    const CHALENIUM_LABE_NOQREI_7_SANT_PANCH = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه نقره ای 7 سانت پانچ",
        id: "37",
        ...keys,
        filterIdForPivot: [
            "000012",
        ]
    })
    const CHALENIUM_LABE_NOQREI_9_SANT_PANCH = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه نقره ای 9 سانت پانچ",
        id: "38",
        ...keys,
        filterIdForPivot: [
            "000021",
        ]
    })

    const CHALENIUM_LABE_NOQREI_SUPER_SIDE = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه نقره ای سوپر ساید",
        id: "39",
        ...keys,
        filterIdForPivot: [
            "000019",
        ]
    })

    const CHALENIUM_LABE_NOQREI_SONNATI = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه نقره ای سنتی",
        id: "40",
        ...keys,
        filterIdForPivot: [
            "000022",
        ]
    })
    const CHALENIUM_NOQREI_7_SANT_0_4 = calculateSingleObject(totalData, {
        caption: "چلنیوم نقره ای چهاردهم 7سانت",
        id: "46",
        ...keys,
        filterIdForPivot: [
            "000129",
        ]
    })
    const CHALENIUM_NOQREI_9_SANT_0_4 = calculateSingleObject(totalData, {
        caption: "چلنیوم نقره ای چهاردهم 9سانت",
        id: "46",
        ...keys,
        filterIdForPivot: [
            "000130",
            "000364"
        ]
    })


    /////////////////////////////////////////////////////////////////////////

    const CHALENIUM_LABE_TALAII_7SANT_SADE = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه طلایی 7 سانت ساده",
        id: "41",
        ...keys,
        filterIdForPivot: [
            "000025",
        ]
    })
    const CHALENIUM_LABE_TALAII_9SANT_SADE = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه طلایی 9 سانت ساده",
        id: "42",
        ...keys,
        filterIdForPivot: [
            "000024",
        ]
    })

    const CHALENIUM_LABE_TALAII_7_SANT_PANCH = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه طلایی 7 سانت پانچ",
        id: "43",
        ...keys,
        filterIdForPivot: [
            "000027",
        ]
    })
    const CHALENIUM_LABE_TALAII_9_SANT_PANCH = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه طلایی 9 سانت پانچ",
        id: "44",
        ...keys,
        filterIdForPivot: [
            "000026",
        ]
    })

    const CHALENIUM_LABE_TALAII_SUPER_SIDE = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه طلایی سوپر ساید",
        id: "45",
        ...keys,
        filterIdForPivot: [
            "000023",
        ]
    })

    const CHALENIUM_LABE_TALAII_SONNATI = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه طلایی سنتی",
        id: "46",
        ...keys,
        filterIdForPivot: [
            "000028",
        ]
    })


    ///////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////

    const CHALENIUM_LABE_MESHKI_7SANT_SADE = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه مشکی 7 سانت ساده",
        id: "47",
        ...keys,
        filterIdForPivot: [
            "000016",
        ]
    })
    const CHALENIUM_LABE_MESHKI_9SANT_SADE = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه مشکی 9 سانت ساده",
        id: "48",
        ...keys,
        filterIdForPivot: [
            "000015",
        ]
    })

    const CHALENIUM_LABE_MESHKI_7_SANT_PANCH = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه مشکی 7 سانت پانچ",
        id: "49",
        ...keys,
        filterIdForPivot: [
            "000018",
        ]
    })
    const CHALENIUM_LABE_MESHKI_9_SANT_PANCH = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه مشکی 9 سانت پانچ",
        id: "50",
        ...keys,
        filterIdForPivot: [
            "000017",
        ]
    })

    const CHALENIUM_LABE_MESHKI_SUPER_SIDE = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه مشکی سوپر ساید",
        id: "51",
        ...keys,
        filterIdForPivot: [
            "000014",
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
            "000030",
        ]
    })
    const CHALENIUM_LABE_SEFID_9SANT_SADE = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه سفید 9 سانت ساده",
        id: "48",
        ...keys,
        filterIdForPivot: [
            "000029",
        ]
    })

    const CHALENIUM_LABE_SEFID_7_SANT_PANCH = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه سفید 7 سانت پانچ",
        id: "49",
        ...keys,
        filterIdForPivot: [
            "000387",
        ]
    })
    const CHALENIUM_LABE_SEFID_9_SANT_PANCH = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه سفید 9 سانت پانچ",
        id: "50",
        ...keys,
        filterIdForPivot: [
            "000031",
        ]
    })

    const CHALENIUM_LABE_BANAFSH_9SANT_SADE = calculateSingleObject(totalData, {
        caption: "چلنیوم لبه بنفش 9 سانت ساده",
        id: "51",
        ...keys,
        filterIdForPivot: [
            "000458",
        ]
    })
    const CHALENIUM_QERMEZ_7_SANT_SADE = calculateSingleObject(totalData, {
        caption: "چلنیوم قرمز 7 سانت ساده ",
        id: "46",
        ...keys,
        filterIdForPivot: [
            "000621",
        ]
    })
    const CHALENIUM_QERMEZ_9_SANT_SADE = calculateSingleObject(totalData, {
        caption: "چلنیوم قرمز 9 سانت ساده ",
        id: "46",
        ...keys,
        filterIdForPivot: [
            "000619",
        ]
    })


    ///////////////////////////////////////////////////////

    const SUEDI_KOLLI = calculateSingleObject(totalData, {
        caption: "فقط سوئدی",
        id: "52",
        ...keys,
        filterIdForPivot: [
            "000118",
            "000119",
            "000120",
            "000121",
            "000133",
            "000134",
            "000135",
            "000136",
            "000372",
            "000376",
            "000382",
        ]
    })
    const SUEDI_LABE_NOQREI_5_SANT_BARRAT = calculateSingleObject(totalData, {
        caption: "سوئدی لبه نقره ای 5 سانت آیینه ای",
        id: "53",
        ...keys,
        filterIdForPivot: [
            "000576",
        ]
    })
    const SUEDI_LABE_NOQREI_7_SANT_BARRAT = calculateSingleObject(totalData, {
        caption: "سوئدی لبه نقره ای 7 سانت آیینه ای",
        id: "54",
        ...keys,
        filterIdForPivot: [
            "000372",
        ]
    })
    const SUEDI_LABE_NOQREI_5_SANT_KHASHDAR = calculateSingleObject(totalData, {
        caption: "سوئدی لبه نقره ای 5 سانت خشدار",
        id: "55",
        ...keys,
        filterIdForPivot: [
            "000133",
        ]
    })
    const SUEDI_LABE_NOQREI_7_SANT_KHASHDAR = calculateSingleObject(totalData, {
        caption: "سوئدی لبه نقره ای 7 سانت خشدار",
        id: "56",
        ...keys,
        filterIdForPivot: [
            "000134",
        ]
    })
    ////////////////////////
    // const SUEDI_LABE_TALAII_5_SANT_BARRAT = calculateSingleObject(totalData, {
    //     caption: "سوئدی لبه طلایی 5 سانت آیینه ای - تو حسابفا نیست",
    //     id: "57",
    //     ...keys,
    //     filterIdForPivot: [
    //         "فعلا نداریم موجود هم نمیشه",
    //     ]
    // })
    const SUEDI_LABE_TALAII_7_SANT_BARRAT = calculateSingleObject(totalData, {
        caption: "سوئدی لبه طلایی 7 سانت آیینه ای",
        id: "58",
        ...keys,
        filterIdForPivot: [
            "000382",
        ]
    })
    const SUEDI_LABE_TALAII_5_SANT_KHASHDAR = calculateSingleObject(totalData, {
        caption: "سوئدی لبه طلایی 5 سانت خشدار",
        id: "59",
        ...keys,
        filterIdForPivot: [
            "000120",
        ]
    })
    const SUEDI_LABE_TALAII_7_SANT_KHASHDAR = calculateSingleObject(totalData, {
        caption: "سوئدی لبه طلایی 7 سانت خشدار",
        id: "60",
        ...keys,
        filterIdForPivot: [
            "000121",
        ]
    })
    ////////////////////////////////////////////
    const SUEDI_LABE_MESHKI_5_SANT = calculateSingleObject(totalData, {
        caption: "سوئدی لبه مشکی 5 سانت ",
        id: "61",
        ...keys,
        filterIdForPivot: [
            "000118",
        ]
    })
    const SUEDI_LABE_MESHKI_7_SANT = calculateSingleObject(totalData, {
        caption: "سوئدی لبه مشکی 7 سانت ",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000119",
        ]
    })


    const SUEDI_LABE_SEFID_5_SANT = calculateSingleObject(totalData, {
        caption: "سوئدی لبه سفید 5 سانت ",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000135",
        ]
    })
    const SUEDI_LABE_SEFID_7_SANT = calculateSingleObject(totalData, {
        caption: "سوئدی لبه سفید 7 سانت ",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000136",
        ]
    })
    const SUEDI_LABE_MAX = calculateSingleObject(totalData, {
        caption: "سوئدی لبه مکس ",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000376",
        ]
    })



    const NEON_PLASTIC = calculateSingleObject(totalData, {
        caption: "نئون پلاستیک",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000105",
            "000106",
            "000107",
            "000108",
            "000109",
            "000110",
            "000111",
            "000112",
            "000113",
            "000114",
            "000115",

        ]
    })

    const JOOSH_FIBER = calculateSingleObject(totalData, {
        caption: "جوش فایبر",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000381" ,
            "000435",
        ]
    })

    const SUM_FELEZAT = calculateSingleObject(totalData, {
        caption: "جمع فلزات",
        id: "62",
        ...keys,
        bgColor:"#989898",
        textColor:"black",
        filterIdForPivot: [
            // VARAQ_ESTIL_KOLLI.filterIdForPivot
            "000083",
            "000084",
            "000155",
            "000160",
            "000161",
            "000162",
            "000163",
            "000164",
            "000165",
            "000166",
            "000167",
            "000168",
            "000169",
            "000170",
            "000171",
            "000172",
            // VARAQ_AHAN_KOLLI
            "000001",
            "000250",
            "000394",
            "000432",
            "000453",
            "000471",
            "000557",
        //




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
                ...CHALENIUM_ONLY,
            },
            {
                ...CHALENIUM_SUEDI_KOLI,
            },

        ],
        [
            {
                // title: "نئون پلاستیک ",
                // value: "نداریم",
                ...NEON_PLASTIC
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
                ...JOOSH_FIBER
            },
            {
               ...SUM_FELEZAT
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
                    ...VARAQ_AHAN_1_5_MILL,
                },
                {
                    // title: 'ورق آهن 0.8 میل',
                    // value: '120',
                    ...VARAQ_AHAN_0_8_MILL,
                },
                {
                    // title: 'ورق آهن 1.25 میل',
                    // value: '120',
                    ...VARAQ_AHAN_1_25_MILL,
                },
                {
                    // title: 'ورق آهن 1.25 میل دراز و بلند',
                    // value: '120',
                    ...VARAQ_AHAN_1_25_MILL__BOLAND,
                },
                {
                    // title: 'ورق آهن 2 میل',
                    // value: '120',
                    ...VARAQ_AHAN_2_MILL,
                },
                {
                    // title: 'ورق آهن نیم میل',
                    // value: '120',
                    ...VARAQ_AHAN_0_5_MILL,
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
                    // title: 'آبی فیروزه ای زیمنسی',
                    // value: '120',
                    ...NEON_FELAX_ABI_FIROOZEI_ZIMEMSI


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
                    ...NEON_FELAX_SABZ_ZIMENSI

                },
                {
                    // title: 'سبز',
                    // value: '120',
                    ...NEON_FELAX_SABZ_CHAMANI

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

                            ...CHALENIUM_LABE_NOQREI_SONNATI,


                        }, {

                            ...CHALENIUM_NOQREI_7_SANT_0_4,


                        }, {

                            ...CHALENIUM_NOQREI_9_SANT_0_4,


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
                            ...CHALENIUM_LABE_SEFID_7_SANT_PANCH,
                        },
                        {
                            ...CHALENIUM_LABE_SEFID_9_SANT_PANCH
                        },
                        {
                            ...CHALENIUM_LABE_BANAFSH_9SANT_SADE,

                        }, {
                            ...CHALENIUM_QERMEZ_7_SANT_SADE,


                        }, {
                            ...CHALENIUM_QERMEZ_9_SANT_SADE,
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
                        {...SUEDI_LABE_SEFID_5_SANT},
                        {...SUEDI_LABE_SEFID_7_SANT},
                        {...SUEDI_LABE_MAX},


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