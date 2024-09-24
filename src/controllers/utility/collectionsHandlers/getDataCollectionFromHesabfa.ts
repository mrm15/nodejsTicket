import {hesabfaApiRequest} from "../hesabfa/functions";
import {openTagData} from "./openTagData";

export const getDataCollectionFromHesabfa = async (bodyData: any, url: string) => {
    const {page = 1, pageSize = 2, filters = []} = bodyData;
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
        const skip = (page - 1) * pageSize;

        if (resData?.response?.data?.Result?.List) {
            resData.response.data.Result.List = resData?.response?.data?.Result?.List?.map((row: any, index: any) => {

                const rowNumber = skip + index + 1;
                // اینجا میخوام مقدار موجود توی تگ رو باز کنم و بفرستم سمت فرانت
                const newRow = openTagData(row)

                return {
                    rowNumber,
                    ...newRow
                }
            })
            debugger
        }
        return resData
    } catch (error) {

        throw new Error("مشکل در دریافت اطلاعات از حسابفا")
    }


}