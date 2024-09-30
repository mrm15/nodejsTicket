import mongoose, { Document, Schema } from 'mongoose';

// Define the UserTickets document interface
interface IUserTickets extends Document {
    ticketId: mongoose.Schema.Types.ObjectId; // Reference to the Ticket
    userId: mongoose.Schema.Types.ObjectId; // Reference to the User assigned
    assignDate: Date; // Date when the ticket was assigned
    readTicket: boolean; // Indicates if the ticket has been read
    readDate: Date | null; // Date when the ticket was read
    numberOfAssign: number; // Number of times this ticket has been assigned to the user
    lastUpdated: Date; // Last update date for tracking changes
    createdAt: Date; // Timestamp of creation
    updatedAt: Date; // Timestamp of last update
}

// Define the UserTickets schema
const userTicketsSchema: Schema<IUserTickets> = new mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    assignDate: {
        type: Date,
        default: Date.now,
    },
    readTicket: {
        type: Boolean,
        default: false,
    },
    readDate: {
        type: Date,
        default: null,
    },
    numberOfAssign: {
        type: Number,
        default: 1,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Export the UserTickets model
const UserTickets = mongoose.model<IUserTickets>('UserTickets', userTicketsSchema);

export { UserTickets, IUserTickets };
