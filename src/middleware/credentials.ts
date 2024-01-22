import { Request, Response, NextFunction } from 'express';
import allowedOrigins from '../config/allowedOrigins';

const credentials = (req: Request, res: Response, next: NextFunction): void => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(<string>origin)) {
        res.header('Access-Control-Allow-Credentials', 'true');
    }
    next();
};

export default credentials;
