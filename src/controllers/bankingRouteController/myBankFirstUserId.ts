import {Response, NextFunction} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import getBankingData from "../../utils/banking/getBankingData/getBankingData";
import getBankingDataByCode from "../../utils/banking/getBankingDataByCode/getBankingDataByCode";
import {userListAndCodes} from "../../utils/banking/getBankingDataByCode/userListAndCodes";


const myBankFirstUserId = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    const filters = req.body.filterItems;

    // res.status(201).json({myToken})
    //
    // return

    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }

    try {


        // اینجا اول بر اساس  اینک کاربر کی باشه مدیر باشه یا هر چیزی داشتم چک میکردم و تابعش رو هم نوشتم
        // اما مدیر مالی فقط براساس داده های حسابفا دیتا میخواد و منم مجبور شدم تابع جدید بنویسم

        // const result = await getBankingData({type: "user", filters, myToken})
        //
        const {phoneNumber} = myToken;

        const newUserList = userListAndCodes.find(row => row.phoneNumber === phoneNumber)
        if(!newUserList){
            const message = 'توی لیست سفارش گیر های نمارنگ نیستی!'
            res.status(403).json({message});
            return
        }
        const filters11 = req.body.filterItems

        const result = await getBankingDataByCode({filters: filters11 || []}, [newUserList])


        res.status(200).json({
            data: result,
            message: 'اطلاعات به روز شد.',
        });
        return;


    } catch (error) {

        res.status(500).json({
            error: error?.toString(),

        });
        return
    }


};

export {myBankFirstUserId};
