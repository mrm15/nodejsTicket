import { getDetailsByContactCode } from "../utils/banking/getDetailsByContactCode/getDetailsByContactCode";
import { IUser, User } from "../models/User";
import fs from 'fs/promises';
import path from 'path';

// یک تابع عمومی برای دریافت داده‌ها با بازه زمانی دلخواه
const getQuarterData = async (startDate: string, endDate: string) => {
    const filters = [
        { uniqId: "startDate", Property: "Date", Operator: ">=", Value: startDate },
        { uniqId: "endDate", Property: "Date", Operator: "<", Value: endDate },
        { uniqId: "status", Property: "Status", Operator: "=", Value: 1 }
    ];
    return await getDetailsByContactCode({ filters });
};

// بازه‌های زمانی
const dateRanges = {
    firstQuarter: { start: "2024-03-21T00:00:00", end: "2024-06-21T00:00:00" },
    secondQuarter: { start: "2024-06-21T00:00:00", end: "2024-09-23T00:00:00" },
    thirdQuarter: { start: "2024-09-23T00:00:00", end: "2024-12-21T00:00:00" },
    fourthQuarter: { start: "2024-12-21T00:00:00", end: "2025-03-20T00:00:00" },
    yearly: { start: "2024-03-21T00:00:00", end: "2025-03-20T00:00:00" }
};

// تابع ذخیره‌سازی


const saveDataToFile = async (fileName: string, data: any[]): Promise<void> => {
    try {
        // Define the directory path
        const directoryPath = path.join(__dirname, 'pool', 'sms1403');

        // Ensure the directory exists, create it if not
        await fs.mkdir(directoryPath, { recursive: true });

        // Create the full file path
        const filePath = path.join(directoryPath, fileName);

        // Write data to the file
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`✅ Data saved successfully to ${filePath}`);
    } catch (error) {
        console.error(`❌ Error saving data to ${fileName}:`, error);
    }
};

// تابع اصلی تولید متریک‌ها
const generateMetricsFile = async () => {
    const allUsers: IUser[] = await User.find({}).lean();
    if (!allUsers || allUsers.length === 0) throw new Error("هیچ کاربری موجود نیست");

    // دریافت داده‌ها برای همه فصل‌ها
    const [firstQuarterData, secondQuarterData, thirdQuarterData, fourthQuarterData, yearlyData] = await Promise.all([
        getQuarterData(dateRanges.firstQuarter.start, dateRanges.firstQuarter.end),
        getQuarterData(dateRanges.secondQuarter.start, dateRanges.secondQuarter.end),
        getQuarterData(dateRanges.thirdQuarter.start, dateRanges.thirdQuarter.end),
        getQuarterData(dateRanges.fourthQuarter.start, dateRanges.fourthQuarter.end),
        getQuarterData(dateRanges.yearly.start, dateRanges.yearly.end)
    ]);

    // آرایه برای ذخیره کاربران با مقادیر صفر
    const usersWithZeroMetrics: any[] = [];
    const userMetrics = allUsers.map(user => {
        const userPhone = user.phoneNumber;

        const BAHARMETR = firstQuarterData.find(item => item.phoneNumber === userPhone)?.value || 0;
        const TABESTANMETR = secondQuarterData.find(item => item.phoneNumber === userPhone)?.value || 0;
        const PAEEZMETR = thirdQuarterData.find(item => item.phoneNumber === userPhone)?.value || 0;
        const ZEMESTANMETR = fourthQuarterData.find(item => item.phoneNumber === userPhone)?.value || 0;
        const SUMMETR = yearlyData.find(item => item.phoneNumber === userPhone)?.value || 0;

        const nameFamilyName = `${user.name ?? ""} ${user.familyName ?? ""}`.trim();
        const myContactName = nameFamilyName === "" || nameFamilyName === " " ? 'کاربر' : nameFamilyName;

        // اگر همه مقادیر صفر بودند
        if (BAHARMETR === 0 && TABESTANMETR === 0 && PAEEZMETR === 0 && ZEMESTANMETR === 0 && SUMMETR === 0) {
            usersWithZeroMetrics.push({ phoneNumber: userPhone, myContactName });
            return null; // Skip this user for finalMetrics
        }

        // اگر هرکدام از مقادیر صفر نبودند، این کاربر در finalMetrics ذخیره می‌شود
        return {
            myContactCode: user.contactCode || '',
            myContactName,
            phoneNumber: userPhone,
            BAHARMETR,
            TABESTANMETR,
            PAEEZMETR,
            ZEMESTANMETR,
            SUMMETR
        };
    }).filter(user => user !== null); // حذف کردن null ها (کاربران با مقادیر صفر)

    // ذخیره فایل finalMetrics برای کاربران با مقادیر غیر صفر
    await saveDataToFile("finalMetrics.json", userMetrics);

    // ذخیره فایل zeroMetricsUsers برای کاربران با مقادیر صفر
    if (usersWithZeroMetrics.length > 0) {
        await saveDataToFile("zeroMetricsUsers.json", usersWithZeroMetrics);
    }
};


export const send403SmsToAllCustomers = async () => {

    await generateMetricsFile();


}