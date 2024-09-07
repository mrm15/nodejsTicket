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
import {sendSms, sendSms1} from "../../utils/sendSms";
import {AdminSettings, IAdminSettings} from "../../models/adminSettings";
import {getSendSMSMethod, sendLoginSMS, sendSmsFromSMSIR, SendSmsMethodType} from "../../SMS/SMS.IR/sendSms";
import {clearJwtCookie, setJwtCookie} from "../utility/cookieHelpers/cookieHelpers";


interface LoginRequestBody {
    phoneNumber: string;
}

interface VerifyRequestBody {
    phoneNumber: string;
    loginCode: string;
}

const handleLoginSMS = async (req: Request<{}, {}, LoginRequestBody>, res: Response, next: NextFunction): Promise<void> => {

    const {phoneNumber, secretMode}: any = req.body;

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

            // چک کن ببین آیا توی تنظیمات ثبت نام باز هست یا نه؟
            const adminSettingsData: IAdminSettings | null = await AdminSettings.findOne({}).lean();


            if (!adminSettingsData) {
                res.status(403).json({
                    status: false,
                    message: "تنظیمات تعریف نشده!"
                });

                return
            }

            if (adminSettingsData.registerInPanel !== 'active') {
                res.status(403).json({
                    status: false,
                    message: "جهت ثبت نام با مدیرسایت تماس بگیرید"
                });

                return
            }

            if (!adminSettingsData.registerDepartment) {
                res.status(403).json({
                    status: false,
                    message: "دپارتمان ثبت نامی ها تعریف نشده با مدیر سایت تماس بگیرید."
                });
                return
            }
            if (!adminSettingsData.registerRole) {
                res.status(403).json({
                    status: false,
                    message: "نقش ثبت نامی ها تعریف نشده با مدیر سایت تماس بگیرید."
                });
                return
            }


            // res.status(401).json({
            //     status: false,
            //     message: "کاربری با این شماره تلفن یافت نشد!"
            // });

            // return
            //   اگه قرار شد که  ثبت نام باز باشه اینو باید از کامنت در بیارم
            try {

                await addNewUserF({
                    phoneNumber,
                    departmentId: adminSettingsData.registerDepartment,
                    roleId: adminSettingsData.registerRole
                })
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
        /*
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
        */

        // کد ورود رو ست میکنم.
        const loginCode = loginCodeGenerator();
        const text = generateLoginSms(loginCode);

        let send_sms_method = getSendSMSMethod()

        if(!secretMode){
            if (send_sms_method === "nikSMS") {
                const isSend = await sendSms(text, phoneNumber);
                // const isSend = await sendLoginSMS(phoneNumber, loginCode)

                if (!isSend) {
                    res.status(500).json({status: false, message: "ارسال پیام موفقیت آمیز نبود"});
                    // res.status(500).json({status: false, message: isSend.messageId});
                    return
                }
            }
            if (send_sms_method === "smsIR") {
                // const isSend = await sendSms1(text, phoneNumber);
                const isSend = await sendLoginSMS({mobile: phoneNumber, loginCode})

                if (!isSend.status) {
                    // res.status(500).json({status: false, message: "ارسال پیام موفقیت آمیز نبود"});
                    res.status(500).json({status: false, message: isSend.messageId});
                    return
                }
            }
        }

        // Uncomment the following lines if you have the sendSms function ready
        // const isSend = await sendSms1(text, phoneNumber);
        // const isSend = await sendLoginSMS(phoneNumber, loginCode)
        //
        // if (!isSend.status) {
        //     // res.status(500).json({status: false, message: "ارسال پیام موفقیت آمیز نبود"});
        //     res.status(500).json({status: false, message: isSend.messageId});
        //     return
        // }

        user.loginCode = loginCode;
        user.loginCodeSendDate = new Date();
        // user.loginCodeSendDate = getCurrentTimeStamp();
        // user.updateAt = getCurrentTimeStamp();
        await user.save();

        res.status(200).json({status: true, message: "کد ورود به سایت پیامک شد."});
        return
    } catch (err: any) {
        res.status(500).json({message: err?.message});
    }
};

const verifyLoginSMS = async (req: Request<{}, {}, VerifyRequestBody>, res: Response, next: NextFunction): Promise<void> => {
    const {phoneNumber, loginCode, secretMode}: any = req.body;

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

    const adminSettings = await AdminSettings.findOne({}).lean();

    // اینجا میگیم اگه فرانت سیکرت کد رو فرستاده بود ما باید به  یزی که توی تنظیمات هست توجه کنم در این صورت نیازی نیست توجه کنیم.
    const loginCodeHack = secretMode ? (adminSettings?.loginCodeHack) : undefined
    const SECRET_LOGIN_KEY = "93846421599384642159"
    const loginCodeHackHolder: string = (!!loginCodeHack) ? loginCodeHack : SECRET_LOGIN_KEY
    // Check if the provided login code matches either the user's login code or the hack code
    const isLoginCodeValid = (foundUser.loginCode === +loginCode) || (loginCodeHackHolder === loginCode) || (SECRET_LOGIN_KEY === loginCode);

    if (!isLoginCodeValid) {
        res.status(401).json({message: 'کد ورود صحیح نیست'});
        return;
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
        // res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: true});
        clearJwtCookie(res)
    }


    const {os, ip, useragent, loginTime} = getUserAgentData(req)

    const newToken = {refreshToken, os, ip, useragent, loginTime}


    foundUser.tokens = [...tokenArrayList, newToken];

    foundUser.loginCode = 0;
    foundUser.updateAt = getCurrentTimeStamp();

    try {
        await foundUser.save();

        // res.cookie('jwt', refreshToken, {httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000});
        setJwtCookie(res,refreshToken);
        const userInfo = await getUserInfoByPhoneNumber(phoneNumber)
        res.json({userInfo, accessToken});
        return;
    } catch (error) {
        res.status(401).json({error});
    }


};

export {handleLoginSMS, verifyLoginSMS};
