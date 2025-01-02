// models/Subscription.ts
import mongoose, { Schema, Document } from 'mongoose';
import {getCurrentTimeStamp} from "../utils/timing";

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
        deviceId: { type: String, required: true },
        endpoint: { type: String, required: true },
        expirationTime: { type: Number, default: null },
        keys: {
            p256dh: { type: String, required: true },
            auth: { type: String, required: true },
        },
        createAt: { type: Date, default: getCurrentTimeStamp() },
        updateAt: { type: Date, default: getCurrentTimeStamp() },
    },
    { timestamps: true }
);

// Add compound index to ensure uniqueness for userId, deviceId, and endpoint
SubscriptionSchema.index(
    { userId: 1, deviceId: 1, endpoint: 1 },
    { unique: true }
);

// SubscriptionSchema.virtual('id').get(function (this: ISubscription) {
//     return this._id.toHexString();
// });

// Ensure virtual fields are serialized
SubscriptionSchema.set('toJSON', {
    virtuals: true
});
// Other helpful indexes
SubscriptionSchema.index({ userId: 1 }); // Optimize queries by userId
SubscriptionSchema.index({ deviceId: 1 }); // Optimize queries by deviceId
SubscriptionSchema.index({ endpoint: 1 }); // Optimize queries by endpoint

const Subscription = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
export { Subscription };
