import mongoose, {Schema, Document} from 'mongoose';
import {v4 as uuidV4} from 'uuid';

interface IAdminSettings extends Document {
    [key: string]: any;

    userId: mongoose.Schema.Types.ObjectId | null;
    firstDestinationForTickets: mongoose.Schema.Types.ObjectId | null;
    showUsersListInSendTicketForm: Boolean;
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
