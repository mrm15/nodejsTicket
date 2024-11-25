// models/Subscription.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscription extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    phoneNumber: string;
    deviceId: string;  // This can be a unique identifier for each device
    endpoint: string;
    expirationTime: number | null;
    keys: {
        p256dh: string;
        auth: string;
    },
    createAt:Date,
    updateAt:Date,
}

const SubscriptionSchema: Schema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        phoneNumber: { type: String, required: true },
        deviceId: { type: String, required: true },  // Track which device is subscribing
        endpoint: { type: String, required: true },
        expirationTime: { type: Number, default: null },
        keys: {
            p256dh: { type: String, required: true },
            auth: { type: String, required: true },
        },
    },
    { timestamps: true }
);

// Add compound indexes for faster search
SubscriptionSchema.index({ userId: 1, deviceId: 1 }, { unique: true });  // Ensure the combination is unique
SubscriptionSchema.index({ userId: 1 });  // Index only by userId for searches
SubscriptionSchema.index({ deviceId: 1 });  // Index only by deviceId for searches

const Subscription = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
export { Subscription };
