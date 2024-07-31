// cronJobs.ts
import cron from 'node-cron';
import { myLovelyFunction } from "../src/utils/myLovelyFunction";

// Function to initialize cron jobs
export const initializeCronJobs = () => {
    // Task to run every minute
    cron.schedule('* * * * *', () => {
        console.log('Running a task every minute');
    });

    // Task to run every day at midnight
    cron.schedule('0 0 * * *', () => {
        console.log('Running a task every day at midnight');
        // Example: Fetch data from an API and log it
    });

    // Task to run every Monday at 9 AM
    cron.schedule('0 9 * * 1', () => {
        console.log('Running a task every Monday at 9 AM');
    });

    // Task to run every 10 seconds
    cron.schedule('*/10 * * * * *', async () => {
        console.log('Running a task every 10 seconds');
        debugger
        await myLovelyFunction();
    });
};
