import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {IDepartment} from "../../models/department";
import getDepartmentByPhoneNumber from "../../utils/functions/getDepartmentByPhoneNumber";
import getDataByAggregation2
    from "../../utils/ticketAssigmentUtils/readDepartmentTicketsControllerUtils/getDataByAggregation2";

const readDepartmentTicketsController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    try {

        // اینجا میتونم چک کنم آیا این کاربر ادمین یک دپارتمان هست یا خیر؟
        // بعدش میتونم چک کنم ادمین هر دپارتمانی هست همون دپارتمان تیکت هاشو از ارجاعات بگیرم بفرستم واسه فرانت

        // ولی اینجا فقط به دپارتمان کاربر نگاه میکنم و تیکت های اون دپارتمانی که کاربر درخواست داده بود میفرستم سمت فرانت
        // توی فرانت این صفحه فقط در صورتی نمایش داده میشه که کاربر ادمین دپارتمان باشه.
        const foundDepartment: IDepartment = await getDepartmentByPhoneNumber(myToken.phoneNumber)
        // const filters = req.body.filters || [];
        // filters.push({
        //     property: 'assignedToDepartmentId',
        //     value: foundDepartment._id,
        // });
        // filters.push({
        //     property: 'isDeleteDestination',
        //     value: false,
        // });
        // req.body.filters = filters;

        // Fetch tickets
        // const myTicketAssignment = await getDataCollection(req.body, TicketAssignment)


        // myTicketAssignment.results = await Promise.all(myTicketAssignment.results.map(async (singleAssignment: ITicketAssignment) => {
        //     const ticketFound: ITicket = (await Ticket.findOne({_id: singleAssignment.ticketId}).lean())!;
        //     return {
        //         ...singleAssignment,
        //         ...ticketFound
        //     }
        // }))
        // updatedTickets = await convertIdsToName(myTicketAssignment)
        // updatedTickets = await convertIdsToName(myTicketAssignment)
        const inpuut = {userDepartment: foundDepartment._id, filters: req.body.filters, currentPage: 1, pageSize: 5}
        let updatedTickets = await getDataByAggregation2({...inpuut})
        return res.status(200).json(updatedTickets);
    } catch (error: any) {

        
        res.status(500).json({error: error.toString()});
        return
    }


};

export {readDepartmentTicketsController};
