import { Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";
import {getCurrentTimeStamp} from "../../utils/timing";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {stringToBoolean} from "../../utils/stringBoolean";
import {Status, IStatus} from "../../models/status";
import {addLog} from "../../utils/logMethods/addLog";


const createStatusController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;

    // res.status(201).json({myToken})
    //
    // return

    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }

    try {


        const {phoneNumber} = myToken


        const newStatus = req.body

        const arrayListToCheck = [
            ACCESS_LIST.DEPARTMENT_CREATE
        ]
        const hasAccessToAddStatus = await checkAccessList({phoneNumber, arrayListToCheck})

        if (!hasAccessToAddStatus) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
            return
        }

        // check if this phone number is uniq
        const isThereAnyStatusWithThatName: any = await Status.findOne({name: newStatus.name}).exec()


        if (isThereAnyStatusWithThatName) {

            res.status(409).json({
                message: 'نام وضعیت تکراری',
            });
            return
        }


        // احتمال اینکه همون موقع یه نیروی ادمینی با ادمین اصلی لج کرده باشه ممکنه که اینجا بخواد مثلا مثلا دپارتمان بیاد تعریف کنه که باید بگم شرمند
        // البته کاربری توی توکن چک میشه


        const userFound: IUser | null = await User.findOne({phoneNumber: myToken.phoneNumber})

        if (!userFound) {
            res.status(500).json({message: "کاربری تایید نشد."});
            return
        }

        const userId = userFound?.id


        //باید جلوی اوردر تکراری رو بگیرم
        const foundStatusForOrder: IStatus | null = await Status.findOne({order: newStatus.order}).exec();

        // res.status(409).json({foundStatus, message: foundStatus,});
        // return;

        if (foundStatusForOrder && foundStatusForOrder?.order !== '') {
            res.status(409).json({
                message: 'قبلا یک وضعیت با این ترتیب(order)  ثبت شده است'
            });
            return
        }

        const foundStatusFinal: IStatus | null = await Status.findOne({isFinal: true}).exec();

        if (foundStatusFinal?.isFinal === newStatus?.isFinal) {
            res.status(409).json({
                message: 'فقط یک وضعیت میتواند  وضعیت نهایی داشته باشد. قبلا یک استاتوس با وضعیت نهایی ثبت شده است.',
                foundStatusFinal
            })
            return
        }


        const newStatusObject: any = {

            userId,
            name: newStatus?.name,
            statusCode: newStatus.statusCode,
            colorCode: newStatus.colorCode,
            description: newStatus.description,
            isActive: stringToBoolean(newStatus.isActive),
            isFinal: stringToBoolean(newStatus.isFinal),
            order: newStatus.order,
            createAt: getCurrentTimeStamp(),
            updateAt: getCurrentTimeStamp(),

        }


        const result = await Status.create(newStatusObject);
        await addLog({
            req: req,
            name: myToken?.UserInfo?.userData?.userData?.name + " " + myToken?.UserInfo?.userData?.userData?.familyName,
            phoneNumber: req?.myToken?.phoneNumber || "00000000000",
            description: `وضعیت جدید ایجاد شد 
            ${JSON.stringify(newStatusObject)}
            `,
            statusCode: 200,
        })

        res.status(200).json({result, message: 'وضعیت با موفقیت ایجاد شد.',});
        return;

    } catch (error:any) {
        await addLog({
            req: req,
            name: myToken?.UserInfo?.userData?.userData?.name + " " + myToken?.UserInfo?.userData?.userData?.familyName,
            phoneNumber: req?.myToken?.phoneNumber || "00000000000",
            description: `خطا در ایجاد وضعیت جدید`,
            error: error.toString(),
            statusCode: 500,
        })

        res.status(500).json({
            error: error?.toString(),
        });
        return
    }

};

export {createStatusController};
