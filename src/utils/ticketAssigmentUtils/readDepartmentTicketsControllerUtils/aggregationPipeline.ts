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

                _id: "$ticketId",// id  of ticket assignment
                ticketAssignedId :  "$_id",
                rowNumber: "",//  میخوام اینو دستی اضافه کنم ببینم میشه؟ اگه نشد توی خط بعدش حساب میکنم

                title: "$z_ticketDetails.title", // عنوان تیکت - عنوان سفارش
                userCreateThisOrder: //"$z_ticketUserIdDetails.name",//
                    {
                        $concat: ["$z_ticketUserIdDetails.name", " ", "$z_ticketUserIdDetails.familyName", " ", "$z_ticketUserIdDetails.phoneNumber"]

                    },
                ticketNumber: "$z_ticketDetails.ticketNumber",
                assignedToDepartmentIdText: "$z_assignedToDepartmentDetails.name", // از توی تیکت اساین
                assignToUserIdText: { // از توی تیکت اساین
                    $concat: ["$z_assignedToUserDetails.name", " ", "$z_assignedToUserDetails.familyName" /*, "$z_assignedToUserDetails.phoneNumber" */]
                },
                dateCreate: "$z_ticketDetails.createAt", // تاریخ ثبت سفارش
                lastChangeTimeStamp: "$z_ticketDetails.lastChangeTimeStamp", // تارخ آخرین تغییر
                priority: "$z_ticketDetails.priority", // الویت تیکت

                statusText: "در حال کار", // وضعیت تیکت
                numberOfAttachments: "$z_ticketDetails.attachments.length", // تعداد فایل ضمیمه

                description: "$z_ticketDetails.description", // توضیحات تیکت

                // این آیتم تکراریه ولی میاریم شاید
                assignedToUserIdText: { // از توی تیکت اساین // کاربری که این تیکت الان بهش ارجاع شده
                    $concat: ["$z_assignedToUserDetails.name", " ", "$z_assignedToUserDetails.familyName" /*, "$z_assignedToUserDetails.phoneNumber" */]
                },
                // assignedToDepartmentIdText:"", // دپارتمانی که این تیکت الان بهش ارجاع شده
                isDeleteDestination: 1, // آیا مقصد دپارتمان یا کاربر  اینو پاک کرده؟
                assignedByText: //  "$z_assignedByDetails.name", // فرستنده ی این تیکت کیه؟
                    {
                        $concat: ["$z_assignedByDetails.name", " ", "$z_assignedByDetails.familyName" /*, "$z_assignedToUserDetails.phoneNumber" */]
                    },
                isDeleteFromAssignedBy: 1, // فرستنده اینو پاک کرده؟
                readStatus: 1, //وضعیت خواندن توی مقصد (دپارتمان یا کاربر)
                readDate: 1, //تاریخ باز کردن تیکت
                numberOfAssign: 1, //تعداد ارجاع
                assignmentType: 1, //نوع ارجاع
                assignDate: 1,


                //
                // assignedToUserId: 1,
                // assignedBy: 1,
                // assignedToDepartmentId: 1,
                // ticketId: 1,
                //
                // // User details
                // assignedToUserName: "$z_assignedToUserDetails.name",
                // assignedByName: "$z_assignedByDetails.name",
                // assignedToDepartmentName: "$z_assignedToDepartmentDetails?.name",
                //
                // // Ticket details
                // ticketNumber: "$ticketDetails.ticketNumber",
                // ticketUserName: "$ticketUserDetails.name",
                // ticketAssignedToUserName: "$ticketAssignedToUserDetails.name",
                // ticketAssignedToDepartmentName: "$ticketAssignedDepartmentDetails.name"
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
