import mongoose, { Document, Schema } from 'mongoose';
import {randomUUID} from "node:crypto";
import {v4 as uuidV4} from 'uuid';

interface IRole extends Document {
    [key: string]: any;
    name: string;
    description: string;
    createAt: Date;
    updateAt: Date;
    userId?: mongoose.Types.ObjectId;
    statusListCreate:Boolean;
    statusListRead:Boolean;
    statusListUpdate:Boolean;
    statusListDelete:Boolean;
    ticketCreate:Boolean; // ایجاد تیکت جدید
    ticketReadAll:Boolean; // خواند همه ی تیکت ها برای ادمین
    ticketChatList:Boolean; // مشاهده چت لیست
    ticketReadOwn:Boolean; // خواندن تیکت هایی که خودم باز کردم و ایجاد کردم برای مشتریان
    ticketInput:Boolean; // تیکت های مشترک بین من و دپارتمان من
    ticketUpdate:Boolean;
    ticketDelete:Boolean;
    themeCreate:Boolean;
    themeRead:Boolean;
    themeUpdate:Boolean;
    themeDelete:Boolean;
    departmentCreate:Boolean;
    departmentRead:Boolean;
    departmentUpdate:Boolean;
    departmentDelete:Boolean;
    fileCreate:Boolean;
    fileRead:Boolean;
    fileUpdate:Boolean;
    fileDelete :Boolean;
    tasksCreateFullAccessToUsers:Boolean;
    tasksCreateToAssignSameDepartment :Boolean;
    tasksReadAll:Boolean;
    tasksOwnRead:Boolean;
    tasksUpdateAll:Boolean;
    tasksOwnUpdate:Boolean;
    tasksDeleteAll:Boolean;
    tasksOwnDelete:Boolean;
    rolesCreate:Boolean;
    rolesRead:Boolean;
    rolesUpdate:Boolean;
    rolesDelete:Boolean;
    ticketRepliesCreate:Boolean;
    ticketRepliesRead:Boolean;
    ticketRepliesUpdate:Boolean;
    ticketRepliesDelete:Boolean;
    ticketChangeHistoryRead:Boolean;
    ticketChangeHistoryRepliesUpdate:Boolean;
    ticketChangeHistoryDelete:Boolean;
    userCreate:Boolean;
    userReadAll:Boolean;
    userActiveAndDeActiveUsers:Boolean;
    userEditUsersRole:Boolean;
    userEditUsersDepartment:Boolean;
    userReadSameDepartment:Boolean;
    userUpdateAll:Boolean;
    userUpdateSameDepartment:Boolean;
    userDeleteAll:Boolean;
    userDeleteSameDepartment:Boolean;
    report:Boolean;
    howManyUsersThereAre:Boolean;
    howManyUsersIsInEveryDepartment:Boolean;
    howManyTicketsThereAre:Boolean;
    howManyTicketsThereAreInEveryDepartment:Boolean;
    howManyTicketsHasDoneStatus:Boolean;
    howManyTicketsHasDoneStatusIn12Month:Boolean;


}

const roleSchema: Schema<IRole> = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // References the 'Role' model
        required: false,
        default: null,
    },

    statusListCreate:{type:Boolean , default:false , required:true},
    statusListRead:{type:Boolean , default:false , required:true},
    statusListUpdate:{type:Boolean , default:false , required:true},
    statusListDelete:{type:Boolean , default:false , required:true},
    ticketCreate:{type:Boolean , default:false , required:true},
    ticketReadAll:{type:Boolean , default:false , required:true},
    ticketChatList:{type:Boolean , default:false , required:true},
    ticketReadOwn:{type:Boolean , default:false , required:true},
    ticketInput:{type:Boolean , default:false , required:true},
    ticketUpdate:{type:Boolean , default:false , required:true},
    ticketDelete:{type:Boolean , default:false , required:true},
    themeCreate:{type:Boolean , default:false , required:true},
    themeRead:{type:Boolean , default:false , required:true},
    themeUpdate:{type:Boolean , default:false , required:true},
    themeDelete:{type:Boolean , default:false , required:true},
    departmentCreate:{type:Boolean , default:false , required:true},
    departmentRead:{type:Boolean , default:false , required:true},
    departmentUpdate:{type:Boolean , default:false , required:true},
    departmentDelete:{type:Boolean , default:false , required:true},
    fileCreate:{type:Boolean , default:false , required:true},
    fileRead:{type:Boolean , default:false , required:true},
    fileUpdate:{type:Boolean , default:false , required:true},
    fileDelete: {type:Boolean , default:false , required:true},
    tasksCreateFullAccessToUsers:{type:Boolean , default:false , required:true},
    tasksCreateToAssignSameDepartment: {type:Boolean , default:false , required:true},
    tasksReadAll:{type:Boolean , default:false , required:true},
    tasksOwnRead:{type:Boolean , default:false , required:true},
    tasksUpdateAll:{type:Boolean , default:false , required:true},
    tasksOwnUpdate:{type:Boolean , default:false , required:true},
    tasksDeleteAll:{type:Boolean , default:false , required:true},
    tasksOwnDelete:{type:Boolean , default:false , required:true},
    rolesCreate:{type:Boolean , default:false , required:true},
    rolesRead:{type:Boolean , default:false , required:true},
    rolesUpdate:{type:Boolean , default:false , required:true},
    rolesDelete:{type:Boolean , default:false , required:true},
    ticketRepliesCreate:{type:Boolean , default:false , required:true},
    ticketRepliesRead:{type:Boolean , default:false , required:true},
    ticketRepliesUpdate:{type:Boolean , default:false , required:true},
    ticketRepliesDelete:{type:Boolean , default:false , required:true},
    ticketChangeHistoryRead:{type:Boolean , default:false , required:true},
    ticketChangeHistoryRepliesUpdate:{type:Boolean , default:false , required:true},
    ticketChangeHistoryDelete:{type:Boolean , default:false , required:true},
    userCreate:{type:Boolean , default:false , required:true},
    userReadAll:{type:Boolean , default:false , required:true},
    userReadSameDepartment:{type:Boolean , default:false , required:true},
    userUpdateAll:{type:Boolean , default:false , required:true},
    userUpdateSameDepartment:{type:Boolean , default:false , required:true},
    userDeleteAll:{type:Boolean , default:false , required:true},
    userDeleteSameDepartment:{type:Boolean , default:false , required:true},
    userActiveAndDeActiveUsers:{type:Boolean , default:false , required:true},
    userEditUsersRole:{type:Boolean , default:false , required:true},
    userEditUsersDepartment:{type:Boolean , default:false , required:true},
    report:{type:Boolean , default:false , required:true},
    howManyUsersThereAre:{type:Boolean , default:false , required:true},
    howManyUsersIsInEveryDepartment:{type:Boolean , default:false , required:true},
    howManyTicketsThereAre:{type:Boolean , default:false , required:true},
    howManyTicketsThereAreInEveryDepartment:{type:Boolean , default:false , required:true},
    howManyTicketsHasDoneStatus:{type:Boolean , default:false , required:true},
    howManyTicketsHasDoneStatusIn12Month:{type:Boolean , default:false , required:true},
});

roleSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialized
roleSchema.set('toJSON', {
    virtuals: true
});

const Role = mongoose.model<IRole>('Role', roleSchema);

export { Role, IRole };
