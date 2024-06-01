import mongoose, {Schema, Document} from 'mongoose';
import {v4 as uuidV4} from 'uuid';


interface IsmsArchive extends Document {
    [key: string]: any;
    senderUserId: mongoose.Types.ObjectId;
    senderDepartmentId?: mongoose.Schema.Types.ObjectId | null;//
    sendTimeStamp: Date| null;
    counter:number;
    text: string;
    destinationNumber: string;
    status: String;
    replyId: mongoose.Types.ObjectId| null;
    createAt: Date;
    updateAt: Date;
}

// Create the User schema
const SmsArchiveSchema: Schema<IsmsArchive> = new Schema<IsmsArchive>({



    senderUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User',

    },
    senderDepartmentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Department',
    },

    sendTimeStamp: {
        type: Date || null,
        required: false,
    },
    counter:{
        type: Number,
        required: false,
    },
    text: {
        type: String,
        required: true,
    },
    destinationNumber: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    replyId: {
        type: mongoose.Schema.Types.ObjectId || null,
        required: false,
        ref:'TicketReply',
    },

    createAt: {
        type: Date,
        default: Date.now,

    },
    updateAt: {
        type: Date,
        default: Date.now
    },

});


// Ensure virtual fields are serialized


// Create and export the User model
const SmsArchive = mongoose.model<IsmsArchive>('SmsArchive', SmsArchiveSchema);

export {SmsArchive, IsmsArchive};
