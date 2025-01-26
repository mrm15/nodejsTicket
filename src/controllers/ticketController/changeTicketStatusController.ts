import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {addLog} from "../../utils/logMethods/addLog";
import {changeTicketStatus} from "../../utils/ticketUtils/changeTicketStatus/changeTicketStatus";

const changeTicketStatusController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    try {

        const {userId} = myToken?.UserInfo?.userData?.userData;
        const {ticketIdArray, newStatus} = req.body;
        if (!ticketIdArray || ticketIdArray.length === 0 || !newStatus) {
            res.status(500).json({message: "ورودی نامعتبر"});
            return
        }

        const resultOfChangeStatus = await changeTicketStatus({
            userId,
            ticketIdArray,
            newStatusId: newStatus,
        })
        await addLog({
            req: req,
            name: myToken?.UserInfo?.userData?.userData?.name + " " + myToken?.UserInfo?.userData?.userData?.familyName,
            phoneNumber: req?.myToken?.phoneNumber || "00000000000",
            description: `
             تعداد
            ${resultOfChangeStatus?.updatedCount}
            تیکت
        به حالت    
            ${resultOfChangeStatus?.newStatus}
           تغییر وضعیت داده شد.
            `,
            statusCode: 200,
        })
        return res.status(200).json(resultOfChangeStatus);
    } catch (error: any) {

        res.status(500).json({error: error.toString()});
        return
    }


};

export {changeTicketStatusController};
