import { logEvents } from './logEvents';
import { NextFunction, Request, Response } from 'express';

const errorHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    await logEvents(`${err.name}:${err.message}`, 'errLog.txt')
    //console.error(err.stack);
    res.status(500).send({
        message: err.message,
    });
};

export {errorHandler};
