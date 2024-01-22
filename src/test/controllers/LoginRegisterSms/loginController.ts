import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sendSms } from '../../utils/sendSms';
import { getCurrentTimeStamp } from '../../utils/timing';
import { loginCodeGenerator, generateLoginSms } from '../../utils/number';
import User from '../../models/User';

const handleLoginSMS = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: 'شماره تلفن یافت نشد' });
    }

    const user = await User.findOne({ phoneNumber }).exec();

    if (!user) {
      return res.status(401).json({
        status: false,
        message: 'کاربری با این شماره تلفن یافت نشد!'
      });
    }

    if (!user.isRegister) {
      return res.status(401).json({
        status: false,
        message: 'این کاربر هنوز ثبت نام خود را کامل نکرده است'
      });
    }

    const loginCode = loginCodeGenerator();
    const text = generateLoginSms(loginCode);
    const isSend = await sendSms(text, phoneNumber);

    if (!isSend) {
      res.status(500).json({
        status: true,
        message: 'ارسال پیام موفقیت آمیز نبود'
      });
      return;
    }

    const currentTimeStamp = getCurrentTimeStamp();
    user.loginCode = loginCode;
    user.loginCodeSendDate = currentTimeStamp;
    user.updateAt = currentTimeStamp;
    await user.save();

    res.status(200).json({
      status: true,
      message: 'کد ورود به سایت پیامک شد.',
      text
    });
  } catch (err) {
    next(err);
  }
};

const verifyLoginSMS = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const cookies = req.cookies;
    const { phoneNumber, loginCode } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: 'شماره تلفن را وارد کنید' });
    }

    if (!loginCode) {
      return res.status(400).json({ message: 'کد ورود را وارد کنید' });
    }

    const foundUser = await User.findOne({ phoneNumber }).exec();

    if (!foundUser) {
      return res.status(401).json({ message: 'کاربری با این شماره تلفن یافت نشد' });
    }

    if (!foundUser.isRegister) {
      return res.status(401).json({ message: 'لطفاً ابتدا ثبت نام خود را کامل کنید' });
    }

    if (foundUser.loginCode === '' && foundUser.isRegister) {
      return res.status(401).json({ message: 'لطفاً مجدداً درخواست ارسال کد ورود دهید.' });
    }

    if (+foundUser.loginCode !== +loginCode) {
      return res.status(401).json({ message: 'کد ورود صحیح نیست' });
    }

    const roles = Object.values(foundUser.roles).filter(Boolean);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          phoneNumber: foundUser.phoneNumber,
          roles
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '10s' }
    );

    const newRefreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    let newRefreshTokenArray =
      !cookies?.jwt
        ? foundUser.refreshToken
        : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const foundToken = await User.findOne({ refreshToken }).exec();

      if (!foundToken) {
        console.log('attempted refresh token reuse at login!');
        newRefreshTokenArray = [];
      }

      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    }

    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    foundUser.loginCode = '';
    foundUser.updateAt = getCurrentTimeStamp();
    await foundUser.save();

    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ roles, accessToken });
  } catch (err) {
    next(err);
  }
};

export { handleLoginSMS, verifyLoginSMS };
