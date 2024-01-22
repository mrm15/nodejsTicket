import mongoose, { Document, Schema } from 'mongoose';

// Define the Task document interface
interface ITask extends Document {
    title: string;
    description: string;
    createdBy: mongoose.Schema.Types.ObjectId;
    taskStatus: string;
    priority: string;
    tag: string;
    attachments: string[]; // Assuming attachments are an array of string URLs
    visibleToUser: boolean;
    createAt: Date;
    updateAt: Date;
}

// Define the Task schema
const taskSchema: Schema<ITask> = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User collection
        required: true,
    },
    taskStatus: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    tag: String, // An array of tags
    attachments: [String], // Optional array of attachments
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

// Export the Task model
export default mongoose.model<ITask>('Task', taskSchema);
