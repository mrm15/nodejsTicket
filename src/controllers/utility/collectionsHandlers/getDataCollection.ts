import {buildFilterObject} from "./filterUtils";
import {fetchPaginatedResults, SortOptions} from "./queryUtils";
import {Model} from "mongoose";

export const getDataCollection = async (bodyData: any, collectionName: Model<any>) => {
    const {page = 1, pageSize = 2, filters = []} = bodyData;

    // Build the filter object
    const filterObject = buildFilterObject(filters);

    // Define sorting options
    const sortOptions: SortOptions = {createdAt: 1};

    // Define pagination options
    const paginationOptions = {page, pageSize};
    debugger        // Fetch the users with pagination
    return await fetchPaginatedResults(
        collectionName,
        filterObject,
        paginationOptions,
        sortOptions,
    )
}