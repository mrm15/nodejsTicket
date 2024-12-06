import {PipelineStage} from "mongoose";


interface ICreateAggregationPipelineForTickets {
    matchConditions: any[],
    page: number,
    pageSize: number
}


// Define the pipeline stages
export const createAggregationPipelineForTickets = ({
                                                        matchConditions,
                                                        page,
                                                        pageSize
                                                    }: ICreateAggregationPipelineForTickets): PipelineStage[] => {


    let myPipLine = []


    myPipLine.unshift({
        $sort: {_id: -1 as 1 | -1} // Explicitly type the sort direction as `1 | -1`
    });

    // firstUserId name
    myPipLine.push(
        {
            $lookup: {
                from: "users",
                localField: "firstUserId",
                foreignField: "_id",
                as: "z_firstUserIdDetails"
            }
        },
    )

    myPipLine.push(
        {
            $unwind: {
                path: "$z_firstUserIdDetails",
                preserveNullAndEmptyArrays: true
            }
        },
    )

    // sender
    myPipLine.push(
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "z_userCreateThisOrder"
            }
        },
    )
    myPipLine.push(
        {
            $unwind: {
                path: "$z_userCreateThisOrder",
                preserveNullAndEmptyArrays: true
            }
        },
    )
////////////////////////////////////////////////////////////////////////////////////////////
    // Lookup for assignedToDepartmentId from departments
    // myPipLine.push(
    //     {
    //         $lookup: {
    //             from: "departments",
    //             localField: "assignedToDepartmentId",
    //             foreignField: "_id",
    //             as: "z_assignedToDepartmentDetails"
    //         }
    //     },
    // )

    // اینجا میاد و دپارتمان ها رو میگیره ولی خب اگه دپارتمان ها خالی باشه چی. نتایج فیلتر میشه و غیب میشه!!
    // myPipLine.push({$unwind: "$z_assignedToDepartmentDetails"})
    // پس ما میایم و اینکارو میکنیم که فیلتر میزاریم که اگه خالی بود بی خیالش شو و کلا از لیست فیلتر حذفش کن
    // myPipLine.push(
    //     {
    //         $unwind: {
    //             path: "$z_assignedToDepartmentDetails",
    //             preserveNullAndEmptyArrays: true
    //         }
    //     },
    // )


    // بریم توی تیکت هم بگردیم ببینیم چ خبره

    // myPipLine.push(
    //     {
    //         $lookup: {
    //             from: "tickets",
    //             localField: "ticketId",
    //             foreignField: "_id",
    //             as: "z_ticketDetails"
    //         }
    //     }
    // )
    // myPipLine.push(
    //     {
    //         $unwind: {
    //             path: "$z_ticketDetails",
    //         }
    //     },
    // )


    // myPipLine.push(
    //     {
    //         $lookup: {
    //             from: "users",
    //             localField: "z_ticketDetails.userId", // فرستنده پیام هست
    //             foreignField: "_id",
    //             as: "z_ticketUserIdDetails"
    //         }
    //     },
    // )

    // myPipLine.push(
    //     {
    //         $unwind: {
    //             path: "$z_ticketUserIdDetails",
    //         }
    //     },
    // )


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

    //
    myPipLine.push(
        {
            $project: {
                // _id: "$ticketId", // id of ticket assignment
                userPhoneNumber: {
                    $concat: [
                        {$ifNull: ["$z_userCreateThisOrder.phoneNumber", ""]}, " ",
                    ]
                },
                userCreateThisOrder: {
                    $concat: [
                        {$ifNull: ["$z_userCreateThisOrder.name", ""]}, " ",
                        {$ifNull: ["$z_userCreateThisOrder.familyName", ""]}, " ",
                        {$ifNull: ["$z_userCreateThisOrder.phoneNumber", ""]}, " ",
                        {$ifNull: ["$z_userCreateThisOrder.city", ""]}, " ",
                        {$ifNull: ["$z_userCreateThisOrder.province", ""]}
                    ]
                },
                assignedToDepartmentIdText: "$z_assignedToDepartmentDetails.name",
                assignToUserIdText: {
                    $concat: [
                        {$ifNull: ["$z_assignedToUserDetails.name", ""]}, " ",
                        {$ifNull: ["$z_assignedToUserDetails.familyName", ""]}
                    ]
                },
                lastChangeTimeStamp: "$z_ticketDetails.lastChangeTimeStamp",

                numberOfAttachments: {$size: {$ifNull: ["$z_ticketDetails.attachments", []]}},


                assignedToUserIdText: {
                    $concat: [
                        {$ifNull: ["$z_assignedToUserDetails.name", ""]}, " ",
                        {$ifNull: ["$z_assignedToUserDetails.familyName", ""]}
                    ]
                },
                isDeleteDestination: 1,
                assignedByText: {
                    $concat: [
                        {$ifNull: ["$z_assignedByDetails.name", ""]}, " ",
                        {$ifNull: ["$z_assignedByDetails.familyName", ""]}
                    ]
                },

                _id: 1,
                firstUserId: 1,
                ticketNumber: 1,
                title: 1,
                description: 1,
                priority: 1,
                status: 1,
                createAt: 1,
                dateCreate:"$createAt",
                // فرانت صرفا فقط  رید استاتوس رو میبینه همین!
                // readStatus: { $ifNull: ["$organizationReadStatus", "-"] }

            }

        },
    )
    // console.log(matchConditions)
    if (matchConditions.length > 0) {
        myPipLine.push({
            $match: {
                $and: matchConditions
            }
        },)
    }


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
                        $skip: (page - 1) * pageSize
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

    debugger
    return myPipLine
}
