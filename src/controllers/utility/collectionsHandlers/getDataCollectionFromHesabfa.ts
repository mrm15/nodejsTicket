import {buildFilterObject} from "./filterUtils";
import { SortOptions} from "./queryUtils";
import {hesabfaApiRequest} from "../hesabfa/functions";
import {openTagData} from "./openTagData";

export const getDataCollectionFromHesabfa = async (bodyData: any, url: string) => {
    const {page = 1, pageSize = 2, filters = []} = bodyData;
    debugger


    // Build the filter object
    const filterObject = buildFilterObject(filters);

    // Define sorting options
    const sortOptions: SortOptions = {createdAt: 1};

    // Define pagination options
    // const paginationOptions = {page, pageSize};
    debugger        // Fetch the users with pagination
    // {results,totalDocuments,currentPage: page,pageSize}
    // return await fetchPaginatedResults(
    //     collectionName,
    //     filterObject,
    //     paginationOptions,
    //     sortOptions,
    // )
    const resData = await hesabfaApiRequest(url, bodyData);
    const skip = (page - 1) * pageSize;

    if(resData?.response?.data?.Result?.List){
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
}