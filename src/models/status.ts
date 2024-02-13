import mongoose, { Document, Schema } from 'mongoose';

// Define the Status document interface
interface IStatus extends Document {
    name: string;
    description: string;
    colorCode: string;
    isActive: boolean;
    order: number;
    isFinal: boolean;
    userId: mongoose.Schema.Types.ObjectId;
    createAt: Date;
    updateAt: Date;
}

// Define the Status schema
const statusSchema: Schema<IStatus> = new mongoose.Schema({

    name: {
        type: String,
        required: true,
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
        default:true,
    },
    order: {
        type: Number,
        required: true,
    },
    isFinal: {
        type: Boolean,
        required: true,
        default:false,
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

// Export the Status model
export default mongoose.model<IStatus>('Status', statusSchema);
