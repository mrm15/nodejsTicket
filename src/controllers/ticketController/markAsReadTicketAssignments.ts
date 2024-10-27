import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import sleep from "../../utils/sleep";
import getDataByAggregation2
    from "../../utils/ticketAssigmentUtils/readDepartmentTicketsControllerUtils/getDataByAggregation2";
import resultOfMarkAsReadArray from "../../utils/ticketAssigmentUtils/resultOfMarkAsReadArray/resultOfMarkAsReadArray";

const markAsReadTicketAssignments = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    try {

        const {ticketAssignmentIdsArray, readStatus} = req.body;
        if (!ticketAssignmentIdsArray || ticketAssignmentIdsArray.length === 0 || !readStatus) {
            res.status(500).json({message: "ورودی نامعتبر"});
            return
        }

        const resultOfMarkAsRead = await resultOfMarkAsReadArray({ticketAssignmentIdsArray: [], readStatus: true})
        return res.status(200).json(resultOfMarkAsRead);
    } catch (error: any) {

        res.status(500).json({error: error.toString()});
        return
    }


};

export {markAsReadTicketAssignments};
