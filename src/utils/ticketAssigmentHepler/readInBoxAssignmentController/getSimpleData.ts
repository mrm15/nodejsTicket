import {PipelineStage} from "mongoose";
import {TicketAssignment} from "../../../models/ticketAssignment ";

const getSimpleData = async ({
                                 assignedToUserId,
                                 filters,
                                 page,
                                 pageSize,
                             }: any) => {



    const myPipline: PipelineStage[] = [
        // 1. Match the conditions in 'ticketAssignment' first
        {
            $match: {
                $and: [
                    {assignedToUserId: assignedToUserId},
                    {isDeleteFromAssignedBy: false}, // Only assignments that are not deleted
                    {readStatus: false} // Only unread assignments
                ]
            }
        },
        // 2. Lookup (join) with the 'tickets' collection to get ticket details
        {
            $lookup: {
                from: "tickets", // Collection to join with
                localField: "ticketId", // Field from 'ticketAssignment' (assuming you have a ticketId)
                foreignField: "_id", // Field from 'tickets' (assuming _id is used)
                as: "ticketDetails" // Output field
            }
        },
        // 3. Unwind the array created by the $lookup
        {$unwind: "$ticketDetails"},
        // 4. Project to flatten the fields from ticketDetails to root level
        {
            $project: {
                _id: 1, // Keep the _id of ticketAssignment
                readStatus: 1, // Keep readStatus at root level
                isDeleteFromAssignedBy: 1, // Keep isDeleteFromAssignedBy at root level
                // Add any other fields you want to flatten
                assignedToUserId: 1,
                assignedToDepartmentId: 1,
                isDeleteDestination: 1,
                assignedBy: 1,
                readDate: 1,
                numberOfAssign: 1,
                assignmentType: 1,
                title: "$ticketDetails.title", // Move title from ticketDetails to root level
                ticketNumber: "$ticketDetails.ticketNumber", // Move ticketNumber from ticketDetails to root level
                description: "$ticketDetails.description",
            }
        }




        // I need to count totalDocuments
        // currentPage
        // pageSize
        // results
        // totalDocuments


        // Pagination stages
        // { $skip: skip },
        // { $limit: limit }


    ];


    const result = await TicketAssignment.aggregate(myPipline)


    //console.log(result)
    return result

}
export default getSimpleData