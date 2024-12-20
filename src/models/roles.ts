import mongoose, {Document, Schema} from 'mongoose';

interface IRole extends Document {
    [key: string]: any;

    name: string;
    description: string;
    createAt: Date;
    updateAt: Date;
    userId?: mongoose.Types.ObjectId;
    statusListCreate: Boolean;
    statusListRead: Boolean;
    statusListUpdate: Boolean;
    statusListDelete: Boolean;
    ticketCreate: Boolean; // ایجاد تیکت جدید
    ticketCreateAdvanced: Boolean; // ایجاد تیکت جدید
    readAllTicketsInSystem: Boolean; // خواند همه ی تیکت ها برای ادمین
    ticketChatList: Boolean; // مشاهده چت لیست
    ticketReadOwn: Boolean; // خواندن تیکت هایی که خودم باز کردم و ایجاد کردم برای مشتریان
    ticketReadOwnReceived: Boolean; // تمام تیکت هایی که من توی مدل کاربر  در بخش تیکت بهشون دسترسی دارم
    ticketUpdate: Boolean;
    ticketDelete: Boolean;
    themeCreate: Boolean;
    themeRead: Boolean;
    themeUpdate: Boolean;
    themeDelete: Boolean;
    departmentCreate: Boolean;
    departmentRead: Boolean;
    departmentUpdate: Boolean;
    departmentDelete: Boolean;
    fileCreate: Boolean;
    fileRead: Boolean;
    fileUpdate: Boolean;
    fileDelete: Boolean;
    tasksCreateFullAccessToUsers: Boolean;
    tasksCreateToAssignSameDepartment: Boolean;
    tasksReadAll: Boolean;
    tasksOwnRead: Boolean;
    tasksUpdateAll: Boolean;
    tasksOwnUpdate: Boolean;
    tasksDeleteAll: Boolean;
    tasksOwnDelete: Boolean;
    rolesCreate: Boolean;
    rolesRead: Boolean;
    rolesUpdate: Boolean;
    rolesDelete: Boolean;
    ticketRepliesCreate: Boolean;
    ticketRepliesRead: Boolean;
    ticketRepliesUpdate: Boolean;
    ticketRepliesDelete: Boolean;
    ticketChangeHistoryRead: Boolean;
    ticketChangeHistoryRepliesUpdate: Boolean;
    ticketChangeHistoryDelete: Boolean;
    forwardTickets: Boolean;
    assignTicketsInbox: Boolean;
    assignTicketsInboxCanDelete: Boolean;
    assignTicketsOutBox: Boolean;
    assignTicketsOutBoxCanDelete: Boolean;
    assignTicketsShowAll: Boolean;

    UnlimitedForward: Boolean;
    userCreate: Boolean;
    userReadAll: Boolean;
    userActiveAndDeActiveUsers: Boolean;
    userEditUsersRole: Boolean;
    userEditUsersDepartment: Boolean;
    adminSettings: Boolean;
    userStatusInDashboard: Boolean;
    userReadSameDepartment: Boolean;
    userUpdateAll: Boolean;
    userUpdateSameDepartment: Boolean;
    userDeleteAll: Boolean;
    userDeleteSameDepartment: Boolean;
    report: Boolean;
    howManyUsersThereAre: Boolean;
    howManyUsersIsInEveryDepartment: Boolean;
    howManyTicketsThereAre: Boolean;
    howManyTicketsThereAreInEveryDepartment: Boolean;
    howManyTicketsHasDoneStatus: Boolean;
    howManyTicketsHasDoneStatusIn12Month: Boolean;
    sendHiddenMessage: Boolean;
    smsSend: Boolean;

    showBillAccess: Boolean;
    downloadBillAsPdf: Boolean;
    downloadBillAsCsv: Boolean;
    submitBillInSubmitOrderForm: Boolean;
    submitBillInChatList: Boolean;
    saveBillAsDraft: Boolean;
    saveBillAsDone: Boolean;
    deleteBill: Boolean;
    editBillInChatList: Boolean;
    allContactsWhenSubmitBill: Boolean;
    showReportBillList: Boolean;
    adminReport: Boolean;
    basteBandi: Boolean;
    ersal: Boolean;
    hasAccessToUnCheckedSendPackages: Boolean;
    // widget
    widgetUserStatus: Boolean;
    widgetNumberOfBills7days: Boolean;
    widgetAmountOfBills7days: Boolean;
    widgetHowManyUsersThereAre: Boolean;
    // ادامه دارد....
    screenShotBills: Boolean;
    fatherAccess: Boolean;
    // مشتری بتونه لیست فاکتورهاشو هم ببینه
    showMyBillListForCustomer: Boolean;
    viewBills: Boolean;
    testBillCalculatePrice: Boolean;
    showMyTicketList: Boolean;


}

const roleSchema: Schema<IRole> = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: false},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // References the 'Role' model
        required: false,
        default: null,
    },

    statusListCreate: {type: Boolean, default: false, required: true},
    statusListRead: {type: Boolean, default: false, required: true},
    statusListUpdate: {type: Boolean, default: false, required: true},
    statusListDelete: {type: Boolean, default: false, required: true},
    ticketCreate: {type: Boolean, default: false, required: true},
    ticketCreateAdvanced: {type: Boolean, default: false, required: true},
    readAllTicketsInSystem: {type: Boolean, default: false, required: true},
    ticketChatList: {type: Boolean, default: false, required: true},
    ticketUpdate: {type: Boolean, default: false, required: true},
    ticketDelete: {type: Boolean, default: false, required: true},
    themeCreate: {type: Boolean, default: false, required: true},
    themeRead: {type: Boolean, default: false, required: true},
    themeUpdate: {type: Boolean, default: false, required: true},
    themeDelete: {type: Boolean, default: false, required: true},
    departmentCreate: {type: Boolean, default: false, required: true},
    departmentRead: {type: Boolean, default: false, required: true},
    departmentUpdate: {type: Boolean, default: false, required: true},
    departmentDelete: {type: Boolean, default: false, required: true},
    fileCreate: {type: Boolean, default: false, required: true},
    fileRead: {type: Boolean, default: false, required: true},
    fileUpdate: {type: Boolean, default: false, required: true},
    fileDelete: {type: Boolean, default: false, required: true},
    tasksCreateFullAccessToUsers: {type: Boolean, default: false, required: true},
    tasksCreateToAssignSameDepartment: {type: Boolean, default: false, required: true},
    tasksReadAll: {type: Boolean, default: false, required: true},
    tasksOwnRead: {type: Boolean, default: false, required: true},
    tasksUpdateAll: {type: Boolean, default: false, required: true},
    tasksOwnUpdate: {type: Boolean, default: false, required: true},
    tasksDeleteAll: {type: Boolean, default: false, required: true},
    tasksOwnDelete: {type: Boolean, default: false, required: true},
    rolesCreate: {type: Boolean, default: false, required: true},
    rolesRead: {type: Boolean, default: false, required: true},
    rolesUpdate: {type: Boolean, default: false, required: true},
    rolesDelete: {type: Boolean, default: false, required: true},
    ticketRepliesCreate: {type: Boolean, default: false, required: true},
    ticketRepliesRead: {type: Boolean, default: false, required: true},
    ticketRepliesUpdate: {type: Boolean, default: false, required: true},
    ticketRepliesDelete: {type: Boolean, default: false, required: true},
    ticketChangeHistoryRead: {type: Boolean, default: false, required: true},
    ticketChangeHistoryRepliesUpdate: {type: Boolean, default: false, required: true},
    ticketChangeHistoryDelete: {type: Boolean, default: false, required: true},
    forwardTickets: {type: Boolean, default: false, required: true},
    assignTicketsInbox: {type: Boolean, default: false, required: true},
    assignTicketsInboxCanDelete: {type: Boolean, default: false, required: true},
    assignTicketsOutBox: {type: Boolean, default: false, required: true},
    assignTicketsOutBoxCanDelete: {type: Boolean, default: false, required: true},
    assignTicketsShowAll: {type: Boolean, default: false, required: true},
    UnlimitedForward: {type: Boolean, default: false, required: true},
    userCreate: {type: Boolean, default: false, required: true},
    userReadAll: {type: Boolean, default: false, required: true},
    userReadSameDepartment: {type: Boolean, default: false, required: true},
    userUpdateAll: {type: Boolean, default: false, required: true},
    userUpdateSameDepartment: {type: Boolean, default: false, required: true},
    userDeleteAll: {type: Boolean, default: false, required: true},
    userDeleteSameDepartment: {type: Boolean, default: false, required: true},
    userActiveAndDeActiveUsers: {type: Boolean, default: false, required: true},
    userEditUsersRole: {type: Boolean, default: false, required: true},
    userEditUsersDepartment: {type: Boolean, default: false, required: true},
    adminSettings: {type: Boolean, default: false, required: true},
    userStatusInDashboard: {type: Boolean, default: false, required: true},

    report: {type: Boolean, default: false, required: true},
    howManyUsersThereAre: {type: Boolean, default: false, required: true},
    howManyUsersIsInEveryDepartment: {type: Boolean, default: false, required: true},
    howManyTicketsThereAre: {type: Boolean, default: false, required: true},
    howManyTicketsThereAreInEveryDepartment: {type: Boolean, default: false, required: true},
    howManyTicketsHasDoneStatus: {type: Boolean, default: false, required: true},
    howManyTicketsHasDoneStatusIn12Month: {type: Boolean, default: false, required: true},
    sendHiddenMessage: {type: Boolean, default: false, required: true},
    // smsArchive:{type:Boolean , default:false , required:true},
    // smsPending:{type:Boolean , default:false , required:true},
    smsSend: {type: Boolean, default: false, required: true},
    // hesabfa
    showBillAccess: {type: Boolean, default: false, required: true},
    downloadBillAsPdf: {type: Boolean, default: false, required: true},
    downloadBillAsCsv: {type: Boolean, default: false, required: true},
    submitBillInSubmitOrderForm: {type: Boolean, default: false, required: true},
    submitBillInChatList: {type: Boolean, default: false, required: true},
    saveBillAsDraft: {type: Boolean, default: false, required: true},
    saveBillAsDone: {type: Boolean, default: false, required: true},
    deleteBill: {type: Boolean, default: false, required: true},
    editBillInChatList: {type: Boolean, default: false, required: true},
    allContactsWhenSubmitBill: {type: Boolean, default: false, required: true},
    sellBill: {type: Boolean, default: false, required: true},
    showReportBillList: {type: Boolean, default: false, required: true},
    adminReport: {type: Boolean, default: false, required: true},
    basteBandi: {type: Boolean, default: false, required: true},
    ersal: {type: Boolean, default: false, required: true},
    hasAccessToUnCheckedSendPackages: {type: Boolean, default: false, required: true},
    // مشاهده گزارش های داشبورد
    widgetUserStatus: {type: Boolean, default: false, required: true}, //
    widgetNumberOfBills7days: {type: Boolean, default: false, required: true}, //
    widgetAmountOfBills7days: {type: Boolean, default: false, required: true}, //
    widgetHowManyUsersThereAre: {type: Boolean, default: false, required: true}, //
    ///////
    screenShotBills: {type: Boolean, default: false, required: true}, //
    fatherAccess: {type: Boolean, default: false, required: true}, //
    showMyBillListForCustomer: {type: Boolean, default: false, required: true}, //
    viewBills: {type: Boolean, default: false, required: true}, //
    testBillCalculatePrice: {type: Boolean, default: false, required: true}, //
    myBankFirstUserId: {type: Boolean, default: false, required: true}, //
    allBanksFirstUserId: {type: Boolean, default: false, required: true}, //
    myBankDepartment: {type: Boolean, default: false, required: true}, //
    /// dashboard access
    customerDashboard: {type: Boolean, default: false, required: true}, //
    organizationDashboard: {type: Boolean, default: false, required: true}, //
    departmentAdminDashboard: {type: Boolean, default: false, required: true}, //
    fullAdminDashboard: {type: Boolean, default: false, required: true}, //
    showMyTicketList: {type: Boolean, default: false, required: true}, //

});


// Ensure virtual fields are serialized
roleSchema.set('toJSON', {
    virtuals: true
});

const Role = mongoose.model<IRole>('Role', roleSchema);

export {Role, IRole};
