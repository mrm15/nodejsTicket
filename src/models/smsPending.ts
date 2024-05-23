import mongoose, {Schema, Document} from 'mongoose';
import {v4 as uuidV4} from 'uuid';


interface IsmsPending extends Document {
    [key: string]: any;
    senderUserId: mongoose.Types.ObjectId;
    senderDepartmentId?: mongoose.Schema.Types.ObjectId | null;//
    sendTimeStamp: Date;
    text: string;
    status: string;
    replyId: mongoose.Types.ObjectId| null;
    createAt: Date;
    updateAt: Date;
}

// Create the User schema
const SmsPendingSchema: Schema<IsmsPending> = new Schema<IsmsPending>({
    //
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: false,
    //     default: "",
    //
    // },

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
const SmsPending = mongoose.model<IsmsPending>('SmsPending', SmsPendingSchema);

export {SmsPending, IsmsPending};
