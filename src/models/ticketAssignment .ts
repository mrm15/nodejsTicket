import mongoose, { Document, Schema } from 'mongoose';

// تعریف رابط (interface) سند TicketAssignment
// این رابط نوع داده‌های ذخیره شده در مدل را مشخص می‌کند
interface ITicketAssignment extends Document {
    ticketId: mongoose.Schema.Types.ObjectId; // شناسه‌ی تیکت (از مجموعه‌ی Tickets)
    assignedToUserId: mongoose.Schema.Types.ObjectId | null; // شناسه‌ی کاربری که تیکت به او اختصاص داده شده (اختیاری، اگر به دپارتمان تخصیص داده شود)
    assignedToDepartmentId: mongoose.Schema.Types.ObjectId | null; // شناسه‌ی دپارتمانی که تیکت به آن تخصیص داده شده (اختیاری، اگر به کاربر تخصیص داده شود)
    assignedBy: mongoose.Schema.Types.ObjectId; // شناسه‌ی ادمینی که تیکت را تخصیص داده
    assignDate: Date; // تاریخ و زمان تخصیص تیکت
    readDate: Date | null; // تاریخی که تیکت توسط کاربر خوانده شده (یا null اگر هنوز خوانده نشده)
    readStatus: boolean; // وضعیت خوانده یا نخوانده بودن تیکت
    numberOfAssign: number; // تعداد دفعاتی که این تیکت به کاربر تخصیص داده شده
    assignmentType: 'user' | 'department'; // نوع تخصیص (به کاربر یا دپارتمان)
    isDeletedForUser: boolean; // If user deleted it from their inbox
    isDeletedForForwarder: boolean; // If forwarder deleted it from forwarded list

    createdAt: Date; // تاریخ ایجاد رکورد تخصیص
    updatedAt: Date; // تاریخ آخرین به‌روزرسانی رکورد
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
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin', // اشاره به ادمینی که تیکت را تخصیص داده
        required: true, // این فیلد الزامی است
    },
    assignDate: {
        type: Date,
        default: Date.now, // مقدار پیش‌فرض تاریخ و زمان تخصیص، زمان حال است
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
        enum: ['user', 'department'], // تعیین نوع تخصیص (یا به کاربر یا به دپارتمان)
        required: true, // این فیلد الزامی است
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

ticketAssignmentSchema.index({ ticketId: 1 }); // ایندکس برای جستجو بر اساس شناسه تیکت
ticketAssignmentSchema.index({ assignedToUserId: 1 }); // ایندکس برای جستجو بر اساس شناسه کاربر تخصیص داده شده
ticketAssignmentSchema.index({ assignedToDepartmentId: 1 }); // ایندکس برای جستجو بر اساس شناسه دپارتمان تخصیص داده شده
ticketAssignmentSchema.index({ readTicket: 1 }); // ایندکس برای جستجو بر اساس وضعیت خوانده شدن تیکت
ticketAssignmentSchema.index({ assignDate: -1 }); // ایندکس برای مرتب‌سازی تیکت‌ها بر اساس تاریخ تخصیص (نزولی: جدیدترین تیکت‌ها اول نمایش داده می‌شوند)

// ایجاد و اکسپورت مدل TicketAssignment
const TicketAssignment = mongoose.model<ITicketAssignment>('TicketAssignment', ticketAssignmentSchema);

export { TicketAssignment, ITicketAssignment };
