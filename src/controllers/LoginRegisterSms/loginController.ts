import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {IUser, User} from '../../models/User'; // Adjust this import based on your actual User model
import {loginCodeGenerator, generateLoginSms} from '../../utils/number';
import {getCurrentTimeStamp} from '../../utils/timing';
import {ClientSession} from 'mongodb';
import {
    Document,
    Model,
    Types,
    DocumentSetOptions,
    QueryOptions,
    UpdateQuery,
    AnyObject,
    PopulateOptions,
    MergeType,
    Query,
    SaveOptions,
    ToObjectOptions,
    FlattenMaps,
    Require_id,
    UpdateWithAggregationPipeline,
    pathsToSkip,
    Error
} from 'mongoose';
import {addNewUserF} from "./addNewUserF";
import {getRoleAccessList} from "./getRoleAccessList";
import {generateAccessToken, generateRefreshToken} from "./generateAccessToken";
import {getUserAgentData} from "./getUserAgentData";
import {getUserInfoByPhoneNumber} from "./getUserInfoByPhoneNumber";


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


    // TEST ADD NEW USER
    // try {
    //
    //     const newUser1 =  await newUSerTest()
    //     res.status(201).send(newUser1);
    //     return
    //
    // }catch (error:any){
    //     res.status(201).send(error);
    // }


    try {
        let user: IUser | null = await User.findOne({phoneNumber}).exec();

        // بعدا که قرار شد ثبت نام کاربر باز باشه اینجا کاربر رو ثبت نام میکنم. و یه رکورد براش توی دیتا بیس ثبت میکنم
        if (!user) {
            // res.status(401).json({
            //     status: false,
            //     message: "کاربری با این شماره تلفن یافت نشد!"
            // });

            // return
            //   اگه قرار شد که  ثبت نام باز باشه اینو باید از کامنت در بیارم
            try {

                debugger
                await addNewUserF(phoneNumber)
                user = await User.findOne({phoneNumber}).exec()!;
                if (!user) {
                    res.status(401).json({
                        status: false,
                        message: "کاربری با این شماره تلفن یافت نشد!"
                    });

                    return


                }

            } catch (error: any) {
                res.status(201).send(error);
                return
            }

        }


        // کلا شرط ورود کاربر اینه که ادمین کاربر رو غیر فعال نکرده باشه.  اگه غیر فعال کرده باشه هیچوقت نمیتونه وارد بشه
        if (!user.isActive) {
            res.status(401).json({
                status: false,
                message: "کاربر غیر فعال است. لطفا تلاش نکنید."
            });
            return
        }

        // اول چک میکنم آیا زمان فعلی سیستم  تا زمانی که کاربر آخرین بار درخواست کد وروود داده بیشتر از 1 دقیقه گذشته یا نه
        const currentTime = getCurrentTimeStamp()
        const savedTimestamp = user.loginCodeSendDate;
        if (savedTimestamp) {

            const savedDate = savedTimestamp instanceof Date ? savedTimestamp : new Date(savedTimestamp);
            const differenceInSeconds = Math.abs((currentTime.getTime() - savedDate.getTime()) / 1000);

            const waitedInSeconds = Math.floor(differenceInSeconds);
            const waitTimeForAnotherRequest = 10
            if (waitedInSeconds < waitTimeForAnotherRequest) {
                const waitMore = waitTimeForAnotherRequest - waitedInSeconds
                const message = `لطفا  ${waitMore} ثانیه دیگر صبر کنید.`
                res.status(403).json({status: true, message});
                return
            }
        }


        // کد ورود رو ست میکنم.
        const loginCode = loginCodeGenerator();
        const text = generateLoginSms(loginCode);
        // Uncomment the following lines if you have the sendSms function ready
        // const isSend = await sendSms(text, phoneNumber);
        // if (!isSend) {
        //   return res.status(500).json({ status: false, message: "ارسال پیام موفقیت آمیز نبود" });
        // }

        user.loginCode = loginCode;
        user.loginCodeSendDate = new Date();
        // user.loginCodeSendDate = getCurrentTimeStamp();
        // user.updateAt = getCurrentTimeStamp();
        await user.save();

        res.status(200).json({status: true, message: "کد ورود به سایت پیامک شد.", text});
        return
    } catch (err: any) {
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

    const foundUser: IUser | null = await User.findOne({phoneNumber}).exec();

    if (!foundUser) {
        res.status(401).json({message: 'کاربری با این شماره تلفن یافت نشد'});
        return
    }

    if (!foundUser.isActive) {
        res.status(401).json({message: 'کاربر فعال نیست. تلاش نکنید'});
        return
    }

    if (!foundUser.loginCode === null) {
        res.status(401).json({message: 'لطفاً مجدداً درخواست ارسال کد ورود دهید.'});
        return
    }

    if (foundUser.loginCode !== +loginCode) {
        res.status(401).json({message: 'کد ورود صحیح نیست'});
        return
    }


    const accessToken = await generateAccessToken(foundUser.phoneNumber)
    const refreshToken = await generateRefreshToken(foundUser.phoneNumber)

    let tokenArrayList = foundUser.tokens.slice();

    debugger

    // for first time   there is no jwt so don't need to do any thong
    if (req?.cookies?.jwt) {
        const refreshTokenInCookieJwt = req.cookies.jwt;


        let foundRefreshToken = tokenArrayList?.filter(rt => rt?.refreshToken === refreshTokenInCookieJwt)


        // const foundToken = await User.findOne({refreshToken: refreshToken.refreshToken}).exec();

        if (!foundRefreshToken) {

            //newRefreshTokenArray = [];
        }

        // @ts-ignore
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
    }


    const {os, ip, useragent, loginTime} = getUserAgentData(req)

    const newToken = {refreshToken, os, ip, useragent, loginTime}


    foundUser.tokens = [...tokenArrayList, newToken];

    foundUser.loginCode = 0;
    foundUser.updateAt = getCurrentTimeStamp();

    try {
        await foundUser.save();
        res.cookie('jwt', refreshToken, {httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000});
        const userInfo = await getUserInfoByPhoneNumber(phoneNumber)
        res.json({userInfo, accessToken});
        return;
    } catch (error) {
        res.status(401).json({error});
    }


};

export {handleLoginSMS, verifyLoginSMS};
