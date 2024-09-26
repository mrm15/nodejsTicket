// middleware/filterMiddleware.js
export const filterMiddleware = (req: { body: { filter: any; }; filter: any; }, res: any, next: () => void) => {
    let {filter} = req.body;
    // من به صورت دستی یه سری آیتم به جدول  نمایش لیست تیکت ها اضافه کردم که میخوام اینجا توی فیلتر اونا رو تغییر بدم تا وقتی میره توی فیلتر اصلی کار کنه
    // If no filter is present, proceed without modifying the request
    if (!filter) {
        return next();
    }
    const has_IdFilter = filter.find((row: any) => row.property === "_id")
    const hasTicketNumberFilter = filter.find((row: any) => row.property === "ticketNumber");

    filter = filter.map((row: any) => {
        if (hasTicketNumberFilter && row.property === "ticketNumber") {
            row.value = +row.value
        }
    })


    req.body.filter = filter;
    return next()
};
