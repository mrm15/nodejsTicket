import {PipelineStage} from "mongoose";

interface ICreateAggregationPipeline {
    matchConditions: any[],
    page: number,
    pageSize: number
}


// Define the pipeline stages
export const createAggregationPipeline = ({
                                              matchConditions,
                                              page,
                                              pageSize
                                          }: ICreateAggregationPipeline): PipelineStage[] => {


    let myPipLine = []



    // اول میخوایم که توی خود تیکت اساینمنت بره این دو مورد رو تبدیل کنه
    //assignedToUserId
    //assignedBy

    myPipLine.unshift({
        $sort: { _id: -1 as 1 | -1 } // Explicitly type the sort direction as `1 | -1`
    });
    //assignedToUserId
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
            $unwind: {
                path: "$z_assignedToUserDetails",
                preserveNullAndEmptyArrays: true
            }
        },
    )

    //assignedBy
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
    myPipLine.push(
        {
            $unwind: {
                path: "$z_assignedByDetails",
                preserveNullAndEmptyArrays: true
            }
        },
    )

    // Lookup for assignedToDepartmentId from departments
    myPipLine.push(
        {
            $lookup: {
                from: "departments",
                localField: "assignedToDepartmentId",
                foreignField: "_id",
                as: "z_assignedToDepartmentDetails"
            }
        },
    )

    // اینجا میاد و دپارتمان ها رو میگیره ولی خب اگه دپارتمان ها خالی باشه چی. نتایج فیلتر میشه و غیب میشه!!
    // myPipLine.push({$unwind: "$z_assignedToDepartmentDetails"})
    // پس ما میایم و اینکارو میکنیم که فیلتر میزاریم که اگه خالی بود بی خیالش شو و کلا از لیست فیلتر حذفش کن
    myPipLine.push(
        {
            $unwind: {
                path: "$z_assignedToDepartmentDetails",
                preserveNullAndEmptyArrays: true
            }
        },
    )


    // بریم توی تیکت هم بگردیم ببینیم چ خبره

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
    myPipLine.push(
        {
            $unwind: {
                path: "$z_ticketDetails",
                preserveNullAndEmptyArrays: true
            }
        },
    )

    myPipLine.push(
        {
            $lookup: {
                from: "status",
                localField: "z_ticketDetails.statusId",
                foreignField: "_id",
                as: "z_statusIdData"
            }
        },
    )

    myPipLine.push(
        {
            $unwind: {
                path: "$z_statusIdData",
                preserveNullAndEmptyArrays: true
            }
        },
    )


    myPipLine.push(
        {
            $lookup: {
                from: "users",
                localField: "z_ticketDetails.userId", // فرستنده پیام هست
                foreignField: "_id",
                as: "z_ticketUserIdDetails"
            }
        },
    )

    myPipLine.push(
        {
            $unwind: {
                path: "$z_ticketUserIdDetails",
            }
        },
    )


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
                _id: "$ticketId", // id of ticket assignment
                ticketAssignedId: "$_id",
                rowNumber: "",

                title: "$z_ticketDetails.title", // عنوان تیکت - عنوان سفارش
                userCreateThisOrder: {
                    $concat: [
                        { $ifNull: ["$z_ticketUserIdDetails.name", ""] }, " ",
                        { $ifNull: ["$z_ticketUserIdDetails.familyName", ""] }, " ",
                        { $ifNull: ["$z_ticketUserIdDetails.phoneNumber", ""] }, " ",
                        { $ifNull: ["$z_ticketUserIdDetails.city", ""] }, " ",
                        { $ifNull: ["$z_ticketUserIdDetails.province", ""] }
                    ]
                },
                ticketNumber: "$z_ticketDetails.ticketNumber",
                assignedToDepartmentIdText: "$z_assignedToDepartmentDetails.name",
                assignToUserIdText: {
                    $concat: [
                        { $ifNull: ["$z_assignedToUserDetails.name", ""] }, " ",
                        { $ifNull: ["$z_assignedToUserDetails.familyName", ""] }
                    ]
                },
                dateCreate: "$z_ticketDetails.createAt",
                lastChangeTimeStamp: "$z_ticketDetails.lastChangeTimeStamp",
                priority: "$z_ticketDetails.priority",

                statusName: { $ifNull: ["$z_statusIdData.name", "Undefined"] }, // Handle undefined case
                numberOfAttachments: { $size: { $ifNull: ["$z_ticketDetails.attachments", []] } },

                description: "$z_ticketDetails.description",

                assignedToUserIdText: {
                    $concat: [
                        { $ifNull: ["$z_assignedToUserDetails.name", ""] }, " ",
                        { $ifNull: ["$z_assignedToUserDetails.familyName", ""] }
                    ]
                },
                isDeleteDestination: 1,
                assignedByText: {
                    $concat: [
                        { $ifNull: ["$z_assignedByDetails.name", ""] }, " ",
                        { $ifNull: ["$z_assignedByDetails.familyName", ""] }
                    ]
                },
                isDeleteFromAssignedBy: 1,
                readStatus: 1,
                readDate: 1,
                numberOfAssign: 1,
                assignmentType: 1,
                assignDate: 1
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


    return myPipLine
}
