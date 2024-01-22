import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {IUser, User} from '../../models/User'; // Adjust this import based on your actual User model
import {loginCodeGenerator, generateLoginSms} from '../../utils/number';
import {getCurrentTimeStamp} from '../../utils/timing';

interface LoginRequestBody {
    phoneNumber: string;
}

interface VerifyRequestBody {
    phoneNumber: string;
    loginCode: string;
}

const handleLoginSMS = async (req: Request<{}, {}, LoginRequestBody>, res: Response, next: NextFunction): Promise<void> => {
    const {phoneNumber} = req.body;

    if (!phoneNumber) {
        res.status(400).json({message: 'شماره تلفن یافت نشد'});
        return
    }

    try {
        const user : IUser | null = await User.findOne({phoneNumber}).exec();

        if (!user) {
            res.status(401).json({
                status: false,
                message: "کاربری با این شماره تلفن یافت نشد!"
            });
            return
        }

        if (!user.isActive) {
            res.status(401).json({
                status: false,
                message: "کاربر غیر فعال است. لطفا تلاش نکنید."
            });
            return
        }

        const loginCode = loginCodeGenerator();
        const text = generateLoginSms(loginCode);
        // Uncomment the following lines if you have the sendSms function ready
        // const isSend = await sendSms(text, phoneNumber);
        // if (!isSend) {
        //   return res.status(500).json({ status: false, message: "ارسال پیام موفقیت آمیز نبود" });
        // }

        user.loginCode = loginCode;
        // user.loginCodeSendDate = getCurrentTimeStamp();
        // user.updateAt = getCurrentTimeStamp();
        await user.save();

        res.status(200).json({status: true, message: "کد ورود به سایت پیامک شد.", text});
        return
    } catch (err:any) {
        res.status(500).json({message: err?.message});
    }
};

const verifyLoginSMS = async (req: Request<{}, {}, VerifyRequestBody>, res: Response, next: NextFunction): Promise<void> => {
    const {phoneNumber, loginCode} = req.body;

    if (!phoneNumber) {
        res.status(400).json({message: 'شماره تلفن را وارد کنید'});
        return
    }
    if (!loginCode) {
        res.status(400).json({message: 'کد ورود را وارد کنید'});
        return
    }

    const foundUser = await User.findOne({phoneNumber}).exec();

    if (!foundUser) {
        res.status(401).json({message: 'کاربری با این شماره تلفن یافت نشد'});
        return
    }

    if (!foundUser.isRegister) {
        res.status(401).json({message: 'لطفاً ابتدا ثبت نام خود را کامل کنید'});
        return
    }

    if (foundUser.loginCode === "" && foundUser.isRegister) {
        res.status(401).json({message: 'لطفاً مجدداً درخواست ارسال کد ورود دهید.'});
        return
    }

    if (+foundUser.loginCode !== +loginCode) {
        res.status(401).json({message: 'کد ورود صحیح نیست'});
        return
    }

    const roles = Object.values(foundUser.roles).filter(Boolean);

    const accessToken = jwt.sign(
        {UserInfo: {phoneNumber: foundUser.phoneNumber, roles}},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '10s'}
    );

    const newRefreshToken = jwt.sign(
        {username: foundUser.username},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'}
    );

    let newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== req.cookies.jwt);

    if (req.cookies.jwt) {
        const refreshToken = req.cookies.jwt;
        const foundToken = await User.findOne({refreshToken}).exec();

        if (!foundToken) {
            console.log('attempted refresh token reuse at login!');
            newRefreshTokenArray = [];
        }

        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
    }

    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    foundUser.loginCode = '';
    foundUser.updateAt = getCurrentTimeStamp();
    await foundUser.save();

    res.cookie('jwt', newRefreshToken, {httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000});

    res.json({roles, accessToken});
};

export {handleLoginSMS, verifyLoginSMS};
