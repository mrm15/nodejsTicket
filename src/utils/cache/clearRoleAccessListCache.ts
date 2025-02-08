// تابعی برای حذف تمام کلیدهای کش که با "roleAccessList-" شروع می‌شوند
import myNodeCache from "./cache";
import cacheKeyNames from "./cacheKeyNames";

export const clearRoleAccessListCache = (phoneNumber = ""): void => {
    // دریافت تمام کلیدها از کش
    const allKeys = myNodeCache.keys();

    const roleAccessListKey = cacheKeyNames.getRoleAccessList
    // فیلتر کردن کلیدهایی که با پیشوند "roleAccessList-" شروع می‌شوند
    const keysToDelete = allKeys.filter((key) => key.startsWith(roleAccessListKey + phoneNumber));

    // حذف کلیدهای فیلترشده از کش
    myNodeCache.del(keysToDelete);

    //console.log(`Deleted ${keysToDelete.length} keys from cache.`);
};
