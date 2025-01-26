import {Status} from "../../../models/status";
import {Ticket} from "../../../models/ticket";
import {ChangeStatusHistory} from "../../../models/ChangeTicketStatusHistory";
import {getCurrentTimeStamp} from "../../timing";


export const changeTicketStatus = async ({
                                             userId,
                                             ticketIdArray,
                                             newStatusId,
                                         }: {
    userId:string,
    ticketIdArray: string[];
    newStatusId: string;
}): Promise<{ success: boolean; message: string; updatedCount?: number ,newStatus?:string }> => {
    try {
        // Validate newStatusId
        const statusExists = await Status.findById(newStatusId);
        if (!statusExists) {
            return { success: false, message: "Invalid status ID" };
        }

        // Update the tickets
        const result = await Ticket.updateMany(
            { _id: { $in: ticketIdArray } },
            { statusId: newStatusId, lastChangeTimeStamp: new Date() }
        );
        // Prepare bulk history records
        const historyRecords = ticketIdArray.map(ticketId => ({
            userId,
            ticketId,
            newStatusId,
            timestamp:getCurrentTimeStamp()
        }));

        // Insert records in bulk
        await ChangeStatusHistory.insertMany(historyRecords);

        return {
            success: true,
            newStatus:statusExists?.name,
            message: "وضعیت سفارش تغییر کرد.",
            updatedCount: result.modifiedCount,
        };
    } catch (error) {
        console.error("Error updating ticket statuses:", error);
        return { success: false, message: "An error occurred while updating statuses" };
    }
};
