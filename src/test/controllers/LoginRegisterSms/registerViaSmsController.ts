const User = require('../../models/User');
const bcrypt = require('bcrypt');
const {getCurrentTimeStamp} = require("../../utils/timing");
const {loginCodeGenerator, generateLoginSms} = require("../../utils/number");
const {tr} = require("date-fns/locale");
const {sendSms} = require("../../utils/sendSms");

const handleNewUserSMS = async (req, res) => {

  const {phoneNumber: phoneNumber} = req.body;
  if (!phoneNumber) return res.status(400).json({'message': 'Username and password are required.'});

  // check for duplicate phoneNumber in the db
  // const duplicate = await User.findOne({phoneNumber}).exec();


  // if (duplicate) return res.sendStatus(409); //Conflict
  // اینجا رو باید بیام بعدا بنویسم که
  // is registed
  // مقدار دهی شده بود بعدش بیاد بگه
  //شماره تکراری است

  try {
    //encrypt the password
    // const hashedPwd = await bcrypt.hash(pwd, 10);
    const user = await User.findOne({phoneNumber}).exec();
    let operatingStatus = "insert"

    if (user) {
      operatingStatus = "update"

      if (user?.isRegister) {
        return res.status(401).json({
          status: false,
          message: "در فرم ثبت نام هستید  و این کاربر از قبل ثبت نام شده است، شماره تماس را مجددا بررسی کنید."
        });

      }
    }


    const loginCode = loginCodeGenerator()
    const text = generateLoginSms(loginCode)
    // const isSend = await sendSms(text, phoneNumber)
    // if (!isSend) {
    //   res.status(500).json({status: true, message: "ارسال پیام موفقیت آمیز نبود"})
    //   return
    // }


    const currentTimeStamp = getCurrentTimeStamp()

    if (operatingStatus === "insert") {
      await User.create({
        phoneNumber, loginCode, loginCodeSendDate: currentTimeStamp, createAt: currentTimeStamp
      })
    } else {
      //user.phoneNumber = phoneNumber
      user.loginCode = loginCode
      user.loginCodeSendDate = currentTimeStamp
      user.createAt = currentTimeStamp
      await user.save()
    }


    res.status(200).json({'status': true, message: "کد ثبت نام پیامک شد.", text});
  } catch (err) {
    res.status(500).json({'message': err.message});
  }
}

const handleVerifySMS = async (req, res) => {

  let {phoneNumber: phoneNumber, loginCode: loginCode} = req.body;

  if (!phoneNumber) return res.status(400).json({'message': 'شماره تلفن یافت نشد'});
  if (!loginCode) return res.status(400).json({'message': 'لاگین کد یافت نشد'});


  try {
    const currentTimeStamp = getCurrentTimeStamp()
    const user = await User.findOne({phoneNumber}).exec();

    // اگه این آدم قبلا ثبت نام کرده بود. باید بگیم داری کلا اشتباه میزنی و گزینه ی آیا تا ب حال ثبت نام شده فعال بود دیگه نباید اجازه بدیم ادامه بده
    if (user.isRegister) {
      return res.status(401).json({
        status: false, message: "این کاربر از قبل ثبت نام شد، شماره تماس را مجددا بررسی کنید."
      });

    }

    if (+user.loginCode !== +loginCode) {
      return res.status(401).json({status: false, message: "کد وارد شده صحیح نیست. مجددا بررسی کنید."});
    }
    user.isRegister = true
    user.loginCode = ""
    user.updateAt = currentTimeStamp;
    // اگه میرعرب و سرایی بودن اونا رو ادمین کن
    const adminArray = ["09384642159", "09157863770",]

    const adminRole = {User: 2001, Editor: 5150, Admin: 1984};
    const userRole = {User: 2001}
    user.roles = (adminArray.includes(phoneNumber)) ? adminRole : userRole

    await user.save();

    // اینجا باید به ;hvfv توکن بدم بعدا
    res.status(200).json({status: true, message: "ثبت نام با موفقیت انجام شد"})
  } catch (err) {
    res.status(500).json({'message': err.message});
  }
}

module.exports = {handleNewUserSMS, handleVerifySMS};