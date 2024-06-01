import mongoose, {Schema, Document} from 'mongoose';
import {v4 as uuidV4} from 'uuid';
import {IDepartment} from "./department";


interface IsmsPending extends Document {
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
const SmsPending = mongoose.model<IsmsPending>('SmsPending', SmsPendingSchema);

SmsPendingSchema.virtual('id').get(function (this: IDepartment) {
    return this._id.toHexString();
});

// Ensure virtual fields are serialized
SmsPendingSchema.set('toJSON', {
    virtuals: true
});

export {SmsPending, IsmsPending};
