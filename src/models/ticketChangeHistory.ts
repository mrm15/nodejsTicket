import mongoose, { Document, Schema } from 'mongoose';

// Define the TicketChangeHistory document interface
interface ITicketChangeHistory extends Document {
    // changeId: string;
    ticketId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    changeTimestamp: Date;
    ipAddress: string;
    deviceInfo: string;
    location: string;
    fieldName: string;
    oldValue: string;
    newValue: string;
    createAt: Date;
    updateAt: Date;
}

// Define the TicketChangeHistory schema
const ticketChangeHistorySchema: Schema<ITicketChangeHistory> = new mongoose.Schema({
    // changeId: {
    //     type: String,
    //     required: true,
    //     unique: true, // Assuming changeId should be unique
    // },
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket', // Reference to the Ticket collection
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User collection
        required: true,
    },
    changeTimestamp: {
        type: Date,
        default: Date.now,
    },
    ipAddress: {
        type: String,
        required: false,
    },
    deviceInfo: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: false,
    },
    fieldName: {
        type: String,
        required: true,
    },
    oldValue: {
        type: String,
        required: false,
    },
    newValue: {
        type: String,
        required: false,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    },
});

// Export the TicketChangeHistory model
export default mongoose.model<ITicketChangeHistory>('TicketChangeHistory', ticketChangeHistorySchema);
