import {calculateFilteredPrices, calculateSingleObject} from "../reportFunctions/calculatePivotById";

const temp = [
    {
        title: 'پلکسی کلی',
        value: '2000 متر',
        subItems: [
            {
                title: 'پلکسی 2.8 میل',
                value: '120',

            },
            {
                title: 'پلکسی دوغی 5 میل',
                value: '120',

            },
            {
                title: 'پلکسی دوغی 10 میل',
                value: '120',

            },

        ]
    },
    ////////////////////
    {
        title: 'پی وی سی 10 میل',
        value: '2000 متر',
    },
    /////////
    {
        title: 'پانچ',
        value: '2000 متر',
        subItems: [
            {
                title: 'ساده ',
                value: '120',

            },
            {
                title: 'طرحدار',
                value: '120',

            },
        ]
    },
    /////////
    {
        title: 'ورق استیل',
        value: '2000 متر',
        subItems: [
            {title: 'طلایی آیینه ای', value: '120',},
            {title: 'طلایی خشدار', value: '120',},
            {title: 'نقره ای آیینه ای', value: '120',},
            {title: 'نقره ای خشدار', value: '120',},
            {title: 'مسی آیینه ای ', value: '120',},
            {title: 'مسی خشدار', value: '120',},
            {title: 'دودی آیینه ای', value: '120',},
            {title: 'دودی خشدار', value: '120',},
        ]
    },
    //////////
    {
        title: "ورق آهن", value: "120",
        subItems: [
            {title: 'ورق آهن یک میل', value: '120',},
            {title: 'ورق آهن هفت میل', value: '120',},
        ]
    },
    ///////
    // ////////
    {
        title: "نئون فلکس", value: "120",
        subItems: [
            {title: 'سفید یخی', value: '120',},
            {title: 'زیمسی ( آبی فیروزه ای)', value: '120',},
            {title: 'قرمز:', value: '120',},
            {title: 'آفتابی', value: '120',},
            {title: 'آبی آسمانی', value: '120',},
            {title: 'بنفش', value: '120',},
            {title: 'انبه ای', value: '120',},
            {title: 'لیمویی', value: '120',},
            {title: 'سبز', value: '120',},
            {title: 'صورتی', value: '120',},
            {title: 'کاربنی', value: '120',},
            {title: 'نارنجی', value: '120',},
        ]
    },
    ///////
    // ////////
    {
        title: "متراژ چلنیوم و سوئدی ", value: "120",
        subItems: [
            {
                title: 'چلنیوم', value: '120',
                subItems: [
                    {title: "لبه نقره ای 9 سانت ساده", value: "120",},
                    {title: "لبه نقره ای 7 سانت ساده", value: "120",},
                    {title: "لبه نقره ای پانج 9 سانت", value: "120",},
                    {title: "لبه نقره ای پانچ 7 سانت", value: "120",},
                    {title: "لبه نقره ای سوپرساید ", value: "120",},
                    {title: "لبه نقره ای سنتی", value: "120",},
                    {title: "لبه طلایی 9 سانت ساده", value: "120",},
                    {title: "لبه طلایی 7 سانت ساده", value: "120",},
                    {title: "لبه طلایی پانج 9 سانت", value: "120",},
                    {title: "لبه طلایی پانچ 7 سانت", value: "120",},
                    {title: "لبه طلایی سوپرساید ", value: "120",},
                    {title: "لبه طلایی سنتی", value: "120",},
                    {title: "لبه مشکی 9 سانت ساده", value: "120",},
                    {title: "لبه مشکی 7 سانت ساده", value: "120",},
                    {title: "لبه مشکی 9 سانت پانج", value: "120",},
                    {title: "لبه مشکی 7 سانت پانچ", value: "120",},
                    {title: "لبه مشکی سوپر ساید", value: "120",},
                    {title: "لبه سفید 9 سانت ساده", value: "120",},
                    {title: "لبه سفید 7 سانت ساده", value: "120",},
                    {title: "لبه سفید 9 سانت پانچ", value: "120",},
                    {title: "لبه سفید 7 سانت پانچ", value: "120",},
                    {title: "لبه بنفش 9 سانت ساده", value: "120",},
                ]
            },
            {
                title: 'سوئدی', value: '120',
                subItems: [
                    {title: "لبه نقره ای 5 سانت براق", value: "120",},
                    {title: "لبه نقره ای 7 سانت براق", value: "120",},
                    {title: "لبه نقره ای 5 سانت خشدار", value: "120",},
                    {title: "لبه نقره ای 7 سانت خشدار", value: "120",},
                    {title: "لبه طلایی 5 سانت براق", value: "120",},
                    {title: "لبه طلایی ای 7 سانت براق", value: "120",},
                    {title: "لبه طلایی 5 سانت خشدار", value: "120",},
                    {title: "لبه طلایی ای 7 سانت خشدار", value: "120",},
                    {title: "لبه مشکی 5 سانت", value: "120",},
                    {title: "لبه مشکی 7 سانت", value: "120",},

                ]
            },

        ]
    }
    ///////

]

const myKey = "myItemName"
const sumKey = "myTotalAmount"
const countKey = "myQuantity";



export const makeTreeView = ({totalData}:any) => {

    const keys = {myKey,sumKey,countKey,}

    return [
        {
            caption: 'پلکسی کلی',
            ...keys,
            // value: calculateSingleObject(totalData,this),
            filterIdForPivot: [
                "000004" ,
            ],
            subItems: [
                {
                    title: 'پلکسی 2.8 میل',
                    caption:"'پلکسی 2.8 میل'",
                    value: "",

                },
                {
                    title: 'پلکسی دوغی 5 میل',
                    value: '120',

                },
                {
                    title: 'پلکسی دوغی 10 میل',
                    value: '120',

                },

            ]
        },
        ////////////////////
        {
            title: 'پی وی سی 10 میل',
            value: '2000 متر',
        },
        /////////
        {
            title: 'پانچ',
            value: '2000 متر',
            subItems: [
                {
                    title: 'ساده ',
                    value: '120',

                },
                {
                    title: 'طرحدار',
                    value: '120',

                },
            ]
        },
        /////////
        {
            title: 'ورق استیل',
            value: '2000 متر',
            subItems: [
                {title: 'طلایی آیینه ای', value: '120',},
                {title: 'طلایی خشدار', value: '120',},
                {title: 'نقره ای آیینه ای', value: '120',},
                {title: 'نقره ای خشدار', value: '120',},
                {title: 'مسی آیینه ای ', value: '120',},
                {title: 'مسی خشدار', value: '120',},
                {title: 'دودی آیینه ای', value: '120',},
                {title: 'دودی خشدار', value: '120',},
            ]
        },
        //////////
        {
            title: "ورق آهن", value: "120",
            subItems: [
                {title: 'ورق آهن یک میل', value: '120',},
                {title: 'ورق آهن هفت میل', value: '120',},
            ]
        },
        ///////
        // ////////
        {
            title: "نئون فلکس", value: "120",
            subItems: [
                {title: 'سفید یخی', value: '120',},
                {title: 'زیمسی ( آبی فیروزه ای)', value: '120',},
                {title: 'قرمز:', value: '120',},
                {title: 'آفتابی', value: '120',},
                {title: 'آبی آسمانی', value: '120',},
                {title: 'بنفش', value: '120',},
                {title: 'انبه ای', value: '120',},
                {title: 'لیمویی', value: '120',},
                {title: 'سبز', value: '120',},
                {title: 'صورتی', value: '120',},
                {title: 'کاربنی', value: '120',},
                {title: 'نارنجی', value: '120',},
            ]
        },
        ///////
        // ////////
        {
            title: "متراژ چلنیوم و سوئدی ", value: "120",
            subItems: [
                {
                    title: 'چلنیوم', value: '120',
                    subItems: [
                        {title: "لبه نقره ای 9 سانت ساده", value: "120",},
                        {title: "لبه نقره ای 7 سانت ساده", value: "120",},
                        {title: "لبه نقره ای پانج 9 سانت", value: "120",},
                        {title: "لبه نقره ای پانچ 7 سانت", value: "120",},
                        {title: "لبه نقره ای سوپرساید ", value: "120",},
                        {title: "لبه نقره ای سنتی", value: "120",},
                        {title: "لبه طلایی 9 سانت ساده", value: "120",},
                        {title: "لبه طلایی 7 سانت ساده", value: "120",},
                        {title: "لبه طلایی پانج 9 سانت", value: "120",},
                        {title: "لبه طلایی پانچ 7 سانت", value: "120",},
                        {title: "لبه طلایی سوپرساید ", value: "120",},
                        {title: "لبه طلایی سنتی", value: "120",},
                        {title: "لبه مشکی 9 سانت ساده", value: "120",},
                        {title: "لبه مشکی 7 سانت ساده", value: "120",},
                        {title: "لبه مشکی 9 سانت پانج", value: "120",},
                        {title: "لبه مشکی 7 سانت پانچ", value: "120",},
                        {title: "لبه مشکی سوپر ساید", value: "120",},
                        {title: "لبه سفید 9 سانت ساده", value: "120",},
                        {title: "لبه سفید 7 سانت ساده", value: "120",},
                        {title: "لبه سفید 9 سانت پانچ", value: "120",},
                        {title: "لبه سفید 7 سانت پانچ", value: "120",},
                        {title: "لبه بنفش 9 سانت ساده", value: "120",},
                    ]
                },
                {
                    title: 'سوئدی', value: '120',
                    subItems: [
                        {title: "لبه نقره ای 5 سانت براق", value: "120",},
                        {title: "لبه نقره ای 7 سانت براق", value: "120",},
                        {title: "لبه نقره ای 5 سانت خشدار", value: "120",},
                        {title: "لبه نقره ای 7 سانت خشدار", value: "120",},
                        {title: "لبه طلایی 5 سانت براق", value: "120",},
                        {title: "لبه طلایی ای 7 سانت براق", value: "120",},
                        {title: "لبه طلایی 5 سانت خشدار", value: "120",},
                        {title: "لبه طلایی ای 7 سانت خشدار", value: "120",},
                        {title: "لبه مشکی 5 سانت", value: "120",},
                        {title: "لبه مشکی 7 سانت", value: "120",},

                    ]
                },

            ]
        }
        ///////

    ]

}