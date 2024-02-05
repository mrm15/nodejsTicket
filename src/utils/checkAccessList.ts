import { getRoleAccessList } from "../controllers/LoginRegisterSms/getRoleAccessList";

interface CheckAccessListParams {
    phoneNumber: string;
    arrayListToCheck: string[];
}

export const checkAccessList = async ({ phoneNumber, arrayListToCheck }: CheckAccessListParams): Promise<boolean> => {
    const accessList = await getRoleAccessList(phoneNumber);

    // console.log(accessList)

    let hasAccess = true;

    // تقریبا محاله ولی ممکنه یه لحظه کاربر داره تغییر ایجاد میکنه یهو ادمین اصلی پاکش کنه.
    // یا دسترسی هاشو برداره.
    if (!accessList) {
        hasAccess = false;
    }


    for (let i = 0; i < arrayListToCheck.length; i++) {
        const item = arrayListToCheck[i];
        if (!accessList?.includes(item)) {
            hasAccess = false;
            break;
        }
    }

    return hasAccess;
}
