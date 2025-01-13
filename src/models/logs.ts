import mongoose, { Schema, Document } from 'mongoose';

interface ILogs extends Document {
    // شناسه کاربر، مشخص‌کننده کاربری که این لاگ به او مرتبط است
    phoneNumber: mongoose.Schema.Types.ObjectId | null;

    // آدرس IP کاربر که درخواست را ارسال کرده است
    ipAddress: string | null;

    // اطلاعات مرورگر و دستگاه کاربر که از طریق User-Agent بدست می‌آید
    userAgent: string | null;

    // نوع رویداد، مشخص‌کننده نوع اتفاقی که لاگ شده (مثلاً ورود به سیستم، کلیک، درخواست API و غیره)
    eventType: string;

    // مسیر (Route) یا URL که درخواست به آن ارسال شده است
    route: string | null;

    // نوع متد HTTP که برای درخواست استفاده شده (GET, POST, PUT, DELETE و غیره)
    method: string | null;

    // کد وضعیت (Status Code) پاسخ سرور برای این درخواست
    statusCode: number | null;

    // تاریخ و زمان ثبت لاگ
    timestamp: Date;

    // زمان پاسخگویی سرور به درخواست کاربر (به میلی‌ثانیه)
    responseTime: number | null;

    // داده‌های اضافی که همراه درخواست ارسال شده است (مانند Body درخواست)
    payload?: Record<string, any>;

    // هدرهای ارسال شده همراه درخواست کاربر
    headers?: Record<string, any>;

    // نوع دستگاه کاربر (مانند موبایل، دسکتاپ و غیره)
    deviceType: string | null;

    // سیستم عامل کاربر (مانند ویندوز، لینوکس، اندروید و غیره)
    os: string | null;

    // مرورگر کاربر (مانند کروم، فایرفاکس و غیره)
    browser: string | null;

    // زمان ایجاد سند
    createdAt?: Date;

    // زمان آخرین به‌روزرسانی سند
    updatedAt?: Date;
}

// ساخت اسکیمای لاگ‌ها
const logSchema: Schema<ILogs> = new Schema<ILogs>(
    {
        ipAddress: {
            type: String || null,
            required: false,
            default: null,
        },
        userAgent: {
            type: String || null,
            required: false,
            default: null,
        },
        eventType: {
            type: String,
            required: true,
        },
        route: {
            type: String || null,
            required: false,
            default: null,
        },
        method: {
            type: String || null,
            required: false,
            default: null,
        },
        statusCode: {
            type: Number || null,
            required: false,
            default: null,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
        responseTime: {
            type: Number || null,
            required: false,
            default: null,
        },
        payload: {
            type: Schema.Types.Mixed,
            required: false,
            default: null,
        },
        headers: {
            type: Schema.Types.Mixed,
            required: false,
            default: null,
        },
        deviceType: {
            type: String || null,
            required: false,
            default: null,
        },
        os: {
            type: String || null,
            required: false,
            default: null,
        },
        browser: {
            type: String || null,
            required: false,
            default: null,
        },
    },
    {
        timestamps: true, // افزودن خودکار فیلدهای createdAt و updatedAt
    }
);

// ساخت و خروجی گرفتن از مدل لاگ‌ها
const LogModel = mongoose.model<ILogs>('logs', logSchema);
export { LogModel, ILogs };
