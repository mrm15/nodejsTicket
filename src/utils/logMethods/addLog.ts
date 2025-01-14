import {getUserAgentData} from "../../controllers/LoginRegisterSms/getUserAgentData";
import {getCurrentTimeStamp} from "../timing";
import {LogModel} from "../../models/logs";


const addLog = async ({
                          req,
                          phoneNumber,
                          description,
                          statusCode,
                          responseTime,


                      }: any) => {
    try {
        // Extract data from the request
        const {
            ip,
            os,
            useragent,
        } = getUserAgentData(req);

        // Prepare the log entry
        const logEntry = {
            phoneNumber: phoneNumber || null, // Assuming the phone number is in the request body
            description: description || null, // Optional description
            ipAddress: ip,
            userAgent: useragent,
            eventType: req.body.eventType || 'unknown', // Ensure event type is provided
            route: req.originalUrl || null,
            method: req.method || null,
            statusCode: statusCode || null,
            timestamp: getCurrentTimeStamp(),
            responseTime: responseTime, // You can compute this if available
            payload: req.body || null, // Log request body
            headers: req.headers || null,
            deviceType: req?.useragent?.platform || 'unknown',
            os,
            browser: req?.useragent?.browser || 'unknown',
        };

        // Insert the log into the collection
        const log = new LogModel(logEntry);
        await log.save();

        // console.log('Log saved successfully:', log);
    } catch (error) {
        // console.error('Error saving log:', error);
    }
};

export {addLog};
