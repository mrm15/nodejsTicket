import {keys} from "./makeDataObject";
import {calculateSingleObject} from "./calculatePivotById";

export const anbarExport = (totalData: any) => {
    const filters = [
        {id: ["000047", "000139"], caption: "SMD سفید"},
        {id: ["000051", "000052"], caption: "اینجکشن سفید "},
        {id: ["000842"], caption: "SMD اینجکشن سفید 220 ولت"},
        {id: ["000612", "000611"], caption: "SMD اینجکشن لنزدار سفید(سامسونگ)"},
        {id: ["000048", "000140"], caption: "SMD آفتابی"},
        {id: ["000053", "000143"], caption: "SMD اینجکشن آفتابی"},
        {id: ["000049", "000142"], caption: "SMD قرمز"},
        {id: ["000401", "000585"], caption: "اینجکشن قرمز"},
        {id: ["000050", "000141"], caption: "SMD انبه ای"},
        {id: ["000581", "000369"], caption: "SMD اینجکشن انبه ای"},
        // {
        //     id: [
        //         "000047",
        //         "000051",
        //         "000842",
        //         "000612",
        //         "000048",
        //         "000049",
        //         "000401",
        //         "000050",
        //         "000581",
        //         "000139",
        //         "000052",
        //         "000611",
        //         "000140",
        //         "000143",
        //         "000142",
        //         "000585",
        //         "000141",
        //         "000369",
        //
        //     ], caption: "جمع کل "
        // },
    ];

    const results = filters.map(({id, caption}) =>
        calculateSingleObject(totalData, {id: "", caption, ...keys, filterIdForPivot: [...id]})
    );

    return results;
};
