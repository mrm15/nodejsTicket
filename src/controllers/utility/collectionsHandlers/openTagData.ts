export type myTagObjectType = {
    n: string; // نام مشتری
    tn: string;// شماره تیکت مشتری
    bs: string;// وضعیت بسته بندی
    db:string; // تاریخ بسته بندی
    ss: string; // وضعیت ارسال3
    ds:string; // تاریخ ارسال




}
export const makeEmptyTagObject = () => {

    const tagObject: myTagObjectType = {
        db: "",
        ds: "",
        n: "",
        tn: "",
        bs: "",
        ss: ""
    };
    return tagObject
}
export const openTagData = (row: any) => {
    // اینجا میخوام مقدار موجود توی تگ رو باز کنم و بفرستم سمت فرانت
    // اگه مقدار تگ خالی بود خودم تگ رو بهش آبجکت خالی میدم و میفرستم واسش

    // in some case  Tag is an empty string ""

    // if it is an en,pty string so  try to add my object to it

    // if it is not an empty string



    return row
}