import {Request as ExpressRequest, Response, NextFunction} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';

// Define a custom Request type that extends ExpressRequest
export interface CustomRequestMyTokenInJwt extends ExpressRequest {
    myToken?: JwtPayload['myToken']
}

const verifyJWT = (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    const authHeaderValue = Array.isArray(authHeader) ? authHeader[0] : authHeader; // Ensure authHeader is a string

    if (!authHeaderValue?.startsWith('Bearer ')) {
        res.sendStatus(401);
        return; // Return early to avoid further execution
    }

    const token = authHeaderValue.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err: any, decoded: any) => {
            if (err) {
                const message = 'Token is Not Valid.☹️ try get new Token!'

                res.status(403).json({message});
                return; // Return early to avoid further execution
            } //invalid token
            // Assign userInfo directly to req object

            req.myToken = decoded
            next();
        }
    );
};

export {verifyJWT};
