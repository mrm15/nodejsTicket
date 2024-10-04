const getIdsFromPivotArray = (pivotArray: any[], arrayOfIds: any[]) => {
    return arrayOfIds.map(id => {
        return pivotArray[id]
    })
}

const makeTables = (pivotArray: any[]) => {
    /*
    متراژ ساخت کلی روز working
    فقط چلنیوم
    فقط سوئدی
    چلنیوم و سوئدی
     */
    const table1 = getIdsFromPivotArray(pivotArray, [10, 11, 12, 13])

    const table2 = getIdsFromPivotArray(pivotArray, [14, 15, 16, 17]) // نئون پلاستیک

    const table3 = getIdsFromPivotArray(pivotArray, [18, 19, 20, 21]) // نئون فلکسی
    /*
        ورق استیل
        فقط آهنworking
        جوش فایبر working
        جمع فلزات working
    */
    const table4 = getIdsFromPivotArray(pivotArray, [18, 19, 20, 21])
    return [table1, table2,table3, table4]
}