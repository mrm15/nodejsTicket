import {format} from "date-fns";
import {v4 as uuid} from "uuid";
import fs, {promises as fsPromises} from "fs";
import path from "path";

export const logEvents = async (message: string, logName: string): Promise<void> => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    const directoryUrl = path.resolve(__dirname, "../../pool/logs"); // Use directoryUrl

    try {
        // Ensure the logs directory exists (recursively)
        await fsPromises.mkdir(directoryUrl, { recursive: true });

        // Append the log item to the log file
        await fsPromises.appendFile(path.join(directoryUrl, logName), logItem);
    } catch (err) {
        console.error("Failed to log event:", err);
    }
};
