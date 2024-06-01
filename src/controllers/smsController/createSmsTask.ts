import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {Department, IDepartment} from "../../models/department";
import {getRoleAccessList} from "../LoginRegisterSms/getRoleAccessList";
import * as perf_hooks from "node:perf_hooks";
import {getDepartmentListWithUsers, getSameDepartmentUsers} from "../controllerUtilFunctions/getData";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {AdminSettings, IAdminSettings} from "../../models/adminSettings";
import {IUser, User} from "../../models/User";
import {IRole, Role} from "../../models/roles";
import mongoose from "mongoose";
import {getCurrentTimeStamp} from "../../utils/timing";
import {setForSendMessage} from "../../utils/setForSendMessage";


const createSmsTask = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(200).json({message});
        return
    }


    try {


        const arrayListToCheck = [
            ACCESS_LIST.SMS_SEND
        ]
        const hasAccessTo = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck})

        if (!hasAccessTo) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'})
            return
        }


        const {userId} = myToken?.UserInfo?.userData?.userData;

        const foundUser: IUser | null = await User.findOne({_id: userId}).lean();




        if (!foundUser) {
            res.status(401).json({message: 'کاربری با این شماره تلفن یافت نشد'});
            return
        }





        const {destinationNumber,smsText} = req.body

        if(!destinationNumber && !smsText){
            res.status(500).json({
                message: 'مقادیر ورودی صحیح نیستند',
            })
            return;
        }

        const {smsStatusCode , resultSmsMessage }  = await  setForSendMessage({

            senderUserId:  myToken?.UserInfo?.userData?.userData.userId,
            senderDepartmentId :myToken?.UserInfo?.userData?.userData.departmentId ,
            destinationNumber,
            text:smsText,
            replyId: null ,
        })

        res.status(smsStatusCode).json({message:resultSmsMessage});
        return

        // const userStatus = foundUser.userStatus;
        //
        // res.status(200).json({
        //     userStatus,
        //     message: 'وضعیت کاربر دریافت شد.',
        // })
        // return;


    } catch (error) {

        res.status(500).json({error});
        return
    }


};

export {createSmsTask};
