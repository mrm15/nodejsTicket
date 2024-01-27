import {getCurrentTimeStamp} from "../../utils/timing";
import {Request, Response, NextFunction} from 'express';



const getUserAgentData = (req: Request) => {
    const ip = typeof req.headers['x-forwarded-for'] === 'string'
        ? req.headers['x-forwarded-for']?.toString() // Take the first IP if there are multiple
        : (req.socket.remoteAddress || 'ip Not Detect');
    const os = req?.useragent?.os || 'not Detect Os';
    const useragent = JSON.stringify(req?.useragent) || 'not Detect useragent';
    const loginTime = getCurrentTimeStamp();

    return {
        ip,
        os,
        useragent,
        loginTime
    }
}
export {getUserAgentData}