import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';
import { Request, Response, NextFunction } from 'express';
import {logEvents} from "../utils/logEvents";



const logger = (req: Request, res: Response, next: NextFunction): void => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt').then((r) => {

    });
    next();
};

export { logger, logEvents };
