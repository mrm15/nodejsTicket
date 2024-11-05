import {Request, Response, NextFunction} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import path from "path";
import {getUserAgentData} from "../LoginRegisterSms/getUserAgentData";
import {timestampToTime} from "../../utils/timestampToTime";

const downloadController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {
    const {myToken} = req;
    const filePath = path.join(__dirname, '../../../uploads', req.params.id);

    try {
        res.sendFile(filePath, (err) => {
            if (err) {
                if (!res.headersSent) {
                    const systemData = getUserAgentData(req);
                    const {useragent, ...rest} = { ...systemData };

                    res.status(404).send({
                        message: 'فایلی با این نام یافت نشد. تمامی مشخصات سیستم شما، آدرس آی پی و... جهت پیگیری ثبت شد.',
                        ...rest,
                        loginTime: timestampToTime(systemData.loginTime),
                    });
                    return; // Exit early to ensure no further code is executed
                }
            }
        });
        return; // Exit after initiating `sendFile`
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).send({error: error?.toString()});
            return; // Exit early after handling the error
        }
    }
};

export {downloadController};
