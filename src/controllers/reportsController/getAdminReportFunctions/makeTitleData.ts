export const makeTitleData = (inputData: any) => {


    const {
        plaksi2_8Value,
        simplePunchValue,
        proPunchValue,
        doubleValue,
        duqi10milValue,
        duqi5milValue,
        ESTILFELEZ,
        CHALANDSUEDI,
        NEONPLASTIC,
        NEONFELAXI,
        SMD,
        STICKER_OJRAT,
        AMAR_VARAQ_Estil,
        AMAR_PVC,
        PLAKSI_Varaq,
    } = inputData;

    const titleData = [
        {title: "پلکسی 2.8 میل", value: plaksi2_8Value},
        {title: "پانچ ساده", value: simplePunchValue},
        {title: "پانچ طرح دار", value: proPunchValue},
        {title: "دوبل", value: doubleValue},
        {title: "دوغی 10 میل", value: duqi10milValue},
        {title: "دوغی 5 میل", value: duqi5milValue},
        {title: "استیل و فلز", value: ESTILFELEZ},
        {title: "چلنیوم و سوئدی", value: CHALANDSUEDI},
        {title: "نئون پلاستیک", value: NEONPLASTIC},
        {title: "نئون فلکسی", value: NEONFELAXI},
        {title: "SMD", value: SMD},
        {title: "اجرا استیکر", value: STICKER_OJRAT},
        {title: "ورق استیل", value: AMAR_VARAQ_Estil},
        {title: "ورق پلکسی", value: PLAKSI_Varaq},
        {title: "PVC", value: AMAR_PVC},
    ];


    return titleData.filter((item) => item.value !== undefined && item.value !== null);

}