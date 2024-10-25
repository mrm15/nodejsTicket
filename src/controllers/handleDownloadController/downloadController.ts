import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";
import {getCurrentTimeStamp} from "../../utils/timing";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {Department} from "../../models/department";
import {stringToBoolean} from "../../utils/stringBoolean";
import path from "path";
import {getUserAgentData} from "../LoginRegisterSms/getUserAgentData";
import {timestampToTime} from "../../utils/timestampToTime";

const downloadController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;


    const filePath = path.join(__dirname, '../../../uploads', req.params.id);
    // Send the file


    // res.status(500).send({filePath});
    // return
    // اینجا باید به دانلود فایل یکی اضافه کنم
    // Send the file
    try {
        res.sendFile(filePath, err => {
            if (err) {

                let systemData = getUserAgentData(req)
                 let {useragent , ...rest} = {...systemData}
                res.status(404).send({
                    message: 'فایلی با این نام یافت نشد. تمامی مشخصات سیستم شما، آدرس آی پی و... جهت پیگیری ثبت شد.',
                    ...rest,
                    loginTime: timestampToTime(systemData.loginTime),
                });
            }
        })
        return
    } catch (error) {
        res.status(500).send({error: error?.toString()});
        return
    }


    // res.status(200).json({message:filePath})
    // return


};

export {downloadController};
