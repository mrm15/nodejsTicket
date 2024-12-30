import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {getDataCollection} from "../utility/collectionsHandlers/getDataCollection";
import {Ticket} from "../../models/ticket";
import {convertIdsToName} from "../utility/convertTicketDataToName/convertIdsToName";
import processFilterOperators
    from "../../utils/ticketAssigmentUtils/readDepartmentTicketsControllerUtils/processFilterOperators";
import {
    createAggregationPipeline
} from "../../utils/ticketAssigmentUtils/readDepartmentTicketsControllerUtils/aggregationPipeline";
import {TicketAssignment} from "../../models/ticketAssignment ";
import {createAggregationPipelineForTickets} from "../../utils/TicketAggrigate/createAggregationPipelineForTickets";
import mongoose from "mongoose";
import {timestampToTime} from "../../utils/timestampToTime";

const myTicketListController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    try {
        const arrayListToCheck = [ACCESS_LIST.readAllOfTicketsAssignedToMe]
        const hasAccess = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck})
        if (!hasAccess) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
            return
        }

        /**/

        const userId = myToken?.UserInfo?.userData?.userData?.userId as string;
        const newUserId = new mongoose.Types.ObjectId(userId)
        const {filters, page, pageSize} = req.body
        filters.push({
            property: 'firstUserId',
            operator: "=",
            value: newUserId,
        })
        const matchConditions: any = []
        // Apply filters dynamically (if any exist in the payload)
        if (filters && filters.length > 0) {
            filters.forEach((filter: any) => {
                matchConditions.push(processFilterOperators(filter));
            });
        }


        const myPipeline = createAggregationPipelineForTickets({matchConditions, page, pageSize});

        const myResultAfterChange: any = await Ticket.aggregate(myPipeline);

        // Extract results and total document count
        const results = myResultAfterChange[0]?.results || [];
        const totalDocuments = myResultAfterChange[0]?.totalDocuments?.length > 0 ? myResultAfterChange[0]?.totalDocuments[0]?.total : 0;


        const startIndex = (page - 1) * pageSize;
        results.forEach((row: any, index: number) => {
            row.rowNumber = startIndex + index + 1;
            // row.dateCreate = timestampToTime(row?.dateCreate) // Convert Date Here after aggregate
        })
        /**/

        // const myResult = await getDataCollection(req.body, Ticket);

        // const myResultAfterChange = await convertIdsToName(myResult)

        res.status(200).json({
            currentPage: page,
            pageSize,
            totalDocuments,
            results,
        });
        return;

    } catch (error: any) {

        res.status(500).json({error: error.toString() + ' موردی در  دریافت اطلاعات رخ داد.'});
        return
    }


};

export {myTicketListController};
