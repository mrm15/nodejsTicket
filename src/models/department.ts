import mongoose, {Schema, Document} from 'mongoose';

interface IDepartment extends Document {
    name: string;
    description: string;
    userId: mongoose.Types.ObjectId;
    managerUserId: mongoose.Types.ObjectId;
    parentDepartmentId: mongoose.Types.ObjectId | null;
    location: string;
    address: string;
    phoneNumber: string;
    emailAddress: string;
    contactInfo: string;
    sendSmsAfterSubmitResponse: boolean,
    smsText: string | null,
    departmentAccessToSendTicket: boolean;
    departmentAccessToReplyTicket: boolean;
    departmentAccessToArchiveTicket: boolean;
    departmentAccessToTaskSection: boolean;
    departmentTaskColor: string;
    departmentAccessToArchiveTasks: boolean;
    accessToSameDepartmentToAssignTask: boolean;
    accessToOtherUsersToAssignTask: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const departmentSchema: Schema<IDepartment> = new Schema<IDepartment>({
    name: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId||null, ref: 'User', required:false},
    description: {type: String, required: false},
    managerUserId: {type: Schema.Types.ObjectId, ref: 'User' , index:true},
    parentDepartmentId: {type: Schema.Types.ObjectId, ref: 'Department', required:false},
    location: {type: String, required: false},
    address: {type: String, required: false},
    phoneNumber: {type: String, required: false},
    emailAddress: {type: String, required: false},
    contactInfo: {type: String, required: false},
    sendSmsAfterSubmitResponse: {type: Boolean, required: true, default: false},
    smsText: {type: String ||null, required: false},
    departmentAccessToSendTicket: {type: Boolean, required: true, default: false},
    departmentAccessToReplyTicket: {type: Boolean, required: true, default: false},
    departmentAccessToArchiveTicket: {type: Boolean, required: true, default: false},
    departmentAccessToTaskSection: {type: Boolean, required: true, default: false},
    departmentTaskColor: {type: String, required: false, default: '#ffffff'},
    departmentAccessToArchiveTasks: {type: Boolean, required: true, default: false},
    accessToSameDepartmentToAssignTask: {type: Boolean, required: true, default: false},
    accessToOtherUsersToAssignTask: {type: Boolean, required: true, default: false},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

const Department = mongoose.model<IDepartment>('Department', departmentSchema);

// departmentSchema.virtual('id').get(function (this: IDepartment) {
//     return this._id.toHexString();
// });

// Ensure virtual fields are serialized
departmentSchema.set('toJSON', {
    virtuals: true
});

export {Department , IDepartment};
