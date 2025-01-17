// cronJobs.ts
import cron from 'node-cron';
import {sendReportDaySMSToSomeOfUsers} from "../utils/cronFunctions/sendReportDaySMSToSomeOfUsers";
import updateBillsFileFunction from "../utils/updateBillsFileFunction/updateBillsFileFunction";
import saveProductList from "../utils/productListFile/saveProductList";
import {deleteOldLogs} from "../utils/Logs/deleteOldLogs";

// Function to initialize cron jobs
export const initializeCronJobs = () => {
    // // Task to run every minute
    // cron.schedule('* * * * *', () => {
    //     console.log('Running a task every minute');
    // });

    // // Task to run every day at midnight
    // cron.schedule('0 0 * * *', () => {
    //     console.log('Running a task every day at midnight');
    //     // Example: Fetch data from an API and log it
    // });

    // // Task to run every Monday at 9 AM
    // cron.schedule('0 9 * * 1', () => {
    //     console.log('Running a task every Monday at 9 AM');
    // });

    // Task to run every 10 seconds
    // cron.schedule('*/10 * * * * *', async () => {
    //     console.log('Running a task every 10 seconds');
    //
    //     await myLovelyFunction();
    // });
    // Schedule the job to run at 5 PM from Saturday to Thursday
    // cron.schedule('0 17 * * 0-4,6', async () => {
    //     console.log('Running task every day at 5 PM, except Fridays');
    //     await sendReportDaySMSToSomeOfUsers();
    // });

    const PROGRAM_MODE = process.env.PROGRAM_MODE;
    if (PROGRAM_MODE !== "local") {
        console.log("initializeCronJobs SET")
        console.log("we Are On The server And CronJobs Active");
        // Schedule the job to run at 2 PM every Thursday
        cron.schedule('35 14 * * 4', async () => {
            await sendReportDaySMSToSomeOfUsers();
            console.log("schedule:'30 14 * * 4'")
        })

        // Schedule the job to run at 5 PM from Saturday to Wednesday
        cron.schedule('0 17 * * 0-3,6', async () => {
            await sendReportDaySMSToSomeOfUsers();
            console.log("schedule:'0 17 * * 0-3,6'")

        })
        // Schedule a new job to run every 15 minutes between 7 AM and 7 PM
        cron.schedule('*/15 7-22 * * *', async () => {
            console.log('Running a task every 15 minutes between 7 AM and 7 PM');
            const rightNowDate = new Date();
            const resultMessage = await updateBillsFileFunction(rightNowDate, rightNowDate)
            console.log(resultMessage, rightNowDate)
        });
        // every night at  8 PM  Update ProductList From Hesabfa To Server
        cron.schedule('0 20 * * *', async () => {
            console.log('Running a task every night at 8 PM');
            await saveProductList();
        });
        // every night Delete old Logs before 3 month ago
        cron.schedule('0 20 * * *', async () => {
            // Calculate the threshold date (3 months ago)
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
            const deleteCount = await deleteOldLogs({timestamp: threeMonthsAgo});
            console.log(`deleted  ${deleteCount} logs!`)
        });

    }


};
