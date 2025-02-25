import mongoose, {Document, Schema} from 'mongoose';

// تعریف رابط (interface) سند TicketAssignment
// این رابط نوع داده‌های ذخیره شده در مدل را مشخص می‌کند
interface ITicketAssignment extends Document {
    // شناسه‌ی تیکت (از مجموعه‌ی Tickets)
    ticketId: mongoose.Schema.Types.ObjectId;
    // شناسه‌ی کاربری که تیکت به او اختصاص داده شده (اختیاری، اگر به دپارتمان تخصیص داده شود)
    assignedToUserId: mongoose.Schema.Types.ObjectId | null;
    // شناسه‌ی دپارتمانی که تیکت به آن تخصیص داده شده (اختیاری، اگر به کاربر تخصیص داده شود)
    assignedToDepartmentId: mongoose.Schema.Types.ObjectId | null;
    //assignedToUserId or assignedToDepartmentId maybe delete from their inbox
    isDeleteDestination: boolean;
    // شناسه‌ی ادمینی که تیکت را تخصیص داده فرستنده تیکت اینجا قرار میگیره که میتونه یه کاربر عادی باشه یا ادمین یه دپارتمان که دسترسی ارجاع تیکت ها رو داره
    assignedBy: mongoose.Schema.Types.ObjectId;
    // isDeleteSender - If forwarder deleted it from forwarded list
    isDeleteFromAssignedBy: boolean;
    // تاریخ و زمان تخصیص تیکت
    assignDate: Date;
    // تاریخی که تیکت توسط کاربر خوانده شده (یا null اگر هنوز خوانده نشده)
    readDate: Date | null;
    // وضعیت خوانده یا نخوانده بودن تیکت
    readStatus: boolean;
    // تعداد دفعاتی که این تیکت به کاربر تخصیص داده شده - فعلا از این مورد استفاده ای نکردم!!
    numberOfAssign: number;
    // نوع تخصیص (به کاربر یا دپارتمان)
    assignmentType: 'user' | 'department';
    // تاریخ ایجاد رکورد تخصیص
    createdAt: Date;
    // تاریخ آخرین به‌روزرسانی رکورد
    updatedAt: Date;
}

// تعریف اسکیمای (schema) TicketAssignment
// این اسکیما نحوه‌ی ذخیره و سازمان‌دهی داده‌ها در پایگاه داده MongoDB را مشخص می‌کند
const ticketAssignmentSchema: Schema<ITicketAssignment> = new mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket', // اشاره به مجموعه‌ی Tickets
        required: true, // این فیلد الزامی است
    },
    assignedToUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // اشاره به مجموعه‌ی Users
        default: null, // اگر تیکت به کاربر تخصیص داده نشده باشد، مقدار null است
    },
    assignedToDepartmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department', // اشاره به مجموعه‌ی Departments
        default: null, // اگر تیکت به دپارتمان تخصیص داده نشده باشد، مقدار null است
    },
    isDeleteDestination: {
        type: Boolean,
        default: false, //
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, // این فیلد الزامی است
    },
    // is deleteFrom
    isDeleteFromAssignedBy: {
        type: Boolean,
        default: false, //
    },
    assignDate: {
        type: Date,
        default: () => new Date(),
    },
    readStatus: {
        type: Boolean,
        default: false, // پیش‌فرض این است که تیکت خوانده نشده است
    },
    readDate: {
        type: Date,
        default: null, // تاریخ خوانده شدن به طور پیش‌فرض null است تا زمانی که خوانده شود
    },
    numberOfAssign: {
        type: Number,
        default: 1, // تعداد دفعات تخصیص تیکت به کاربر (پیش‌فرض ۱ بار است)
    },
    assignmentType: {
        type: String,
        enum: {
            values: ['user', 'department'],
            message: 'Assignment type must be either "user" or "department".',
        },
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now, // تاریخ و زمان ایجاد رکورد (پیش‌فرض، زمان حال)
    },
    updatedAt: {
        type: Date,
        default: Date.now, // تاریخ و زمان آخرین به‌روزرسانی رکورد (پیش‌فرض، زمان حال)
    },
});

// ایندکس گذاری برای بهینه‌سازی کوئری‌ها
// این ایندکس‌ها باعث می‌شوند که دسترسی به داده‌ها در این فیلدها سریع‌تر باشد

ticketAssignmentSchema.index({ticketId: 1}); // ایندکس برای جستجو بر اساس شناسه تیکت
ticketAssignmentSchema.index({assignedToUserId: 1}); // ایندکس برای جستجو بر اساس شناسه کاربر تخصیص داده شده
ticketAssignmentSchema.index({isDeleteDestination: 1}); // ایندکس برای جستجو بر اساس حذفی
ticketAssignmentSchema.index({assignedToDepartmentId: 1}); // ایندکس برای جستجو بر اساس شناسه دپارتمان تخصیص داده شده
ticketAssignmentSchema.index({readStatus: 1}); // ایندکس برای جستجو بر اساس وضعیت خوانده شدن تیکت
ticketAssignmentSchema.index({assignDate: -1}); // ایندکس برای مرتب‌سازی تیکت‌ها بر اساس تاریخ تخصیص (نزولی: جدیدترین تیکت‌ها اول نمایش داده می‌شوند)

// ایجاد و اکسپورت مدل TicketAssignment
const TicketAssignment = mongoose.model<ITicketAssignment>('TicketAssignment', ticketAssignmentSchema);

export {TicketAssignment, ITicketAssignment};
