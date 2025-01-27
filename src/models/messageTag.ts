import mongoose, {Document, Schema} from 'mongoose';
import {IDepartment} from "./department";

// Define the Status document interface
interface IMessageTag extends Document {
    name: string;
    messageTagCode: string;
    description: string;
    colorCode: string;
    isActive: boolean;
    userId: mongoose.Schema.Types.ObjectId;
    createAt: Date;
    updateAt: Date;
}

// Define the Status schema
const messageTagSchema: Schema<IMessageTag> = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    // like 5173 I want to put numbers here and order them  if later add new item I need to  put between them
    messageTagCode: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
    },
    colorCode: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User collection, change if different
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

// Create a virtual 'id' property


// statusSchema.virtual('id').get(function (this: IStatus) {
//     return this._id.toHexString();
// });

// Ensure virtual fields are serialized
messageTagSchema.set('toJSON', {
    virtuals: true
});
// Export the Status model
const messageTag = mongoose.model<IMessageTag>('messageTag', messageTagSchema);

export {messageTag, IMessageTag};
