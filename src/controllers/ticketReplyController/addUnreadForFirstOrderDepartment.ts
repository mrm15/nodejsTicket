import { AdminSettings, IAdminSettings } from "../../models/adminSettings";
import { ObjectId } from "mongoose";
import {ITicketAssignment, TicketAssignment} from "../../models/ticketAssignment ";

export const addUnreadForFirstOrderDepartment = async ({
                                                           senderDepartmentId,
                                                           senderUserId,
                                                           ticketFoundId,
                                                           assignedToUserId,
                                                           assignedToDepartmentId,
                                                       }: {
    senderDepartmentId: ObjectId;
    senderUserId: ObjectId;
    ticketFoundId: ObjectId;
    assignedToUserId: ObjectId|null;
    assignedToDepartmentId: ObjectId|null;
}) => {
    try {
        // Fetch admin settings and extract customer department ID
        const adminSettings: IAdminSettings | null = await AdminSettings.findOne({}).lean();
        if (!adminSettings || !adminSettings.customerDepartment) return false; // Early exit if admin settings or customer department is not found

        const customerDepartmentId = adminSettings.customerDepartment;

        // Proceed only if the sender department matches the customer department
        if (senderDepartmentId.toString() === customerDepartmentId.toString()) {
            // Check if there is an existing assignment
            const existingAssignment: ITicketAssignment | null = await TicketAssignment.findOne({
                ticketId: ticketFoundId,
                assignedBy: senderUserId,
                assignedToUserId,
                assignedToDepartmentId,
            }).lean();

            if (existingAssignment) {
                // Update the existing assignment
                await TicketAssignment.findOneAndUpdate(
                    { _id: existingAssignment._id },
                    {
                        $set: {
                            isDeleteDestination: false,
                            isDeleteFromAssignedBy: false,
                            readStatus: false, // Mark as unread
                            updatedAt: new Date(), // Update the timestamp
                        },
                    }
                );
            }
        }

        return true;
    } catch (error) {
        console.error("Error in addUnreadForFirstOrderDepartment:", error);
        throw error;
    }
};