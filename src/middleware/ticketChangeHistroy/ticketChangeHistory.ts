import {Request as ExpressRequest, Response, NextFunction} from 'express';
import jwt, {JwtPayload, } from 'jsonwebtoken';

// Define a custom Request type that extends ExpressRequest
export interface CustomRequestMyTokenInJwt extends ExpressRequest {
    myToken?: JwtPayload['myToken']
}

const ticketChangeHistory = (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction): void => {


    next();

}

export {ticketChangeHistory};
