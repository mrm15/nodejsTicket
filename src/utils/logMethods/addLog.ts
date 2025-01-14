import { getUserAgentData } from "../../controllers/LoginRegisterSms/getUserAgentData";
import { getCurrentTimeStamp } from "../timing";
import { ILogs, LogModel } from "../../models/logs";
import { CustomRequestMyTokenInJwt } from "../../middleware/verifyJWT";
import { Request } from 'express';

interface IInputObject {
    req: CustomRequestMyTokenInJwt | Request;
    phoneNumber: string;
    description: string;
    statusCode: number;
    responseTime?: null | number;
    error?: Record<string, any> | string | null; // Flexible error type
}
interface IInputObjectSocket {
    phoneNumber: string;
    description: string;
    statusCode: number;
    error?: Record<string, any> | string | null; // Flexible error type
}

const addLog = async ({
                          req,
                          phoneNumber,
                          description,
                          statusCode,
                          responseTime,
                          error,
                      }: IInputObject) => {
    try {
        // Extract data from the request
        const { ip, os, useragent } = getUserAgentData(req);

        // Prepare the log entry
        const logEntry = {
            phoneNumber: phoneNumber || null, // Assuming the phone number is in the request
            description: description || null, // Optional description
            ipAddress: ip,
            userAgent: useragent,
            route: req.originalUrl || null,
            method: req.method || null,
            statusCode: statusCode || null,
            timestamp: getCurrentTimeStamp(),
            responseTime: responseTime || null, // Log response time
            payload: req.body || {}, // Log request body
            headers: req.headers || {},
            deviceType: req?.useragent?.platform || 'unknown',
            os,
            browser: req?.useragent?.browser || 'unknown',
            error: error || null, // Log any error if present
        };

        // Insert the log into the collection
        const log = new LogModel(logEntry);
        await log.save();

        // Uncomment for debugging
        // console.log('Log saved successfully:', log);
    } catch (err) {
        // Handle logging error
        // console.error('Error saving log:', err);
    }
};


const addSocketLog = async ({
                                phoneNumber,
                                description,
                                statusCode,

                            }: IInputObjectSocket)=>{


    console.log({
        phoneNumber,
        description,
        statusCode,

    })
    return 0

}
export { addLog };
