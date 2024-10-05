import mongoose, { Document, Schema } from 'mongoose';

// Define the TicketAssignment document interface
interface ITicketAssignment extends Document {
    ticketId: mongoose.Schema.Types.ObjectId;   // Reference to the Ticket being assigned
    assignedToUserId: mongoose.Schema.Types.ObjectId | null;  // Reference to the User assigned, null if assigned to department
    assignedToDepartmentId: mongoose.Schema.Types.ObjectId | null;  // Reference to the Department if assigned to a department
    assignedBy: mongoose.Schema.Types.ObjectId; // Reference to the Admin who performed the assignment
    assignDate: Date; // Date when the ticket was assigned
    readTicket: boolean; // Boolean to indicate if the ticket has been read
    readDate: Date | null; // Date when the ticket was read, null if unread
    numberOfAssign: number; // Number of times this ticket has been assigned to this user or department
    assignmentType: 'user' | 'department'; // Enum for whether it's assigned to a user or department
    status: 'unread' | 'read'; // Ticket read status (could be more statuses if required)
    createdAt: Date; // Timestamp of when this document was created
    updatedAt: Date; // Timestamp of the last update
    activityLog: Array<{ action: string; performedBy: mongoose.Schema.Types.ObjectId; timestamp: Date }>; // Log of actions on this ticket
}

// Define the TicketAssignment schema
const ticketAssignmentSchema: Schema<ITicketAssignment> = new mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true, // Ticket being assigned
    },
    assignedToUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null, // If assigned to a user
    },
    assignedToDepartmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        default: null, // If assigned to a department
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true, // The admin who assigned the ticket
    },
    assignDate: {
        type: Date,
        default: Date.now, // Timestamp of when the ticket was assigned
    },
    readTicket: {
        type: Boolean,
        default: false, // Has the ticket been read by the assignee?
    },
    readDate: {
        type: Date,
        default: null, // The date the ticket was read, null if unread
    },
    numberOfAssign: {
        type: Number,
        default: 1, // Tracks how many times the ticket has been reassigned
    },
    assignmentType: {
        type: String,
        enum: ['user', 'department'],
        required: true, // Indicates if assigned to a user or department
    },
    status: {
        type: String,
        enum: ['unread', 'read'],
        default: 'unread', // Tracks the read status of the ticket
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set when a document is created
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Automatically set when a document is updated
    },
    activityLog: [
        {
            action: {
                type: String,
                required: true, // Action performed (e.g., "assigned", "read")
            },
            performedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Admin', // Admin or user who performed the action
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now, // Timestamp of the action
            },
        },
    ],
});

// Export the TicketAssignment model
const TicketAssignment = mongoose.model<ITicketAssignment>('TicketAssignment', ticketAssignmentSchema);

export { TicketAssignment, ITicketAssignment };
