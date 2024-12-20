import mongoose, {Document, Schema} from 'mongoose';
import {Counter} from "./counterSchema";

//

export async function getNextSequenceValue(sequenceName: string): Promise<number> {
    const counterDocument = await Counter.findByIdAndUpdate(
        sequenceName,
        {$inc: {seq: 1}},
        {new: true, upsert: true}
    );
    return counterDocument.seq;
}


// Define the Ticket document interface
interface ITicket extends Document {
    ticketFound: mongoose.Types.ObjectId;
    // ticketId: string;
    ticketNumber: number;
    userId: mongoose.Schema.Types.ObjectId;
    title: string;
    description: string;
    priority: string;
    status: string;
    firstDepartmentId: mongoose.Schema.Types.ObjectId;
    firstUserId: mongoose.Schema.Types.ObjectId | null;
    attachments: mongoose.Schema.Types.ObjectId[]; // Assuming attachments are an array of string URLs
    lastChangeTimeStamp: Date;
    returnStatus: boolean;
    returnUserId: mongoose.Schema.Types.ObjectId;
    returnTime: string;
    billNumber: string | null;
    billStatus: number | null; // (0=> draft )   (1=> verify)
    organizationReadStatus:boolean;
    customerReadStatus:boolean;
    createAt: Date;
    updateAt: Date;
}

// Define the Ticket schema
const ticketSchema: Schema<ITicket> = new mongoose.Schema({
    // ticketId: {
    //     type: String,
    //     required: true,
    // },
    ticketNumber: {
        type: Number,

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
    firstDepartmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department', // Reference to the Department collection
        required: false,
    },
    firstUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User collection
        required: false,
    },
    attachments: [mongoose.Schema.Types.ObjectId],
    lastChangeTimeStamp: {
        type: Date,
        default: Date.now,
    },
    returnStatus: {
        type: Boolean,
        required: false,
    },
    organizationReadStatus: {type: Boolean,required: false,default:false},
    customerReadStatus: {type: Boolean,required: false,default:true},
    returnUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User collection
        required: false,
    },
    returnTime: {
        type: String,
        required: false,
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

// Export the Ticket model


ticketSchema.pre('save', async function (next) {
    if (this.isNew && !this.ticketNumber) {
        // console.log("Generating ticket number...");
        try {
            const seqValue = await getNextSequenceValue('ticketNumber');
            this.ticketNumber = seqValue; // Set the ticketNumber if it's not already set
            // console.log("Generated ticket number:", this.ticketNumber);
            next();
        } catch (error: any) {
            console.error("Error generating ticket number:", error);
            next(error); // Pass any errors to the next middleware
        }
    } else {
        // console.log("Ticket already has a number or is not new. Skipping generation.");
        next(); // If the  is already set or it's not a new document, proceed to the next middleware
    }
});


const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema);

export {Ticket, ITicket};