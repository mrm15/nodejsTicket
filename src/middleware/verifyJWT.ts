import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

// Define a custom Request type that extends ExpressRequest
interface CustomRequest extends ExpressRequest {
    userInfo?: JwtPayload['UserInfo']; // Add the userInfo property
}

const verifyJWT = (req: CustomRequest, res: Response, next: NextFunction): void => {
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
        (err: any, decoded:any) => {
            if (err) {
                debugger;
                res.sendStatus(403);
                return; // Return early to avoid further execution
            } //invalid token
            // Assign userInfo directly to req object
            req.userInfo = decoded?.UserInfo;
            next();
        }
    );
};

export {verifyJWT};