import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';
import { Request, Response, NextFunction } from 'express';

const logEvents = async (message: string, logName: string): Promise<void> => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (err) {

    }
};

const logger = (req: Request, res: Response, next: NextFunction): void => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt').then((r) => {

    });
    next();
};

export { logger, logEvents };
