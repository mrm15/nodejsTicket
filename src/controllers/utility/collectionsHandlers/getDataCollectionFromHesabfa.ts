import {hesabfaApiRequest} from "../hesabfa/functions";
import {openTagData} from "./openTagData";

export const getDataCollectionFromHesabfa = async (bodyData: any, url: string) => {
    const {Skip: page, Take: pageSize, filters = []} = bodyData.queryInfo;

    debugger

    // Build the filter object

    // Define sorting options

    // Define pagination options
    // const paginationOptions = {page, pageSize};

    // Fetch the users with pagination
    // {results,totalDocuments,currentPage: page,pageSize}
    // return await fetchPaginatedResults(
    //     collectionName,
    //     filterObject,
    //     paginationOptions,
    //     sortOptions,
    // )
    try {
        const resData = await hesabfaApiRequest(url, bodyData);
        if (!resData?.response?.data?.Success) {
            throw new Error("مشکل در دریافت اطلاعات از حسابفا")
        }

        if (resData?.response?.data?.Result?.List) {
            //     resData.response.data.Result.List = resData?.response?.data?.Result?.List?.map((row: any, index: any) => {
            //
            //         const rowNumber = startIndex + index + 1;
            //         // اینجا میخوام مقدار موجود توی تگ رو باز کنم و بفرستم سمت فرانت
            //         const newRow = openTagData(row)
            //
            //         return {
            //             rowNumber,
            //             ...newRow
            //         }
            //     })
            //
            resData.response.data.Result.List = resData?.response?.data?.Result?.List.map((row: any, index: number) => {
                const rowNumber = page + index + 1
                debugger
                //         // اینجا میخوام مقدار موجود توی تگ رو باز کنم و بفرستم سمت فرانت
                const newRow = openTagData(row)
                const row12 = {
                    rowNumber,
                    ...newRow

                }
                return row12

            })
        }


        return resData
    } catch (error) {

        throw new Error("مشکل در دریافت اطلاعات از حسابفا")
    }


}