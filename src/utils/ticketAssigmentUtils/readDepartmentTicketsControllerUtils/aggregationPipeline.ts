import {PipelineStage} from "mongoose";

interface ICreateAggregationPipeline {
    matchConditions: any[],
    currentPage: number,
    pageSize: number
}

// Define the pipeline stages
export const createAggregationPipeline = ({
                                              matchConditions,
                                              currentPage,
                                              pageSize
                                          }: ICreateAggregationPipeline): PipelineStage[] => {


    return [
        // Lookup for assignedToUserId and assignedBy from users
        {
            $lookup: {
                from: "users",
                localField: "assignedToUserId",
                foreignField: "_id",
                as: "assignedToUserDetails"
            }
        },

        {
            $lookup: {
                from: "users",
                localField: "assignedBy",
                foreignField: "_id",
                as: "assignedByDetails"
            }
        },

        // Lookup for assignedToDepartmentId from departments
        {
            $lookup: {
                from: "departments",
                localField: "assignedToDepartmentId",
                foreignField: "_id",
                as: "assignedToDepartmentDetails"
            }
        },

        // Lookup for ticketId from tickets and further lookups within tickets
        {
            $lookup: {
                from: "tickets",
                localField: "ticketId",
                foreignField: "_id",
                as: "ticketDetails"
            }
        },
        {$unwind: "$ticketDetails"},
        {
            $lookup: {
                from: "users",
                localField: "ticketDetails.userId",
                foreignField: "_id",
                as: "ticketUserDetails"
            }
        },
        {$unwind: "$ticketUserDetails"},
        {
            $lookup: {
                from: "users",
                localField: "ticketDetails.assignedToUserId",
                foreignField: "_id",
                as: "ticketAssignedToUserDetails"
            }
        },
        {$unwind: "$ticketAssignedToUserDetails"},
        {
            $lookup: {
                from: "departments",
                localField: "ticketDetails.assignedToDepartmentId",
                foreignField: "_id",
                as: "ticketAssignedDepartmentDetails"
            }
        },
        {$unwind: "$ticketAssignedDepartmentDetails"},

        // Projecting fields
        {
            $project: {
                assignedToUserId: 1,
                assignedBy: 1,
                assignedToDepartmentId: 1,
                ticketId: 1,

                // User details
                assignedToUserName: "$assignedToUserDetails.name",
                assignedByName: "$assignedByDetails.name",
                assignedToDepartmentName: "$assignedToDepartmentDetails.name",

                // Ticket details
                ticketNumber: "$ticketDetails.ticketNumber",
                ticketUserName: "$ticketUserDetails.name",
                ticketAssignedToUserName: "$ticketAssignedToUserDetails.name",
                ticketAssignedToDepartmentName: "$ticketAssignedDepartmentDetails.name"
            }
        },
        // 4. Use $facet to run two pipelines: one for total count, one for results
        {
            $facet: {
                results: [
                    // Apply match conditions before pagination
                    // {
                    //     $match: {
                    //         $and: matchConditions
                    //     }
                    // },
                    // Pagination: Skip and Limit for the current page
                    {
                        $skip: (currentPage - 1) * pageSize
                    },
                    {
                        $limit: pageSize
                    }
                ],
                totalDocuments: [
                    // Apply match conditions for total count
                    // {
                    //     $match: {
                    //         $and: matchConditions
                    //     }
                    // },
                    {
                        $count: "total"
                    }
                ]
            }
        }
    ]
}
