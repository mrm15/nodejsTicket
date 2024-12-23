import {readProductList} from "./readProductList";

let CacheFile:any [] | null = null;
let lastCacheUpdate: number | null = null; // زمان آخرین به‌روزرسانی کش
const CACHE_TTL = 1000 * 60 * (6 * 60); // 6*60  دقیقه

// تابع برای مدیریت کش
const getCacheData = async (): Promise<any[] | null> => {
    const now = Date.now();

    if (!CacheFile || !lastCacheUpdate || (now - lastCacheUpdate > CACHE_TTL)) {
        CacheFile = await readProductList()
        lastCacheUpdate = now; // به‌روزرسانی زمان کش
    } else {
        // console.log("Using cached data.");
    }

    return CacheFile;
};

export const getProductList = async () => {

    const allData = await getCacheData();

    // شاید بخوایم محصولاتی که قیمت فروششون صفر هست رو نشون ندیم.
   // اگه محاسبات یا فیلتری بخوایم روی فایل انجام بدیم میتونیم اینجا انجام بدیم. ولی دقت کنیم که توی تمام جاهایی که استفاده شده فیلتر اعمال میشه

    return allData;
};
