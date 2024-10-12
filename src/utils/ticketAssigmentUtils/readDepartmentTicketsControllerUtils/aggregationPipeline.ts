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


    let myPipLine = []


    // اول میخوایم که توی خود تیکت اساینمنت بره این دو مورد رو تبدیل کنه
    //assignedToUserId
    //assignedBy

    myPipLine.push(
        {
            $lookup: {
                from: "users",
                localField: "assignedToUserId",
                foreignField: "_id",
                as: "z_assignedToUserDetails"
            }
        },
    )


    myPipLine.push(
        {
            $lookup: {
                from: "users",
                localField: "assignedBy",
                foreignField: "_id",
                as: "z_assignedByDetails"
            }
        },
    )

    myPipLine.push(        // Lookup for assignedToDepartmentId from departments
        {
            $lookup: {
                from: "departments",
                localField: "assignedToDepartmentId",
                foreignField: "_id",
                as: "z_assignedToDepartmentDetails"
            }
        },
    )


    myPipLine.push(
        {
            $lookup: {
                from: "tickets",
                localField: "ticketId",
                foreignField: "_id",
                as: "z_ticketDetails"
            }
        }
    )

    myPipLine.push({$unwind: "$z_ticketDetails"})

    myPipLine.push(
        {
            $lookup: {
                from: "users",
                localField: "z_ticketDetails.userId",
                foreignField: "_id",
                as: "z_ticketUserIdDetails"
            }
        },
    )


    myPipLine.push({$unwind: "$z_ticketUserIdDetails"},)

    // اینجا احتیاجی نمیبینم که بخوام assignedToUserId رو باز کنم. چون توی همون تیکت اساینمنت هست
    // myPipLine.push(
    //     {
    //         $lookup: {
    //             from: "users",
    //             localField: "ticketDetails.assignedToUserId",
    //             foreignField: "_id",
    //             as: "ticketAssignedToUserDetails",
    //         }
    //     },
    // )
    // myPipLine.push({$unwind: "$ticketAssignedToUserDetails"},)
    // myPipLine.push(
    //     {
    //         $lookup: {
    //             from: "departments",
    //             localField: "ticketDetails.assignedToDepartmentId",
    //             foreignField: "_id",
    //             as: "z_ticketAssignedDepartmentDetails"
    //         }
    //     },
    // )
    // myPipLine.push({$unwind: "$z_ticketAssignedDepartmentDetails"},)
    myPipLine.push(
        {
            $project: {
                assignedToUserId: 1,
                assignedBy: 1,
                assignedToDepartmentId: 1,
                ticketId: 1,

                // User details
                assignedToUserName: "$z_assignedToUserDetails.name",
                assignedByName: "$z_assignedByDetails.name",
                assignedToDepartmentName: "$z_assignedToDepartmentDetails?.name",

                // Ticket details
                ticketNumber: "$ticketDetails.ticketNumber",
                ticketUserName: "$ticketUserDetails.name",
                ticketAssignedToUserName: "$ticketAssignedToUserDetails.name",
                ticketAssignedToDepartmentName: "$ticketAssignedDepartmentDetails.name"
            }
        },
    )

    if (pageSize === 900) {



        myPipLine.push(
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
        )
    }

    return myPipLine
}
