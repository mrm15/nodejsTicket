import mongoose, {Document, Schema} from 'mongoose';
import {Counter} from "./counterSchema";

//

export async function getNextSequenceValue(sequenceName: string): Promise<number> {
    const counterDocument = await Counter.findByIdAndUpdate(
        sequenceName,
        {$inc: {seq: 1}},
        {new: true, upsert: true}
    );
    return counterDocument.seq;
}


// Define the Ticket document interface
interface ITicket extends Document {
    // ticketFound: mongoose.Types.ObjectId;
    // ticketId: string;
    // شماره تیکت
    ticketNumber: number;
    // آیدی کاربری که تیکت رو ایجاد کرده
    userId: mongoose.Schema.Types.ObjectId;
    // عنوان تیکت چیه؟
    title: string;
    // توضیحات تیکت
    description: string;
    // الویت تیکت
    priority: string;
    // وضعیت
    // status: string;
    statusId:mongoose.Schema.Types.ObjectId| null;
    // اولین دپارتمان تیکت، که فقط در صورتی پر میشه که تیکت بیاد توی دپارتمان سفارش گیری و به شخص خاصی ارجاع نشه
    firstDepartmentId: mongoose.Schema.Types.ObjectId| null;
    // اولین شخصی که مشتری انتخاب کرده و سفارشش رو براش فرستاده که یه نفر از تیم سفارش گیر ها هستن
    firstUserId: mongoose.Schema.Types.ObjectId | null;
    // آخرین دپارتمانی که اون تیکت توش قرار داره
    lastAssignedDepartmentId: mongoose.Schema.Types.ObjectId | null;
    // آخرین کاربری که اون تیکت بهش ارجاع شده
    lastAssignedUserId: mongoose.Schema.Types.ObjectId | null;
    // چیازیی که کاربر ضمیمه کرده
    attachments: mongoose.Schema.Types.ObjectId[]; // Assuming attachments are an array of string URLs
    // تاریخ آخرین تغییر روی این تیکت
    lastChangeTimeStamp: Date;
    // شماره ی فاکتوری که برای این وجود داره که اگه مشتری دسترسی به فاکتور داعش باشه شماره فاکتور پر میشه
    billNumber: string | null;
    // وضعیت فاکتوری که زده شده اگه تایید بشه اینجا 1 میشه
    billStatus: number | null; // (0=> draft )   (1=> verify)
    // وضعیت خواندن فاکتور توی سازمان (وقتی مشتری پیام بزاره اینو فالز میکنم ینی سازمان هنوز ااینو نخونده( التبه که قراره وقتی سفارش گیری ها باز کردن تغییر کنه
    organizationReadStatus:boolean;
    // وضعیت خواندن فاکتور وقتی مشتری قراره ببینه. اگه بچه های سازمان پیامی دادن باید اینو فالز کنم که برای مشتری بولد بشه و وقتی مشتری بازش کرد باید
    customerReadStatus:boolean;
    // تگ که مشحص میکنه این چه تگی داره. که بعدا توی لیست پیام هام تگ ها رو مشخص کنم.
    messageTag: mongoose.Schema.Types.ObjectId | null;
    // تاریخ ایجاد این سفارش تیکت
    createAt: Date;
    // تاریخ آخرین به روز رسانی این سفارش تیکت
    updateAt: Date;
}

// Define the Ticket schema
const ticketSchema = new mongoose.Schema<ITicket>({
    ticketNumber: {
        type: Number,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    statusId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
        default: null,
    },
    firstDepartmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        default: null,
    },
    firstUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    attachments: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },
    lastAssignedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    lastAssignedDepartmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        default: null,
    },
    lastChangeTimeStamp: {
        type: Date,
        default: Date.now,
    },
    organizationReadStatus: {
        type: Boolean,
        default: false,
    },
    customerReadStatus: {
        type: Boolean,
        default: true,
    },
    billNumber: {
        type: String,
        default: null,
    },
    billStatus: {
        type: Number,
        default: null,
    },
    messageTag: {type: mongoose.Schema.Types.ObjectId,ref: 'messageTag',default: null,},
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    },
});
// Export the Ticket model


ticketSchema.pre('save', async function (next) {
    if (this.isNew && !this.ticketNumber) {
        // console.log("Generating ticket number...");
        try {
            const seqValue = await getNextSequenceValue('ticketNumber');
            this.ticketNumber = seqValue; // Set the ticketNumber if it's not already set
            // console.log("Generated ticket number:", this.ticketNumber);
            next();
        } catch (error: any) {
            console.error("Error generating ticket number:", error);
            next(error); // Pass any errors to the next middleware
        }
    } else {
        // console.log("Ticket already has a number or is not new. Skipping generation.");
        next(); // If the  is already set or it's not a new document, proceed to the next middleware
    }
});


const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema);

export {Ticket, ITicket};