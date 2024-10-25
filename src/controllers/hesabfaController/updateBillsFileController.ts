import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {User} from "../../models/User";
import updateBillsFileFunction from "../../utils/updateBillsFileFunction/updateBillsFileFunction";


const updateBillsFileController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست';
        res.status(200).json({message});
        return;
    }

    try {
        const {userId} = myToken?.UserInfo?.userData?.userData;
        const foundUser: any | null = await User.findOne({_id: userId}).lean();

        if (!foundUser) {
            res.status(401).json({message: 'کاربری با این شماره تلفن یافت نشد'});
            return;
        }

        //
        const arrayListToCheck = [
            ACCESS_LIST.fatherAccess
        ]
        const hasAccessToAddRole = await checkAccessList({phoneNumber: foundUser.phoneNumber, arrayListToCheck})

        if (!hasAccessToAddRole) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
            return
        }

        // از تاریخی که داده درخواست میزنم به حسابفا و دونه_دونه دیتا رو میگیرم و توی استخر فاکتور ها ذخیره میکنم.

        const myDateString = req.body.myDate;
        const myDate = new Date(myDateString);
        // Check if myDate is an instance of Date and if it's a valid date
        if (!myDate || !(myDate instanceof Date) || isNaN(myDate.getTime())) {
            res.status(403).json({message: 'مقدار تاریخ درست درخواست داده نشده!'});
            return;
        }

        const startDate = myDate
        const endDate = new Date()

        const resultMessage = await updateBillsFileFunction(startDate, endDate) // میخوام کل فاکتور ها رو بگیرم تا گزارش تعداد تایید نشده ها رو هم بتونم بعدا بگیرم
        res.status(200).json({

                message: resultMessage

        });

    } catch (error) {
        res.status(500).json({error});
        return;
    }
};

export {updateBillsFileController};
