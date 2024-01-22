import mongoose, { Document, Schema } from 'mongoose';

// Define the TicketReply document interface
interface ITicketReply extends Document {
    ticketId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    message: string;
    replyDate: Date;
    attachments: string[]; // Assuming attachments are an array of string URLs
    visibleToUser: boolean;
    createAt: Date;
    updateAt: Date;
}

// Define the TicketReply schema
const ticketReplySchema: Schema<ITicketReply> = new mongoose.Schema({
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
    message: {
        type: String,
        required: true,
    },
    replyDate: {
        type: Date,
        default: Date.now,
    },
    attachments: [String], // An array of attachment URLs or identifiers
    visibleToUser: {
        type: Boolean,
        required: true,
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

// Export the TicketReply model
export default mongoose.model<ITicketReply>('TicketReply', ticketReplySchema);
