import { keys } from "./makeDataObject";
import { calculateSingleObject } from "./calculatePivotById";

export const anbarExport = (totalData: any) => {
    const filters = [
        { id: "000139", caption: "SMD سفید با سیم کشی و منگنه" },
        { id: "000141", caption: "SMD انبه ای با سیم کشی و منگنه" },
        { id: "000142", caption: "SMD قرمز با سیم کشی و منگنه" },
        { id: "000140", caption: "SMD آفتابی با سیم کشی و منگنه" },
        { id: "000143", caption: "اینجکشن آفتابی با سیم کشی و منگنه" },
        { id: "000051", caption: "اینجکشن سفید با سیم کشی و منگنه" },
        { id: "000369", caption: "اینجکشن انبه ای با سیم کشی و منگنه" },
        { id: "000585", caption: "اینجکشن قرمز با سیم کشی و منگنه" },
        { id: "000050", caption: "SMD انبه ای" },
        { id: "000401", caption: "اینجکشن قرمز" },
        { id: "000581", caption: "SMD اینجکشن انبه ای" },
        { id: "000053", caption: "SMD اینجکشن آفتابی" },
        { id: "000052", caption: "SMD اینجکشن سفید" },
        { id: "000048", caption: "SMD آفتابی" },
        { id: "000058", caption: "SMD سفید تک نقطه" },
    ];

    const results = filters.map(({ id, caption }) =>
        calculateSingleObject(totalData, { id: "", caption, ...keys, filterIdForPivot: [id] })
    );

    return results;
};
