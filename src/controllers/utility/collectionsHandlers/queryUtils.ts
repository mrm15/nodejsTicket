// utils/queryUtils.ts

import { Model } from 'mongoose';

interface PaginationOptions {
    page: number;
    pageSize: number;
}
const defaultSortOptions: SortOptions = { createdAt: -1 };

export interface SortOptions {
    [key: string]: 1 | -1;
}

// Define default sorting options
export const fetchPaginatedResults = async (
    model: Model<any>,
    filterObject: { [key: string]: any },
    paginationOptions: PaginationOptions,
    sortOptions?: SortOptions, // Make sortOptions optional
) => {
    const { page, pageSize } = paginationOptions;
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    // Use default sorting options if sortOptions is not provided
    const appliedSortOptions = sortOptions || defaultSortOptions;

    const totalDocuments = await model.countDocuments(filterObject).exec();
    const results = await model.find(filterObject)
        .sort(appliedSortOptions)
        .skip(skip)
        .limit(limit)
        .exec();

    return {
        results,
        totalDocuments,
        currentPage: page,
        pageSize
    };
};

