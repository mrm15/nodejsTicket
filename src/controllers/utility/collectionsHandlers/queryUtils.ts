// utils/queryUtils.ts

import {Model} from 'mongoose';

interface PaginationOptions {
    page: number;
    pageSize: number;
}

const defaultSortOptions: SortOptions = {createdAt: -1};

export interface SortOptions {
    [key: string]: 1 | -1;
}

// Define an interface for the result structure
interface IPaginatedResults<T> {
    results: Array<T & { rowNumber: number }>; // Each result will include the rowNumber
    totalDocuments: number;
    currentPage: number;
    pageSize: number;
}

// Define default sorting options
export const fetchPaginatedResults = async (
    model: Model<any>,
    filterObject: { [key: string]: any },
    paginationOptions: PaginationOptions,
    sortOptions?: SortOptions, // Make sortOptions optional
) : Promise<IPaginatedResults<any>> => {


    const {page, pageSize} = paginationOptions;
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    // Use default sorting options if sortOptions is not provided
    const appliedSortOptions = sortOptions || defaultSortOptions;

    const totalDocuments = await model.countDocuments(filterObject).exec();
    let results = await model.find(filterObject)
        .skip(skip)
        .limit(limit)
        .lean()

    results = results.map((row, index) => {

        const rowNumber = skip + index + 1
        return {
            rowNumber,
            ...row
        }
    })


    return {
        results,
        totalDocuments,
        currentPage: page,
        pageSize
    }


}

