import mongoose, { Document, Schema } from 'mongoose';
import {Counter} from "./counterSchema";
//

async function getNextSequenceValue(sequenceName: string): Promise<number> {
    const counterDocument = await Counter.findByIdAndUpdate(
        sequenceName,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return counterDocument.seq;
}




// Define the Ticket document interface
interface ITicket extends Document {
     // ticketId: string;
    ticketNumber:number
    userId: mongoose.Schema.Types.ObjectId;
    title: string;
    description: string;
    priority: string;
    status: string;
    assignedToDepartmentId: mongoose.Schema.Types.ObjectId;
    assignToUserId: mongoose.Schema.Types.ObjectId;
    attachments: string[]; // Assuming attachments are an array of string URLs
    lastChangeTimeStamp: Date;
    returnStatus: boolean;
    returnUserId: mongoose.Schema.Types.ObjectId;
    returnTime: string;
    createAt: Date;
    updateAt: Date;
}

// Define the Ticket schema
const ticketSchema: Schema<ITicket> = new mongoose.Schema({
    // ticketId: {
    //     type: String,
    //     required: true,
    // },
    ticketNumber:{
        type:Number,
        required:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User collection
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    assignedToDepartmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department', // Reference to the Department collection
        required: true,
    },
    assignToUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User collection
        required: true,
    },
    attachments: [String],
    lastChangeTimeStamp: {
        type: Date,
        default: Date.now,
    },
    returnStatus: {
        type: Boolean,
        required: false,
    },
    returnUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User collection
        required: false,
    },
    returnTime: {
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

// Export the Ticket model
export default mongoose.model<ITicket>('Ticket', ticketSchema);

ticketSchema.pre('save', async function (next) {
    if (this.isNew) {
        const seqValue = await getNextSequenceValue('ticket');
        this.id = seqValue; // Assuming 'id' is your auto-incrementing field
    }
    next();
});