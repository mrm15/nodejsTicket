import {Request, Response} from 'express';
import {getCurrentTimeStamp} from '../../utils/timing';
import {loginCodeGenerator, generateLoginSms} from '../../utils/number';
import {User, IUser} from '../../models/User';

const handleNewUserSMS = async (req: Request, res: Response): Promise<void | Response<any>> => {
    try {
        const {phoneNumber} = req.body;
        if (!phoneNumber) {
            return res.status(400).json({'message': 'Username and password are required.'});
        }

        let operatingStatus = 'insert';

        const user: IUser | null = await User.findOne({phoneNumber}).exec();

        if (user) {
            operatingStatus = 'update';

            if (user.isRegister) {
                return res.status(401).json({
                    status: false,
                    message: 'You are in the registration form, and this user is already registered. Please check the phone number again.'
                });
            }
        }

        const loginCode = loginCodeGenerator();
        const text = generateLoginSms(loginCode);

        const currentTimeStamp = getCurrentTimeStamp();

        if (operatingStatus === 'insert') {
            await User.create({
                phoneNumber,
                loginCode,
                loginCodeSendDate: currentTimeStamp,
                createAt: currentTimeStamp
            });
        } else {
            if (user) {
                user.loginCode = loginCode.toString();
                user.loginCodeSendDate = currentTimeStamp.toString();
                user.createAt = currentTimeStamp.toString();
                await user.save();
            }
        }

        return res.status(200).json({'status': true, message: 'Registration code sent successfully.', text});
    } catch (err: any) {
        return res.status(500).json({'message': err?.message});
    }
};


const handleVerifySMS = async (req: Request, res: Response) => {
    try {
        const {phoneNumber, loginCode} = req.body;

        if (!phoneNumber) return res.status(400).json({'message': 'شماره تلفن یافت نشد'});
        if (!loginCode) return res.status(400).json({'message': 'لاگین کد یافت نشد'});

        const user: any = await User.findOne({phoneNumber}).exec();

        // اگه این آدم قبلا ثبت نام کرده بود. باید بگیم داری کلا اشتباه میزنی و گزینه ی آیا تا ب حال ثبت نام شده فعال بود دیگه نباید اجازه بدیم ادامه بده
        if (user?.isRegister) {
            return res.status(401).json({
                status: false, message: "این کاربر از قبل ثبت نام شد، شماره تماس را مجددا بررسی کنید."
            });
        }

        if (user?.loginCode !== loginCode) {
            return res.status(401).json({status: false, message: "کد وارد شده صحیح نیست. مجددا بررسی کنید."});
        }

        user.isRegister = true
        user.loginCode = ""
        user.updateAt = getCurrentTimeStamp().toString();
        // اگه میرعرب و سرایی بودن اونا رو ادمین کن
        const adminArray = ["09384642159", "09157863770",]

        const adminRole = {User: 2001, Editor: 5150, Admin: 1984};
        const userRole = {User: 2001}
        user.roles = (adminArray.includes(phoneNumber)) ? adminRole : userRole

        await user.save();

        // اینجا باید به کاربر توکن بدم بعدا
        res.status(200).json({status: true, message: "ثبت نام با موفقیت انجام شد"})
    } catch (err) {
        res.status(500).json({'message': err.message});
    }
}

export {handleNewUserSMS, handleVerifySMS};
