import { logEvents } from './logEvents';
import { NextFunction, Request, Response } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    logEvents(`${err.name}:${err.message}`, 'errLog.txt').then((r) => {
        console.log('Mission Done!');
    });
    console.error(err.stack);
    res.status(500).send({
        message: err.message,
    });
};

export {errorHandler};
