import { Response, NextFunction} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";

import getAllLogsByAggregation from "../../utils/Logs/logsUtils/getAllLogsByAggregation";

const readLogsController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {
    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست';
        res.status(403).json({message});
        return;
    }

    try {
        const arrayListToCheck = [ACCESS_LIST.fatherAccess];
        const hasAccessToReadAllLogs = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck});
        if (!hasAccessToReadAllLogs) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
            return;
        }
        const myResultAfterChange =await getAllLogsByAggregation({
            filters:req.body.filters,
            page:req.body.page,
            pageSize:req.body.pageSize
        })
        res.status(200).json(myResultAfterChange);
        return;
    } catch (error) {
        res.status(500).json({error});
        return;
    }
};

export {readLogsController};
