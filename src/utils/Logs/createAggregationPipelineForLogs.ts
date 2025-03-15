import {PipelineStage} from "mongoose";


interface ICreateAggregationPipelineForTickets {
    matchConditions: any[],
    page: number,
    pageSize: number
}


// Define the pipeline stages
export const createAggregationPipelineForLogs = ({
                                                        matchConditions,
                                                        page,
                                                        pageSize
                                                    }: ICreateAggregationPipelineForTickets): PipelineStage[] => {


    let myPipLine = []


    myPipLine.unshift({
        $sort: {_id: -1 as 1 | -1} // Explicitly type the sort direction as `1 | -1`
    });

    ///////////////////////////////////////////
    // در این مرحله ما  میایم مقدار یوزر آیدی رو باز میکنیم و اگه نال بود هم که هیچی مقدار یوزر آیدی در واقع اون کاربرایی هستن که خودشون سفارش رو ثبت کردن
    // پس ما اینجا اسمشو میزاریم
    // z_userCreateThisOrderData
    ///////////////////////////////////////////
    // myPipLine.push(
    //     {
    //         $lookup: {
    //             from: "users",
    //             localField: "userId",
    //             foreignField: "_id",
    //             as: "z_userCreateThisOrderData"
    //         }
    //     },
    // )

    // myPipLine.push(
    //     {
    //         $unwind: {
    //             path: "$z_userCreateThisOrderData",
    //             preserveNullAndEmptyArrays: true
    //         }
    //     },
    // )

    ///////////////////////////////////////////
    // در این مرحله ما مقدار اولین دپارتمانی که تیکت بهش ارجاع شده رو میخوایم ببینیم و این در صورتی هست که کاربر به شخص ارسال نکرده باشه و فقط به دپارتمان ارسال کرده باشه
    // پس ما اینجا اسمشو میزاریم
    // z_firstDepartmentIdData
    ///////////////////////////////////////////
    // myPipLine.push(
    //     {
    //         $lookup: {
    //             from: "Departments",
    //             localField: "firstDepartmentId",
    //             foreignField: "_id",
    //             as: "z_firstDepartmentIdData"
    //         }
    //     },
    // )

    // myPipLine.push(
    //     {
    //         $unwind: {
    //             path: "$z_firstDepartmentIdData",
    //             preserveNullAndEmptyArrays: true
    //         }
    //     },
    // )

    ///////////////////////////////////////////
    // در این مرحله ما میایم و اطلاعات اولین کاربری که بهش ارجاع شده رو میاریم
    // پس ما اینجا اسمشو میزاریم
    // z_firstUserIdData
    ///////////////////////////////////////////
    // myPipLine.push(
    //     {
    //         $lookup: {
    //             from: "users",
    //             localField: "firstUserId",
    //             foreignField: "_id",
    //             as: "z_firstUserIdData"
    //         }
    //     },
    // )

    // myPipLine.push(
    //     {
    //         $unwind: {
    //             path: "$z_firstUserIdData",
    //             preserveNullAndEmptyArrays: true
    //         }
    //     },
    // )

    ///////////////////////////////////////////
    // در این مرحله ما میایم و اطلاعات آخرین دپارتمانی که بهش ارجاع شده رو میاریم
    // پس ما اینجا اسمشو میزاریم
    // lastAssignedDepartmentId
    ///////////////////////////////////////////
    // myPipLine.push(
    //     {
    //         $lookup: {
    //             from: "departments",
    //             localField: "lastAssignedDepartmentId",
    //             foreignField: "_id",
    //             as: "z_lastAssignedDepartmentIdData"
    //         }
    //     },
    // )

    // myPipLine.push(
    //     {
    //         $unwind: {
    //             path: "$z_lastAssignedDepartmentIdData",
    //             preserveNullAndEmptyArrays: true
    //         }
    //     },
    // )

    ///////////////////////////////////////////
    // در این مرحله ما میایم و اطلاعات آخرین کاربری که بهش ارجاع شده رو میاریم
    // پس ما اینجا اسمشو میزاریم
    // z_lastAssignedUserIdData
    ///////////////////////////////////////////
    // myPipLine.push(
    //     {
    //         $lookup: {
    //             from: "users",
    //             localField: "lastAssignedUserId",
    //             foreignField: "_id",
    //             as: "z_lastAssignedUserIdData"
    //         }
    //     },
    // )

    // myPipLine.push(
    //     {
    //         $unwind: {
    //             path: "$z_lastAssignedUserIdData",
    //             preserveNullAndEmptyArrays: true
    //         }
    //     },
    // )
    ///////////////////////////////////////////
    // در این مرحله ما میایم و اطلاعات آخرین وضعیتی که ست شده رو میاریم
    // پس ما اینجا اسمشو میزاریم
    // z_statusIdData
    ///////////////////////////////////////////
    // myPipLine.push(
    //     {
    //         $lookup: {
    //             from: "status",
    //             localField: "statusId",
    //             foreignField: "_id",
    //             as: "z_statusIdData"
    //         }
    //     },
    // )

    // myPipLine.push(
    //     {
    //         $unwind: {
    //             path: "$z_statusIdData",
    //             preserveNullAndEmptyArrays: true
    //         }
    //     },
    // )

    ////////////////////////


    // خب حالا که چیزایی که لازم داشتیم رو ریختیم روی آبجکت هایی که میخواستیم حالا وقتشه که از توی اون آبجکت ها
    // درشون بیاریم و  توی کلیدی که لازم داریم بریزیم تا دیتا خلاصه تر و کوتاه تر بشه
    // و ما هم بتونیم کوتاه و خلاصه سمت فرانت بفرستیم


    // توی این مرحله ما میایم و مقدار
    // کاربری که این تیکت رو ایجاد کرده رو میریزیم توی چیزی که میخوایم

    // myPipLine.push(
    //     {
    //         $project: {
    //             rowNumber: "",
    //             _id:1,
    //             id:1,
    //             ticketNumber:1,
    //             userId:1,
    //             title:1,
    //             description:1,
    //             priority:1,
    //             statusId:1,
    //             firstDepartmentId:1,
    //             firstUserId:1,
    //             lastAssignedDepartmentId:1,
    //             lastAssignedUserId:1,
    //             attachments:1,
    //             lastChangeTimeStamp:1,
    //             billNumber:1,
    //             billStatus:1,
    //             organizationReadStatus:1,
    //             customerReadStatus:1,
    //             createAt:1,
    //             updateAt:1,
    //             userCreateThisOrder: {
    //                 $concat: [
    //                     { $ifNull: ["$z_userCreateThisOrderData.name", ""] }, " ",
    //                     { $ifNull: ["$z_userCreateThisOrderData.familyName", ""] }, " ",
    //                     { $ifNull: ["$z_userCreateThisOrderData.phoneNumber", ""] }, " ",
    //                     { $ifNull: ["$z_userCreateThisOrderData.city", ""] }, " ",
    //                     { $ifNull: ["$z_userCreateThisOrderData.province", ""] }
    //                 ]
    //             },
    //
    //             firstDepartmentName: "$z_firstDepartmentIdData.name",
    //             firstUserName: {
    //                 $concat: [
    //                     { $ifNull: ["$z_firstUserIdData.name", ""] }, " ",
    //                     { $ifNull: ["$z_firstUserIdData.familyName", ""] }, " ",
    //                 ]
    //             },
    //             lastAssignedDepartmentName: {
    //                 $concat: [
    //                     { $ifNull: ["$z_lastAssignedDepartmentIdData.name", ""] }, " ",
    //                     // { $ifNull: ["$z_firstUserIdData.familyName", ""] }, " ",
    //                 ]
    //             },
    //             // lastAssignedDepartmentName:  { $ifNull: ["$z_lastAssignedDepartmentIdData.description", "Undefined"] },
    //             lastAssignedUserName:{ $ifNull: ["$z_lastAssignedUserIdData.name", "Undefined"] },
    //             statusName: { $ifNull: ["$z_statusIdData.name", "Undefined"] }, // Handle undefined case
    //             numberOfAttachments: { $size: { $ifNull: ["$attachments", []] } },
    //
    //
    //         }
    //
    //     },
    // )

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
