import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 دقیقه
    limit: 10, // حداکثر 10 درخواست در 10 دقیقه
    message: { message: 'تعداد درخواست‌های مجاز تمام شده است. لطفاً بعداً دوباره تلاش کنید.' },
    standardHeaders: true, // هدرهای مربوط به محدودیت نرخ را ارسال کن
    legacyHeaders: false, // هدرهای قدیمی رو غیرفعال کن
});