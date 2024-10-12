import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import sleep from "../../utils/sleep";
import getDataByAggregation2
    from "../../utils/ticketAssigmentUtils/readDepartmentTicketsControllerUtils/getDataByAggregation2";

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

        const updatedTickets = await getDataByAggregation2({...req.body})
        await sleep(2000)
        return res.status(200).json(updatedTickets);
    } catch (error: any) {

        res.status(500).json({error: error.toString()});
        return
    }


};

export {readAllAssignmentController};
