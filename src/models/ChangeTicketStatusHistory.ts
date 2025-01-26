import mongoose, { Schema, Document } from "mongoose";

interface IChangeStatusHistory extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    ticketId: mongoose.Schema.Types.ObjectId;
    newStatusId: mongoose.Schema.Types.ObjectId;
    timestamp: Date; // Custom timestamp field
    createdAt: Date; // Automatically managed
    updatedAt: Date; // Automatically managed
}

const changeStatusHistorySchema = new mongoose.Schema<IChangeStatusHistory>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        ticketId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ticket",
            required: true,
        },
        newStatusId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Status",
            required: true,
        },
        timestamp: {
            type: Date,
            required: true,
            default: Date.now, // Automatically sets the current time
        },
    },
    {
        timestamps: true, // Enable automatic `createdAt` and `updatedAt` timestamps
    }
);

const ChangeStatusHistory = mongoose.model<IChangeStatusHistory>('ChangeStatusHistory',changeStatusHistorySchema);

export { ChangeStatusHistory, IChangeStatusHistory };
