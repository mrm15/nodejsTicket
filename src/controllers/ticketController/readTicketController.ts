import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import getAllTicketsByAggregation
    from "../../utils/TicketAggrigate/getAllTicketsByAggrigation/getAllTicketsByAggregation";
import {Ticket} from "../../models/ticket";
import {getDataCollection} from "../utility/collectionsHandlers/getDataCollection";
import {addLog} from "../../utils/logMethods/addLog";



const readTicketController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    try {
        const arrayListToCheck = [ACCESS_LIST.readAllTicketsInSystem]
        const hasAccessToReadAllTicket = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck})
        if (!hasAccessToReadAllTicket) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
            return
        }

        debugger

        const myResultAfterChange =await getAllTicketsByAggregation({
            filters:req.body.filters,
            page:req.body.page,
            pageSize:req.body.pageSize
        })

        // const myResult = await getDataCollection(req.body, Ticket);

        // #10001 search #10001
        // const myResultAfterChange = await convertIdsToName(myResult)

        await addLog({
            req: req,
            name: myToken?.UserInfo?.userData?.userData?.name + " " + myToken?.UserInfo?.userData?.userData?.familyName,
            phoneNumber: req?.myToken?.phoneNumber || "00000000000",
            description: `صفحه ی تیکت های کل سیستم رو مشاهده کرد.`,
            statusCode: 200,
        })
        res.status(200).json(myResultAfterChange);
        return;

    } catch (error: any) {

        await addLog({
            req: req,
            name: myToken?.UserInfo?.userData?.userData?.name + " " + myToken?.UserInfo?.userData?.userData?.familyName,
            phoneNumber: req?.myToken?.phoneNumber || "00000000000",
            description: `خطا در مشاهده ی تیکت های کل سیستم`,
            statusCode: 500,
            error:error,
        })
        res.status(500).json({error: error.toString() + ' موردی در  دریافت اطلاعات رخ داد.'});
        return
    }


};

export {readTicketController};
