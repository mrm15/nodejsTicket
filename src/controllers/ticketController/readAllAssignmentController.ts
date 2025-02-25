import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import sleep from "../../utils/sleep";
import getDataByAggregation2
    from "../../utils/ticketAssigmentUtils/readDepartmentTicketsControllerUtils/getDataByAggregation2";
import {addLog} from "../../utils/logMethods/addLog";

const readAllAssignmentController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    try {


        // Fetch tickets
        // const myTicketAssignment = await getDataCollection(req.body, TicketAssignment)


        // myTicketAssignment.results = await Promise.all(myTicketAssignment.results.map(async (singleAssignment: ITicketAssignment) => {
        //     const ticketFound: ITicket = (await Ticket.findOne({_id: singleAssignment.ticketId}).lean())!;
        //     return {
        //         ...singleAssignment,
        //         ...ticketFound
        //     }
        // }));
        // const updatedTickets = await convertIdsToName(myTicketAssignment)

        // just want to know how delay works in front end Handle waiting

        /*
        {
            "page": 1,
            "pageSize": 5,
            "filters": []
        }
         */


        const updatedTickets = await getDataByAggregation2({
            filters:req.body.filters,
            page:req.body.page,
            pageSize:req.body.pageSize
        })

        await addLog({
            req: req,
            name: myToken?.UserInfo?.userData?.userData?.name + " " + myToken?.UserInfo?.userData?.userData?.familyName,
            phoneNumber: req?.myToken?.phoneNumber || "00000000000",
            description: `صفحه ی کل ارجاعات رو مشاهده کرد.`,
            statusCode: 200,
        })
        return res.status(200).json(updatedTickets);
    } catch (error: any) {

        res.status(500).json({error: error.toString()});
        return
    }


};

export {readAllAssignmentController};
