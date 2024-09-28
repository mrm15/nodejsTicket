// middleware/filterMiddleware.js
import {customFieldHandlers} from "./customFieldHandlers";

export const filterMiddleware = (req: { body: { filter: any; }; filter: any; }, res: any, next: () => void) => {
    let {filter} = req.body;
    // من به صورت دستی یه سری آیتم به جدول  نمایش لیست تیکت ها اضافه کردم که میخوام اینجا توی فیلتر اونا رو تغییر بدم تا وقتی میره توی فیلتر اصلی کار کنه
    // If no filter is present, proceed without modifying the request
    if (!filter) {
        return next();
    }
    // فیلتر هایی که خودم دستی اضافه کردم اینا هستن #10001 رو توی پروژه سرچ کن
    // Transform the filter using the custom field handlers
    filter = filter.map((row: any) => {
        // If the field is custom, execute the corresponding logic
        if (customFieldHandlers[row.property]) {
            customFieldHandlers[row.property](row);
        }
        return row;
    });


    req.body.filter = filter;
    return next()
};
