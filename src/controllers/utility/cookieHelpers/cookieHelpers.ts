import express, {Request, Response} from 'express';

export const setJwtCookie = (res: Response, token: string) => {
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 * 30, // 30 day in milliseconds
        // maxAge: 1000 ,
    });
}

export const clearJwtCookie = (res: Response): void => {
    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
    });
};

export const clearAllCookies = (req: Request, res: Response) => {
    if (req?.cookies) {
        const cookies = req.cookies;
        for (let cookie in cookies) {
            res.clearCookie(cookie, {
                httpOnly: true,
                sameSite: 'none', // Use 'lax' or 'strict' depending on your requirement
                secure: true, // Set to false if not using HTTPS
            });
        }
    }


};



