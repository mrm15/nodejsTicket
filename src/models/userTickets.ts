import mongoose, {Schema, Document} from 'mongoose';
import {v4 as uuidV4} from 'uuid';

interface IUserTickets extends Document {
    [key: string]: any;

    ticketId: mongoose.Schema.Types.ObjectId | null;
    hesabfaBillNumber: number | null;
    status: Boolean;
    userSubmitFactor: mongoose.Schema.Types.ObjectId | null;
    userVerifyFactor: mongoose.Schema.Types.ObjectId | null;
    date: Date;
    createAt: Date;
    updateAt: Date;
}

// Create the User schema
const UserTickets: Schema<IUserTickets> = new Schema<IUserTickets>({

    ticketId: {
        type: mongoose.Schema.Types.ObjectId || null,
        required: false,
        default: null,
    },
    hesabfaBillNumber: {
        type: Number || null,
        required: false,
    },
    status: {
        type: String || null,
        required: false,
    },
    userSubmitFactor: {
        unique: false,
        type: mongoose.Schema.Types.ObjectId || null,
        required: false,
        default: null,
    },
    userVerifyFactor: {
        unique: false,
        type: mongoose.Schema.Types.ObjectId || null,
        required: false,
        default: null,
    },
    date: {
        type: Date,
        default: Date.now,
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

// Create and export the User model
const UserTicketsModel = mongoose.model<IUserTickets>('UserTickets', UserTickets);
export {UserTicketsModel, IUserTickets};
