import {Request, Response, NextFunction} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";

import getUserByPhoneNumber from "../../utils/functions/getUserByPhoneNumber";
import {IUser} from "../../models/User";
import getDataByAggregation2
    from "../../utils/ticketAssigmentUtils/readDepartmentTicketsControllerUtils/getDataByAggregation2";
import {addLog} from "../../utils/logMethods/addLog";

const readOutBoxAssignmentController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    try {
        /***/
        const foundUser: IUser = await getUserByPhoneNumber(myToken.phoneNumber)
        const filters = req.body.filters || [];
        filters.push({
            property: 'assignedByText',
            operator:"=",
            value: foundUser.name + " " + foundUser.familyName, //  توی خروجی داریم نام و نام خانوداگی زو میکس میکنم میفرستیم و اینحا هم باید  میکس کنیم که دقیقا مساوی رو بتونیم بگیریم.
        })
        // باید تیکت هایی رو بدیم که فرستنده خودش پاک نکرده باشه
        filters.push({
            property: 'isDeleteFromAssignedBy',
            value: false,
        });

        const updatedTickets = await getDataByAggregation2({
            filters:filters,
            page:req.body.page,
            pageSize:req.body.pageSize
        })

        await addLog({
            req: req,
            name: myToken?.UserInfo?.userData?.userData?.name + " " + myToken?.UserInfo?.userData?.userData?.familyName,
            phoneNumber: req?.myToken?.phoneNumber || "00000000000",
            description: `صفحه ی صندوق ارسالی رو مشاهده کرد.`,
            statusCode: 200,
        })
        return res.status(200).json(updatedTickets);

        /*********************************************/
    } catch (error: any) {

        res.status(500).json({error: error.toString()});
        return
    }


};

export {readOutBoxAssignmentController};
