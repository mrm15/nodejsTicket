import mongoose, {Document, Schema} from 'mongoose';

// Define the TicketReply document interface
interface ITicketReply extends Document {
    ticketId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    departmentId: mongoose.Schema.Types.ObjectId;
    description: string;
    replyDate: Date;
    attachments?: mongoose.Schema.Types.ObjectId[]; // Assuming attachments are an array of string URLs
    visibleToUser: boolean;
    billNumber: string | null;
    billStatus: number | null; // (0=> draft )   (1=> verify)
    createAt: Date;
    updateAt: Date;
}

// Define the TicketReply schema
const ticketReplySchema: Schema<ITicketReply> = new mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket', // Reference to the Ticket collection
        required: true,
        index: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User collection
        required: true,
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department', // Reference to the  Department
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    replyDate: {
        type: Date,
        default: Date.now,
    },
    attachments: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        required: false,
    },
    visibleToUser: {
        type: Boolean,
        required: true,
    },
    billNumber: {
        type: String || null,
        required: false,
        default: "",
    },
    billStatus: {
        type: Number || null,
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

// Export the TicketReply model
const TicketReply = mongoose.model<ITicketReply>('TicketReply', ticketReplySchema);
export {TicketReply, ITicketReply};