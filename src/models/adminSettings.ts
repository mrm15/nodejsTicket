import mongoose, {Schema, Document} from 'mongoose';
import {v4 as uuidV4} from 'uuid';

interface IAdminSettings extends Document {
    [key: string]: any;

    userId: mongoose.Schema.Types.ObjectId | null;
    firstDestinationForTickets: mongoose.Schema.Types.ObjectId | null;
    showUsersListInSendTicketForm: Boolean;
    firstStatusTicket: mongoose.Schema.Types.ObjectId | null;
    maxFileSize: Number | null;
    customerDepartment: mongoose.Schema.Types.ObjectId | null;
    registerInPanel: "active" | 'notActive' | null;
    registerDepartment: mongoose.Schema.Types.ObjectId | null;
    registerRole: mongoose.Schema.Types.ObjectId | null;
    forwardTicketsAfterVerify: mongoose.Schema.Types.ObjectId | null;
    createAt: Date;
    updateAt: Date;
}

// Create the User schema
const adminSettingsSchema: Schema<IAdminSettings> = new Schema<IAdminSettings>({

    userId: {
        unique: true,
        type: mongoose.Schema.Types.ObjectId || null,
        required: false,
        default: null,

    },
    firstDestinationForTickets: {
        type: mongoose.Schema.Types.ObjectId || null,
        required: false,


    },
    showUsersListInSendTicketForm: {
        type: Boolean,
        default: false,
    },
    firstStatusTicket: {
        type: mongoose.Schema.Types.ObjectId || null,
        required: false,
    },
    maxFileSize: {
        type: Number || null,
        required: false,
    },
    customerDepartment: {
        type: String || null,
        required: true,
    },
    registerInPanel: {
        type: String || null,
        required: true,
    },
    registerDepartment: {
        type: mongoose.Schema.Types.ObjectId || null,
        required: true,
    },
    registerRole: {
        type: mongoose.Schema.Types.ObjectId || null,
        required: true,
    },
    forwardTicketsAfterVerify: {
        type: mongoose.Schema.Types.ObjectId || null,
        required: true,
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
const AdminSettings = mongoose.model<IAdminSettings>('adminSettings', adminSettingsSchema);
export {AdminSettings, IAdminSettings};
