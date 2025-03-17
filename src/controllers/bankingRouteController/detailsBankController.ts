import {Response, NextFunction} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import getBankingData from "../../utils/banking/getBankingData/getBankingData";
import getBankingDataByCode from "../../utils/banking/getBankingDataByCode/getBankingDataByCode";
import {userListAndCodes} from "../../utils/banking/getBankingDataByCode/userListAndCodes";
import {addLog} from "../../utils/logMethods/addLog";
import {getDetailsByContactCode} from "../../utils/banking/getDetailsByContactCode/getDetailsByContactCode";


const detailsBankController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

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


        const filters11 = req.body.filterItems

        const result = await getDetailsByContactCode({filters: filters11 || []},)

        await addLog({
            req: req,
            name: myToken?.UserInfo?.userData?.userData?.name + " " + myToken?.UserInfo?.userData?.userData?.familyName,
            phoneNumber: req?.myToken?.phoneNumber || "00000000000",
            description: `گزارش متراژ با جزئیات متراژ رو مشاهده کرد.`,
            statusCode: 200,
        })
        res.status(200).json({
            data: {
                details:result
            },
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

export {detailsBankController};
