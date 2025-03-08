import mongoose, { Schema, Document } from 'mongoose';

interface IAdminSettings extends Document {
    userId: mongoose.Schema.Types.ObjectId | null;
    firstDestinationForTickets: mongoose.Schema.Types.ObjectId | null;
    billDepartmentId: mongoose.Schema.Types.ObjectId | null;
    showUsersListInSendTicketForm: boolean;
    firstStatusTicket: mongoose.Schema.Types.ObjectId | null;
    maxFileSize: number | null;
    customerDepartment: mongoose.Schema.Types.ObjectId | null; // Changed to ObjectId
    customerRole: mongoose.Schema.Types.ObjectId | null; // Changed to ObjectId
    registerInPanel: "active" | "notActive" | null;
    registerDepartment: mongoose.Schema.Types.ObjectId | null;
    registerRole: mongoose.Schema.Types.ObjectId | null;
    forwardTicketsAfterVerify: mongoose.Schema.Types.ObjectId | null;
    sendSMSAfterSubmitBill: boolean;
    sendSMSAfterVerifyBill: boolean;
    exceptionFromChangeFactorTagList: string;
    loginCodeHack: string | null;
    mainFileMessageTagId:mongoose.Schema.Types.ObjectId | null;
    screenShotMessageTagId:mongoose.Schema.Types.ObjectId | null;
    billMessageTagId:mongoose.Schema.Types.ObjectId | null;
    nodeFileMessageId:mongoose.Schema.Types.ObjectId | null;
    createAt: Date;
    updateAt: Date;
}

const adminSettingsSchema: Schema<IAdminSettings> = new Schema<IAdminSettings>({
    userId: {
        unique: true,
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
    },
    firstDestinationForTickets: {type: mongoose.Schema.Types.ObjectId,required: false,default: null,},
    billDepartmentId: {type: mongoose.Schema.Types.ObjectId,required: false,default: null,},
    showUsersListInSendTicketForm: {
        type: Boolean,
        default: false,
    },
    firstStatusTicket: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
    },
    maxFileSize: {
        type: Number,
        required: false,
        default: null,
    },
    customerDepartment: {
        type: mongoose.Schema.Types.ObjectId, // Changed to ObjectId
        required: false,
        default: null,
    },
    customerRole: {
        type: mongoose.Schema.Types.ObjectId, // Changed to ObjectId
        required: false,
        default: null,
    },
    registerInPanel: {
        type: String,
        enum: ["active", "notActive"], // Ensure it's restricted to these values
        required: false,
        default: null,
    },
    registerDepartment: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
    },
    registerRole: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
    },
    forwardTicketsAfterVerify: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
    },
    mainFileMessageTagId: {type: mongoose.Schema.Types.ObjectId,required: false,default: null,},
    screenShotMessageTagId: {type: mongoose.Schema.Types.ObjectId,required: false,default: null,},
    billMessageTagId: {type: mongoose.Schema.Types.ObjectId,required: false,default: null,},
    nodeFileMessageId: {type: mongoose.Schema.Types.ObjectId,required: false,default: null,},
    sendSMSAfterSubmitBill: {
        type: Boolean,
        default: false,
    },
    sendSMSAfterVerifyBill: {
        type: Boolean,
        default: false,
    },
    exceptionFromChangeFactorTagList: {
        type: String,
        required: false,
        default: "",
    },
    loginCodeHack: {
        type: String,
        required: false,
        default: null,
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

// Create and export the AdminSettings model
const AdminSettings = mongoose.model<IAdminSettings>('adminSettings', adminSettingsSchema);
export { AdminSettings, IAdminSettings };
