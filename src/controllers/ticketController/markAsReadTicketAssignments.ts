import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import sleep from "../../utils/sleep";
import getDataByAggregation2
    from "../../utils/ticketAssigmentUtils/readDepartmentTicketsControllerUtils/getDataByAggregation2";
import resultOfMarkAsReadArray from "../../utils/ticketAssigmentUtils/resultOfMarkAsReadArray/resultOfMarkAsReadArray";
import {addLog} from "../../utils/logMethods/addLog";

const markAsReadTicketAssignments = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    try {

        debugger
        const {idArray, readStatus} = req.body;
        if (!idArray || idArray.length === 0 || !readStatus) {
            res.status(500).json({message: "ورودی نامعتبر"});
            return
        }

        const resultOfMarkAsRead = await resultOfMarkAsReadArray({idArray, readStatus})
        await addLog({
            req: req,
            name: myToken?.UserInfo?.userData?.userData?.name + " " + myToken?.UserInfo?.userData?.userData?.familyName,
            phoneNumber: req?.myToken?.phoneNumber || "00000000000",
            description: `تیکت های  
            ${JSON.stringify(idArray)}
            به حالت خوانده شده تغییر کرد
            `,
            statusCode: 200,
        })
        return res.status(200).json(resultOfMarkAsRead);
    } catch (error: any) {

        res.status(500).json({error: error.toString()});
        return
    }


};

export {markAsReadTicketAssignments};
