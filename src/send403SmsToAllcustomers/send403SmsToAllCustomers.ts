import { getDetailsByContactCode } from "../utils/banking/getDetailsByContactCode/getDetailsByContactCode";
import { IUser, User } from "../models/User";
import fs from 'fs/promises';
import path from 'path';
import {sendSmsFromSMSIR} from "../SMS/SMS.IR/sendSms";
import sleep from "../utils/sleep";

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

        const BAHARMETR = firstQuarterData.find(item => item.phoneNumber === userPhone)?.value?.toFixed(1) || 0;
        const TABESTANMETR = secondQuarterData.find(item => item.phoneNumber === userPhone)?.value.toFixed(1) || 0;
        const PAEEZMETR = thirdQuarterData.find(item => item.phoneNumber === userPhone)?.value.toFixed(1) || 0;
        const ZEMESTANMETR = fourthQuarterData.find(item => item.phoneNumber === userPhone)?.value.toFixed(1) || 0;
        const SUMMETR = yearlyData.find(item => item.phoneNumber === userPhone)?.value.toFixed(1) || 0;

        const nameFamilyName = `${user.name ?? ""} ${user.familyName ?? ""}`.trim();
        const myContactName = nameFamilyName === "" || nameFamilyName === " " ? 'کاربر' : nameFamilyName;

        // اگر همه مقادیر صفر بودند
        if (BAHARMETR === 0 && TABESTANMETR === 0 && PAEEZMETR === 0 && ZEMESTANMETR === 0 && SUMMETR === 0) {
            usersWithZeroMetrics.push({ phoneNumber: userPhone, myContactName });
            return null; // Skip this user for finalMetrics
        }

        // اگر هرکدام از مقادیر صفر نبودند، این کاربر در finalMetrics ذخیره می‌شود
        return {
            // myContactCode: user.contactCode || '',
            myContactName,
            mobile: userPhone,
            BAHARMETR,
            TABESTANMETR,
            PAEEZMETR,
            ZEMESTANMETR,
            SUMMETR,
        };
    }).filter(user => user !== null); // حذف کردن null ها (کاربران با مقادیر صفر)

    // ذخیره فایل finalMetrics برای کاربران با مقادیر غیر صفر
    await saveDataToFile("finalMetrics.json", userMetrics);

    // ذخیره فایل zeroMetricsUsers برای کاربران با مقادیر صفر
    if (usersWithZeroMetrics.length > 0) {
        await saveDataToFile("zeroMetricsUsers.json", usersWithZeroMetrics);
    }
};

// Function to read the `finalMetrics.json` file
const readFinalMetrics = async (): Promise<any[]> => {
    try {
        const filePath = path.join(__dirname, 'pool', 'sms1403', 'finalMetrics.json');
        const fileData = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('❌ Error reading finalMetrics.json:', error);
        return [];
    }
};
// Log successful SMS sends
// Function to log successful SMS send attempts
const logSuccess = async (message: string) => {
    const logDirPath = path.join(__dirname,'pool', 'sms1403', 'sms_logs');
    const logFilePath = path.join(logDirPath, 'sms_success_log.txt');

    try {
        // Ensure the directory exists
        await fs.mkdir(logDirPath, { recursive: true });

        // Prepare the log message
        const logMessage = `[SUCCESS] ${new Date().toISOString()} - ${message}\n`;

        // Append the log message to the file
        await fs.appendFile(logFilePath, logMessage, 'utf8');
    } catch (error) {
        console.error('Error logging success message:', error);
    }
};

// Function to log failed SMS send attempts
const logFailure = async (message: string) => {
    const logDirectory = path.join(__dirname,'pool', 'sms1403', 'sms_logs');
    const logFilePath = path.join(logDirectory, 'sms_failure_log.txt');

    try {
        // Ensure the directory exists
        await fs.mkdir(logDirectory, { recursive: true });

        // If the file doesn't exist, create it. This will happen automatically with appendFile, but we make sure it's there.
        await fs.appendFile(logFilePath, `[FAILURE] ${new Date().toISOString()} - ${message}\n`);
    } catch (error) {
        console.error('Error logging failure:', error);
    }
};
// Function to save not sent SMS data into a separate file
const saveNotSent = async (failedUser: any) => {
    const notSentFilePath = path.join(__dirname, 'pool', 'sms1403', 'notSent.json');
    const dirPath = path.dirname(notSentFilePath);

    try {
        // Ensure the directory exists
        await fs.mkdir(dirPath, { recursive: true });

        // Check if the file exists and read its contents if it does
        let failedUsers = [];
        try {
            const failedUsersData = await fs.readFile(notSentFilePath, 'utf8');
            failedUsers = failedUsersData ? JSON.parse(failedUsersData) : [];
        } catch (readError:any) {
            // If the file doesn't exist, initialize an empty array
            if (readError?.code !== 'ENOENT') {
                throw readError; // Re-throw other errors (e.g., permissions issues)
            }
        }

        // Add the failed user to the list
        failedUsers.push(failedUser);

        // Write the updated array back to the file
        await fs.writeFile(notSentFilePath, JSON.stringify(failedUsers, null, 2), 'utf8');
    } catch (error) {
        console.error('Error saving failed SMS data:', error);
    }
};


// Main function to send SMS to all users
const sendSmsToUsers = async () => {
    const users = await readFinalMetrics();
    if (!users || users.length === 0) {
        console.log("No users to send SMS to.");
        return;
    }

    for (const user of users) {
        const { mobile, myContactName, BAHARMETR, TABESTANMETR, PAEEZMETR, ZEMESTANMETR, SUMMETR } = user;

        // Assuming templateId is already defined
        const templateId = '398515';  // Replace with actual template ID
        const parameters = [
            { name: 'CONTACTNAME', value: myContactName },
            { name: 'BAHARMETR', value: BAHARMETR.toString() },
            { name: 'TABESTANMETR', value: TABESTANMETR.toString() },
            { name: 'PAEEZMETR', value: PAEEZMETR.toString() },
            { name: 'ZEMESTANMETR', value: ZEMESTANMETR.toString() },
            { name: 'SUMMETR', value: SUMMETR.toString() }
        ];

        try {
            const response = await sendSmsFromSMSIR({ mobile, templateId, parameters });

            if (response.status) {
                console.log(`✅ SMS successfully sent to ${myContactName} (${mobile})`);
                await logSuccess(`Message sent to ${myContactName} (${mobile}) with Message ID: ${response.messageId}`);

                // Remove the sent user from the finalMetrics and update the file
                const updatedUsers = users.filter((user) => user.mobile !== mobile);
                await fs.writeFile(path.join(__dirname, 'pool', 'sms1403', 'finalMetrics.json'), JSON.stringify(updatedUsers, null, 2), 'utf8');
                console.log(`User ${myContactName} removed from finalMetrics after SMS sent.`);
            } else {
                console.log(`❌ Failed to send SMS to ${myContactName} (${mobile})`);
                await logFailure(`Failed to send message to ${myContactName} (${mobile}): ${response.message}`);

                // Save the failed user in the notSended file
                const failedUser = { mobile, myContactName, BAHARMETR, TABESTANMETR, PAEEZMETR, ZEMESTANMETR, SUMMETR };
                await saveNotSent(failedUser);
            }
        } catch (error: any) {
            console.error(`❌ Error sending SMS to ${myContactName} (${mobile}):`, error);
            await logFailure(`Error sending message to ${myContactName} (${mobile}): ${error?.message}`);

            // Save the failed user in the notSended file
            const failedUser = { mobile, myContactName, BAHARMETR, TABESTANMETR, PAEEZMETR, ZEMESTANMETR, SUMMETR };
            await saveNotSent(failedUser);
        }
        // Wait for 1 second before sending the next SMS
        await sleep(1000);
    }
};

export const send403SmsToAllCustomers = async () => {

    // await generateMetricsFile();
    await sendSmsToUsers()
    console.log("hoooooora  finish Sending SMS!")


}