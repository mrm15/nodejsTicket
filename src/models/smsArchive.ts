import mongoose, {Schema, Document} from 'mongoose';
import {v4 as uuidV4} from 'uuid';


interface IsmsArchive extends Document {
    [key: string]: any;

    _id: mongoose.Types.ObjectId;
    senderUserId: mongoose.Types.ObjectId;
    senderDepartmentId?: mongoose.Schema.Types.ObjectId | null;//
    sendTimeStamp: Date;
    text: string;
    status: string;
    replyId: mongoose.Types.ObjectId | null;
    createAt: Date;
    updateAt: Date;
}

// Create the User schema
const SmsArchiveSchema: Schema<IsmsArchive> = new Schema<IsmsArchive>({

    _id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },

    senderUserId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',

    },
    senderDepartmentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Department',


    },
    sendTimeStamp: {
        type: Date,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    replyId: {
        type: Date,
        required: true,
        ref: 'TicketReply',
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
