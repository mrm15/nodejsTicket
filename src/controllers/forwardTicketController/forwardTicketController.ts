import {NextFunction, Response} from 'express';

import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ITicket, Ticket} from "../../models/ticket";
import {IUser, User} from "../../models/User";
import mongoose from "mongoose";
import forwardTicket from "../../utils/forwardTicketUtils/forwardTicket";


const forwardTicketController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;

    // اینجا باید سه تا مقدار بیاد

    //اولی نام کاربری هست که تیکت باید براش ارسال بشه
    // دومی دپارتمانی هست که باید تیکت براش ارسال بشه
    // سومی مشخصات تیکتی هست که باید بیاد سمت ما

    // ما باید اول چک کنیم و تایید بگیریم ایشون میتونه تیکت ها رو فروراد کنه
    // که چک کردن اینکه آیا کاربر میتونه تیکت فروارد کنه یا نه رو بعدا انجام میدم. و خیلی مهمه

    //و در ادامه تیکت رو به لیست تیکت های کاربر اضافه میکنم.
    //

    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    let {
        tickets,
        department,
        user,
    } = req.body;

    if (tickets.length === 0) {
        res.status(406).json({
            message: 'لطفا یک تیکت انتخاب کنید.',
        });
        return
    }
    try {
        // اینجا بعدا باید توکن رو ببینم و بر اساس یوزر آیدی تشخیص بدم آیا کاربر  ادمین کل هست؟ یا اینکه ادمنی دپارتمان هست و یا اینکه کاربر معمولی هست


        // خب بریم اول روی آرایه ی تیکت ها لوپ بزنیم
        //
        // اول دپارتمان
        // روی تیکت ها لوپ میزنم و دپارتمانشون رو عوض میکنم

        // تیکت که باید پر باشه. آرایه ای از تیکت هایی که قراره فروارد بشه ینی بره توی کالکشن تیکت های اختصاص داده شده
        // اگه کاربر داشت که با نوع اختصاص به کاربر ثبتش میکنم
        // اگه کاربر نداشت و دپارتمان داشت باید از نوه اختصاص به دپارتمان ثبتش کنم
        // همچنین باید توی خود تیکت بگم که آقا خود تیکت هم دپارتمان مقصدش عوض شده


        /////// قراره کد هایی پایین رو پاک کنم چون قدیمی هستن و اون موقع من جدول مربوط به تیکت های اختصاص داده شده رو نداشتم که وضعیت خواندن ور توش نگه دارم

        /*
        اول باید برم توی تیکت و آخرین دپارتمان و آخرین کاربر رو عوض کنم که این کار همیشه باید انجام بشه

        اگه کاربر خالی بود هم که خب خالیه دیگه


                * اول باید مقادیر ورودی رو بگیرم.
        * اگه کاربر پر بود ینی داره ارجاع میشه به کاربر
        * پس منم باید تیکت رو ازجاع بدم به کاربر چجوری؟


        * بعدش
        *
        *
        * */

        // هر وقت بخوایم تیکت رو فروارد کنیم باید اول توی دپارتمان خود تیکت تغییر بدیم
        // و بعدش توی تیکت های ارجاعی یه رکورد ثبت کنیم
        // پس باید یه کاری کنیم
        // کاربر و دپارتمان و آرایه ای از تیکت ها رو بدیم به تابع مون تا کارا رو برمون انجام بده و نتیجه رو بگه
        const senderUserIdTemp = myToken?.UserInfo?.userData?.userData?.userId;
        const foundSenderUserIdLean: IUser | null = await User.findOne({_id: senderUserIdTemp}).lean();

        if (!foundSenderUserIdLean) {
            res.status(500).json({
                message: 'کاربر یافت نشد!',
            });
            return
        }
        const senderUserId = foundSenderUserIdLean?._id

        const resultOfTask = await forwardTicket({
            ticketArray: tickets,
            departmentId: department,
            userId: user,
            senderUserId
        })

        res.status(200).json({
            message: "ارجاع شد.",
        });
        return

    } catch (error) {
        res.status(500).json({
            message: error?.toString(),
            error
        });
        return
    }


};

export {forwardTicketController};
