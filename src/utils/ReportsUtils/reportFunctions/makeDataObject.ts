import {calculateSingleObject} from "./calculatePivotById";
import sortInnerRecursive from "../../sortInnerRecursive";
import {anbarExport} from "./anbarExport";

const myKey = "myItemCode"
const sumKey = "myTotalAmount"
const countKey = "myQuantity";
export const keys = {myKey, sumKey, countKey,}

const makeDataObject = ({totalData}: any) => {

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
        bgColor: "#989898",
        textColor: "black",
    })

    const CHALENIUM_ONLY = calculateSingleObject(totalData, {
        caption: "فقط چلنیوم",
        id: "34",
        ...keys,
        filterIdForPivot: [
            "000011", // چلنیوم نقره ای ۷ سانت ساده
            "000012", //	چلنیوم نقره ای ۷ سانت پانچ
            "000014", // چلنیوم مشکی سوپر ساید
            "000015", // چلنیوم مشکی ۹ سانت ساده
            "000016", // چلنیوم مشکی ۷ سانت ساده
            "000017", // چلنیوم مشکی ۹ سانت پانچ
            "000018", // چلنیوم مشکی ۷ سانت پانچ
            "000019", // چلنیوم نقره ای سوپر ساید
            "000020",//چلنیوم نقره ای ۹سانت ساده
            "000021",// چلنیوم نقره ای ۹ سانت پانچ
            "000022", // چلنیوم نقره ای سنتی
            "000023", // چلنیوم طلایی سوپر ساید
            "000024", // چلنیوم طلایی ۹سانت ساده
            "000025", // چلنیوم طلایی ۷سانت ساده
            "000026", // لنیوم طلایی ۹ سانت پانچ
            "000027", // چلنیوم طلایی ۷ سانت پانچ
            "000028",// چلنیوم طلایی سنتی
            "000029",// چلنیوم سفید ۹ سانت ساده
            "000030",// چلنیوم سفید ۷سانت ساده
            "000031", // چلنیوم سفید ۹ سانت پانچ
            "000129", // چلنیوم نقره ای چهاردهم ۷سانت
            "000130", // چلنیوم نقره ای چهاردهم ۹ سانت
            "000364", // چلنیوم نقره ای ۹سانت ساده چهاردهم
            "000370", // چلنیوم سفید۷ سانت پانچ
            "000387",// لبه چلنیوم سفید پانچ ۷ سانت
            "000458", // چلنیوم ۹ سانت ساده بنفش
            "000619", // چلنیوم قرمز ۹ سانت ساده
            "000621", // چلنیوم قرمز ۷ سانت ساده]
            "000832", // چلنیوم سفید سنتی



        ]
    })
    const CHALENIUM_ONLY_OJRAT = calculateSingleObject(totalData, {
        caption: "جمع اجرت چلنیوم",
        id: "34",
        ...keys,
        textColor:"gray",
        filterIdForPivot: [
            "000068",
            "000251",

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
            // "000081",
            // "000146",
            // "000365",

            // "000118",
            // "000119",
            // "000120",
            // "000121",
            // "000133",
            // "000134",
            // "000135",
            // "000136",
            // "000372",
            // "000376",
            // "000382",
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
            "000437",
            "000576",

        ]
    })
    const SUEDI_KOLLI_OJRAT = calculateSingleObject(totalData, {
        caption: "جمع اجرت سوئدی",
        id: "52",
        ...keys,
        bgColor: "white",
        textColor: "gray",
        filterIdForPivot: [
            "000081",
            "000146",
            "000365",
        ],

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
        caption: "نئون پلاستیک (لبه)",
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
            "000147",
            "000699",
            "000700",
            "000701",
            "000702",
            "000703",
            "000704",
            "000705",
            "000706",
            "000707",
            "000708",
            "000709",
            "000710",
            "000711",
            "000712",
            "000713",
            "000714",
            "000715",
            "000716",
            "000717",
            "000718",
            "000719",
            "000720",
            "000721",
            "000722",
            "000723",
            "000724",
            "000725",
            "000726",
            "000727",
            "000728",
            "000729",
            "000730",
            "000731",
            "000732",
            "000733",
            "000734",
            "000735",
            "000736",
            "000737",
            "000738",
            "000739",
            "000740",
            "000741",
            "000742",
            "000743",
            "000744",
            "000745",
            "000746",
            "000747",
            "000748",
            "000749",
            "000750",
            "000751",
            "000752",
            "000753",
            "000757",
            "000758",
            "000759",
            "000760",
            "000763",
            "000764",
            "000765",
            "000767",
            "000768",
            "000769",
            "000774",
            "000775",
            "000777",
            "000783",
            "000785",
            "000786",
            "000788",
            "000789",
            "000795",
            "000796",
            "000802",
            "000829",
            "000851",
            "000855",
            "000856",
            "000858",
            "000859",
            "000860",
            "000862",
            "000866",
            "000873",
            "000874",
            "000880",

            //////////////////////////


        ]
    })
    const NEON_PLASTIC_OJRAT = calculateSingleObject(totalData, {
        caption: "اجرت نئون پلاستیک (لبه)",
        id: "62",
        ...keys,
        textColor:"gray",
        filterIdForPivot: [
            "000158",
            "000159",
            "000801",

            //////////////////////////


        ]
    })

    const LABEH_PLASTIC_2 = calculateSingleObject(totalData, {
        caption: "لبه پلاستیک 2 سانت",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000105",
        ]
    })

    const LABEH_PLASTIC_3 = calculateSingleObject(totalData, {
        caption: "لبه پلاستیک 3 سانت",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000699",
            "000700",
            "000701",
            "000702",
            "000703",
            "000704",
            "000705",
            "000706",
            "000707",
            "000708",
            "000709",
            "000758",




        ]
    })

    const LABEH_PLASTIC_4 = calculateSingleObject(totalData, {
        caption: "لبه پلاستیک 4 سانت",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000107",
        ]
    })

    const LABEH_PLASTIC_5 = calculateSingleObject(totalData, {
        caption: "لبه پلاستیک 5 سانت",
        id: "62",
        ...keys,
        filterIdForPivot: [
            // "000108",
            "000710",
            "000711",
            "000712",
            "000713",
            "000714",
            "000715",
            "000716",
            "000717",
            "000718",
            "000719",
            "000720",

        ]
    })

    const LABEH_PLASTIC_6 = calculateSingleObject(totalData, {
        caption: "لبه پلاستیک 6 سانت",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000109",
        ]
    })

    const LABEH_PLASTIC_7 = calculateSingleObject(totalData, {
        caption: "لبه پلاستیک 7 سانت",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000721",
            "000722",
            "000723",
            "000724",
            "000725",
            "000726",
            "000727",
            "000728",
            "000729",
            "000730",
            "000731",
            "000757",
            "000759",


        ]
    })

    const LABEH_PLASTIC_8 = calculateSingleObject(totalData, {
        caption: "لبه پلاستیک 8 سانت",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000732",
            "000733",
            "000734",
            "000735",
            "000736",
            "000737",
            "000738",
            "000739",
            "000740",
            "000741",
            "000742",
            ////////////////
            "000760",

        ]
    })

    const LABEH_PLASTIC_9 = calculateSingleObject(totalData, {
        caption: "لبه پلاستیک 9 سانت",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000112",
        ]
    })

    const LABEH_PLASTIC_10 = calculateSingleObject(totalData, {
        caption: "لبه پلاستیک 10 سانت",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000743",
            "000744",
            "000745",
            "000746",
            "000747",
            "000748",
            "000749",
            "000750",
            "000751",
            "000752",
            "000753",

        ]
    })

    const LABEH_PLASTIC_11 = calculateSingleObject(totalData, {
        caption: "لبه پلاستیک 11 سانت",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000114",
        ]
    })

    const LABEH_PLASTIC_12 = calculateSingleObject(totalData, {
        caption: "لبه پلاستیک 12 سانت",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000115",
        ]
    })
    const LABEH_PLASTIC_17 = calculateSingleObject(totalData, {
        caption: "لبه پلاستیک 17 سانت",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000763",
        ]
    })


    const JOOSH_FIBER = calculateSingleObject(totalData, {
        caption: "جوش فایبر",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000381",
            "000435",
        ]
    })
    const ELEMAN_SHAHRI_OJRAT = calculateSingleObject(totalData, {
        caption: "المان شهری",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000811",
        ]
    })


    const SUM_OJRAT_SAKHT_ESTIL_LABE = calculateSingleObject(totalData, {
        caption: "متراژ لبه استیل",
        id: "62",
        ...keys,
        // bgColor:"#989898",
        // textColor:"black",
        filterIdForPivot: [
            "000087",
            "000088",
            "000090",
            "000091",
            "000173",
            "000174",
            "000175",
            "000176",
            "000177",
            "000178",
            "000179",
            "000180",
            "000181",
            "000182",
            "000183",
            "000184",
            "000185",
            "000186",
            "000187",
            "000188",
            "000189",
            "000190",
            "000191",
            "000192",
            "000193",
            "000194",
            "000195",
            "000196",
            "000197",
            "000198",
            "000199",
            "000200",
            "000201",
            "000202",
            "000203",
            "000204",
            "000205",
            "000206",
            "000207",
            "000208",
            "000209",
            "000210",
            "000211",
            "000212",
            "000213",
            "000214",
            "000215",
            "000216",
            "000217",
            "000218",
            "000219",
            "000220",
            "000221",
            "000222",
            "000223",
            "000224",
            "000225",
            "000226",
            "000227",
            "000228",
            "000229",
            "000230",
            "000362",
            "000367",
            "000434",
            "000462",
            "000630",
            "000632",
            "000633",
            "000634",
            "000635",
            "000636",
            "000637",
            "000638",
            "000642",
            "000643",
            "000770",
            "000779",
            "000834",
            "000852",
        ]
    })
    const SUM_OJRAT_SAKHT_ESTIL = calculateSingleObject(totalData, {
        caption: "اجرت لبه استیل",
        id: "62",
        ...keys,
        // bgColor:"#989898",
        textColor:"gray",
        filterIdForPivot: [
            "000080",
            "00235",
        ]
    })
    const SUM_OJRAT_SAKHT_AHAN_LABE = calculateSingleObject(totalData, {
        caption: "متراژ لبه آهن",
        id: "62",
        ...keys,
        // bgColor:"#989898",
        // textColor:"black",
        filterIdForPivot: [
            "000117",
            "000239",
            "000240",
            "000241",
            "000242",
            "000243",
            "000244",
            "000245",
            "000246",
            "000247",
            "000248",
            "000249",
            "000454",
            "000505",
            "000523",
            "000610",
            "000639",
            "000640",
            "000641",
            "000771",
            "000820",
            "000821",
            "000837",
            "000854",
            "000875",

        ]
    })
    const SUM_OJRAT_SAKHT_AHAN = calculateSingleObject(totalData, {
        caption: "اجرت ساخت آهن سخت و آسان",
        id: "62",
        ...keys,
        textColor:"gray",
        // bgColor:"#989898",
        // textColor:"black",
        filterIdForPivot: [
            "000252" ,
            "000253",

        ]
    })

    const SUM_FELEZAT = calculateSingleObject(totalData, {
        caption: "جمع متراژ فلزات (استیل آهن جوش فایبر المان شهری)",
        id: "62",
        ...keys,
        bgColor: "#989898",
        textColor: "black",
        filterIdForPivot: [
            // استیل
            "000080",
            "00235",
            // اجرت ساخت آهن
            "000252",
            "000253",
            // جوش فایبراا
            "000381",
            "000435",
            // المان شهری
            "000811"
        ]
    })

    const SUM_METRAJ_ALL = calculateSingleObject(totalData, {
        caption: "متراژ کلی",
        id: "62",
        ...keys,
        bgColor: "black",
        textColor: "white",
        filterIdForPivot: [
            "000068",
            "000080",
            "000081",
            "000146",
            "000158",
            "000159",
            "000235",
            "000251",
            "000252",
            "000253",
            "000365",
            "000381",
            "000435",
            "000493",
            "000494",
            "000495",
            "000496",
            "000801",

        ]
    })

    const OJRAT_DOUBLE = calculateSingleObject(totalData, {
        caption: "اجرت دوبل",
        id: "62",
        ...keys,
        bgColor: "black",
        textColor: "white",
        filterIdForPivot: [
//اجرت دوبل همراه با مبلغ کلر فرم
            "000131",
        ]
    })

    const OJRAT_sticker = calculateSingleObject(totalData, {
        caption: "اجرت چسباندن استیکر ",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000122",
            "000132",
            "000138",
            "000375",

        ]
    })

    const OJRAT_sticker_meshki = calculateSingleObject(totalData, {
        caption: "اجرت چسباندن استیکر مشکی",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000132",
        ]
    })

    const OJRAT_sticker_abi = calculateSingleObject(totalData, {
        caption: "اجرت چسباندن استیکر آبی",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000122",
        ]
    })
    const OJRAT_sticker_qermez = calculateSingleObject(totalData, {
        caption: "اجرت چسباندن استیکر قرمز",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000138",
        ]
    })
    const OJRAT_sticker_sabz = calculateSingleObject(totalData, {
        caption: "اجرت چسباندن استیکر سبز",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000375",
        ]
    })


    const chap_sticket_khali = calculateSingleObject(totalData, {
        caption: "چاپ استیکر شفاف",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000157",
        ]
    })
    const chap_flat_khali = calculateSingleObject(totalData, {
        caption: "چاپ فلت ",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000144",
        ]
    })

    // چیزایی که توی بخش فاکتور زدن لازمه
    const OJRAT_BORESH_LEISER_2_8MILL = calculateSingleObject(totalData, {
        caption: "اجرت برش لیزر ورق 2.8 میل",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000004",
        ]
    })
    const OJRAT_BORESH_PVC_CNC = calculateSingleObject(totalData, {
        caption: "اجرت برش پی وی سی - سی ان سی",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000067",
        ]
    })
    const OJRAT_BORESH_LEISER_ESTIL = calculateSingleObject(totalData, {
        caption: "اجرت برش لیزر استیل",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000082",
        ]
    })
    const OJRAT_BORESH_LEISER_PLAXI_5MILL = calculateSingleObject(totalData, {
        caption: "اجرت برش لیزر پلکسی 5 میل",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000238",
        ]
    })
    const OJRAT_BORESH_LEISER_AHAN = calculateSingleObject(totalData, {
        caption: "اجرت برش لیزر آهن",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000254",
        ]
    })
    const OJRAT_BORESH_PLAXI_10MILL = calculateSingleObject(totalData, {
        caption: "اجرت برش لیزر پلکسی 10 میل",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000374",
        ]
    })

    const SUM_OF_OJRAT_ALL = calculateSingleObject(totalData, {
        caption: "جمع اجرت برش",
        bgColor: "#989898",
        textColor: "black",
        id: "620",
        ...keys,
        filterIdForPivot: [
            "000004",//  "اجرت برش لیزر ورق 2.8 میل
            "000067", //  اجرت برش پی وی سی - سی ان سی
            "000082", //  "اجرت برش لیزر استیل
            "000238", // "اجرت برش لیزر پلکسی 5 میل
            "000254", // "اجرت برش لیزر آهن
            "000374", ///  "اجرت برش لیزر پلکسی 10 میل",
        ]
    })
    const numberOfSMD = calculateSingleObject(totalData, {
        caption: "تعداد کل سفارش های نور SMD",
        id: "62",
        ...keys,
        filterIdForPivot: [
            "000051",
            "000139",
            "000140",
            "000141",
            "000142",
            "000143",
            "000369",
            "000585",
            "000612",

        ]
    })

    const ajrat_bores_laser_varagh_2_8_mil = calculateSingleObject(totalData, {
        id: "",
        caption: "اجرت برش لیزر ورق 2.8 میل",
        ...keys,
        filterIdForPivot: ["000004"]
    });

    const ajrat_bores_pvc_cnc = calculateSingleObject(totalData, {
        id: "",
        caption: "اجرت برش پی وی سی - سی ان سی",
        ...keys,
        filterIdForPivot: ["000067"]
    });

    const ajrat_sakht_chanelium_horof_adi = calculateSingleObject(totalData, {
        id: "",
        caption: "اجرت ساخت چلنیوم حروف عادی",
        ...keys,
        filterIdForPivot: ["000068"]
    });

    const ajrat_panchi_talagh_2_8_mil_sadeh = calculateSingleObject(totalData, {
        id: "",
        caption: "اجرت پانچی کردن ( حالت ساده ) طلق 2.8 میل",
        ...keys,
        filterIdForPivot: ["000069"]
    });

    const ajrat_sakht_steel_horof_adi = calculateSingleObject(totalData, {
        id: "",
        caption: "اجرت ساخت استیل حروف عادی",
        ...keys,
        filterIdForPivot: ["000080"]
    });

    const ajrat_sakht_horof_swedi_asan = calculateSingleObject(totalData, {
        id: "",
        caption: "اجرت ساخت حروف سوئدی آسان",
        ...keys,
        filterIdForPivot: ["000081"]
    });

    const ajrat_bores_laser_steel = calculateSingleObject(totalData, {
        id: "",
        caption: "اجرت برش لیزر استیل",
        ...keys,
        filterIdForPivot: ["000082"]
    });

    const esticker_abi_karbani_ba_nasb_roye_plexi = calculateSingleObject(totalData, {
        id: "",
        caption: "استیکر آبی کاربنی همراه با اجرت نصب روی پلکسی",
        ...keys,
        filterIdForPivot: ["000122"]
    });

    const ajrat_dooble_ba_keler_form = calculateSingleObject(totalData, {
        id: "",
        caption: "اجرت دوبل همراه با مبلغ کلر فرم",
        ...keys,
        filterIdForPivot: ["000131"]
    });

    const esticker_meshki_ba_nasb_roye_plexi = calculateSingleObject(totalData, {
        id: "",
        caption: "استیکر مشکی همراه با اجرت نصب روی پلکسی",
        ...keys,
        filterIdForPivot: ["000132"]
    });

    const esticker_ghermez_ba_nasb_roye_plexi = calculateSingleObject(totalData, {
        id: "",
        caption: "استیکر قرمز با اجرت نصب روی پلکسی",
        ...keys,
        filterIdForPivot: ["000138"]
    });

    const ajrat_sakht_horof_swedi_sakht = calculateSingleObject(totalData, {
        id: "",
        caption: "اجرت ساخت حروف سوئدی سخت",
        ...keys,
        filterIdForPivot: ["000146"]
    });

    const ajrat_multi_band_labe_plastic = calculateSingleObject(totalData, {
        id: "",
        caption: "اجرت مولتی بند کردن لبه پلاستیک",
        ...keys,
        filterIdForPivot: ["000147"]
    });

    const ajrat_panchi_talagh_2_8_mil_tarhdar = calculateSingleObject(totalData, {
        id: "",
        caption: "اجرت پانچی کردن ( حالت طرحدار ) طلق 2.8 میل",
        ...keys,
        filterIdForPivot: ["000156"]
    });

    const ajrat_sakht_neon_plastic_horof_standard_labe_3_ta_8 = calculateSingleObject(totalData, {
        id: "",
        caption: "اجرت ساخت نئون پلاستیک ( حروف استاندارد ) لبه 3 تا 8 سانت",
        ...keys,
        filterIdForPivot: ["000158"]
    });

    const ajrat_sakht_neon_plastic_horof_sakht_labe_3_ta_8 = calculateSingleObject(totalData, {
        id: "",
        caption: "اجرت ساخت نئون پلاستیک ( حروف سخت) لبه 3 تا 8 سانت",
        ...keys,
        filterIdForPivot: ["000159"]
    });

    const ajrat_panch_va_bores_pattern_varagh_steel_va_ahan_ta_1_mil = calculateSingleObject(totalData, {
        id: "",
        caption: "اجرت پانچ و برش طرح پترن ورق استیل و آهن تا ضخامت یک میل",
        ...keys,
        filterIdForPivot: ["000234"]
    });

    const ajrat_sakht_steel_horof_sakht = calculateSingleObject(totalData, {
        id: "",
        caption: "اجرت ساخت استیل حروف های سخت",
        ...keys,
        filterIdForPivot: ["000235"]
    });

    const ajrat_bores_laser_plexi_5_mil = calculateSingleObject(totalData, {
        id: "",
        caption: "اجرت برش لیزر پلکسی 5 میل",
        ...keys,
        filterIdForPivot: ["000238"]
    });

    const ajrat_sakht_chanelium_horof_sakht = calculateSingleObject(totalData, {
        id: "",
        caption: "اجرت ساخت چلنیوم حروف سخت",
        ...keys,
        filterIdForPivot: ["000251"]
    });

    const ajrat_sakht_horof_ahan_adi = calculateSingleObject(totalData, {
        id: "",
        caption: "اجرت ساخت حروف آهن عادی",
        ...keys,
        filterIdForPivot: ["000252"]
    });

    const ajrat_sakht_horof_ahan_sakht = calculateSingleObject(totalData, {
        id: "",
        caption: "اجرت ساخت حروف آهن سخت",
        ...keys,
        filterIdForPivot: ["000253"]
    });

    const ajrat_bores_laser_ahan = calculateSingleObject(totalData, {
        id: "",
        caption: "اجرت برش لیزر آهن",
        ...keys,
        filterIdForPivot: ["000254"]
    });




    const tableView = [
        [
            {
                ...SUM_METRAJ_ALL,
            },
            {
                ...SUEDI_KOLLI,
            },
            {
                ...SUEDI_KOLLI_OJRAT,
            },
            {
                ...CHALENIUM_ONLY,
            },
            {
                ...CHALENIUM_ONLY_OJRAT,
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
            },
            {
                // title: "نئون پلاستیک اجرت ",
                ...NEON_PLASTIC_OJRAT
            },
        ],
        // [
        //     {
        //         ...NEON_FELAX_KOLLI
        //     }
        // ],
        [
            {
                ...SUM_OJRAT_SAKHT_ESTIL_LABE
            },
            {
                ...SUM_OJRAT_SAKHT_ESTIL
            },
            {
                ...SUM_OJRAT_SAKHT_AHAN_LABE
            },
            {
                ...SUM_OJRAT_SAKHT_AHAN
            },
            {
                ...JOOSH_FIBER
            },
            {
                ...ELEMAN_SHAHRI_OJRAT
            },
            {
                ...SUM_FELEZAT
            },
        ],
        [
            {
                ...OJRAT_BORESH_PLAXI_10MILL
            },
            {
                ...OJRAT_BORESH_LEISER_AHAN
            },
            {
                ...OJRAT_BORESH_LEISER_PLAXI_5MILL
            },
            {
                ...OJRAT_BORESH_LEISER_ESTIL
            },
            {
                ...OJRAT_BORESH_PVC_CNC
            },
            {
                ...OJRAT_BORESH_LEISER_2_8MILL
            },
            {
                ...SUM_OF_OJRAT_ALL
            }


        ],
        [numberOfSMD],


        anbarExport(totalData)

    ]

    const treeViewData = [

        {

            title:"ریز جزئیات اجرت ساخت.",
            subItems : [
                { ...ajrat_bores_laser_varagh_2_8_mil },
                { ...ajrat_bores_pvc_cnc },
                { ...ajrat_sakht_chanelium_horof_adi },
                { ...ajrat_panchi_talagh_2_8_mil_sadeh },
                { ...ajrat_sakht_steel_horof_adi },
                { ...ajrat_sakht_horof_swedi_asan },
                { ...ajrat_bores_laser_steel },
                { ...esticker_abi_karbani_ba_nasb_roye_plexi },
                { ...ajrat_dooble_ba_keler_form },
                { ...esticker_meshki_ba_nasb_roye_plexi },
                { ...esticker_ghermez_ba_nasb_roye_plexi },
                { ...ajrat_sakht_horof_swedi_sakht },
                { ...ajrat_multi_band_labe_plastic },
                { ...ajrat_panchi_talagh_2_8_mil_tarhdar },
                { ...ajrat_sakht_neon_plastic_horof_standard_labe_3_ta_8 },
                { ...ajrat_sakht_neon_plastic_horof_sakht_labe_3_ta_8 },
                { ...ajrat_panch_va_bores_pattern_varagh_steel_va_ahan_ta_1_mil },
                { ...ajrat_sakht_steel_horof_sakht },
                { ...ajrat_bores_laser_plexi_5_mil },
                { ...ajrat_sakht_chanelium_horof_sakht },
                { ...ajrat_sakht_horof_ahan_adi },
                { ...ajrat_sakht_horof_ahan_sakht },
                { ...ajrat_bores_laser_ahan }
            ]
        },
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
        },
        ///////
        {
            // title: "پلاستیک کلی ",
            // value: "120",
            ...NEON_PLASTIC,

            subItems: [
                {
                    ...LABEH_PLASTIC_2,
                },
                {
                    ...LABEH_PLASTIC_3,
                },
                {
                    ...LABEH_PLASTIC_4,
                },
                {
                    ...LABEH_PLASTIC_5,
                },
                {
                    ...LABEH_PLASTIC_6,
                },
                {
                    ...LABEH_PLASTIC_7,
                },
                {
                    ...LABEH_PLASTIC_8,
                },
                {
                    ...LABEH_PLASTIC_9,
                },
                {
                    ...LABEH_PLASTIC_10,
                },
                {
                    ...LABEH_PLASTIC_11,
                },
                {
                    ...LABEH_PLASTIC_12,
                },
                {
                    ...LABEH_PLASTIC_17,
                },


            ]
        },

        {
            ...OJRAT_DOUBLE
        },
        {
            ...OJRAT_sticker,
            subItems: [
                {...OJRAT_sticker_sabz},
                {...OJRAT_sticker_qermez},
                {...OJRAT_sticker_abi},
                {...OJRAT_sticker_meshki},
            ]
        },
        {...chap_sticket_khali},
        {...chap_flat_khali},

    ]
    // const treeViewDataSorted =sortInnerRecursive({arrayOfData:treeViewData ,subItemKey:"subItems", valueToSortedKey:"value"})
    const treeViewDataSorted =sortInnerRecursive(treeViewData)

    return {
        tableView,
        treeView:treeViewDataSorted,
    }
}

export default makeDataObject