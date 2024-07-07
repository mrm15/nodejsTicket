import axios from "axios";
import {IUser} from "../../models/User";

export const submitAddOrEditContactToHesabfa = async (myContact:any) => {

    try {


        const API_KEY = process.env.HESABFA_API_KEY
        if (!API_KEY) {
            throw new Error('Invalid API_KEY: Environment variable API_KEY is missing');
        }
        const LOGIN_TOKEN = process.env.HESABFA_LOGIN_TOKEN
        if (!LOGIN_TOKEN) {
            throw new Error('Invalid LOGIN_TOKEN: Environment variable LOGIN_TOKEN is missing');

        }


        if (!myContact) {
            throw new Error('Invalid data:  contact Data is missing');

        }

        const contact  = {
            Code: myContact?.contactCode,
            Name: myContact?.name,
            FirstName: myContact?.name,
            LastName: myContact?.familyName,
            ContactType: "1", // اشخاص رو حقیقی در نظر میگیریم
            EconomicCode: myContact?.economicCodeCompany,
            RegistrationNumber: myContact?.registerNumberCompany,
            Address: myContact?.address,
            Phone: myContact?.phoneNumber,
            Mobile: myContact?.mobile,
            Tag: "از سایت",
        }
        if (!contact.Code) {

            delete contact.Code
        }
        // من باید اول چک کنم که آیا کاربری با بای نشماره تلفن توی سایت حسابفسا ذخیره شده یا نه.
        // اصلا بیا یه کار دیگه کنیم.
        // کاربری اگه اومد ثبت نام کرد.
        //
        // من دیگه کار نداشته باشیم که حسابفا چه تصمیمی میگیره
        // خودم اول باید چک کنم که توی سایت خودم ثبت شده یا نه. بعدش میرم توی حسابفا ثیت یا ویرایشش میکنم
        // که این خودش  یکی از مهمترین چیزاش اینه که من اطلاعات مشتری هامو باید با حسابفا سینک کنم
        // به همه ی کاربرام کد مشتری میدم. و زمانی که دارم سینک میکنم ملاک من کد مشتری هست که با اون سینک کنم.
        // کسایی که توی سایت من هستن و کد مشتری ندارن نمیتونن فاکتور بزنن و باید دستی براشون کد مشتری رو از روی حسابفا نگاه کنم و اینجا بزنم.

        try {
            const url = ' https://api.hesabfa.com/v1/contact/save'
            const data = {
                apiKey: API_KEY,
                loginToken: LOGIN_TOKEN,
                contact
            }
            debugger
            const result = await axios.post(url, data);
            debugger
            return result?.data


        } catch (error: any) {
            throw new Error(error.toString() + " " + "statusCode: " + error?.status);

        }

    } catch (error) {
        throw new Error(error?.toString() + " ");

    }


}