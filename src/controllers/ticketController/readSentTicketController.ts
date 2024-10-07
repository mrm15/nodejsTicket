import { Request, Response, NextFunction } from 'express';
import { CustomRequestMyTokenInJwt } from "../../middleware/verifyJWT";
import { ACCESS_LIST } from "../../utils/ACCESS_LIST";
import { checkAccessList } from "../../utils/checkAccessList";
import { Ticket } from "../../models/ticket";
import { getDataCollection } from "../utility/collectionsHandlers/getDataCollection";
import { convertIdsToName } from "../utility/convertTicketDataToName/convertIdsToName";
import getUserByPhoneNumber from "../../utils/functions/getUserByPhoneNumber";

const ReadSentTicketController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {
    try {
        const { myToken } = req;

        // Check if token exists
        if (!myToken) {
            return res.status(403).json({ message: 'Token not found in request.' });
        }

        // Check user access to ticket creation
        const hasAccess = await checkAccessList({ phoneNumber: myToken.phoneNumber, arrayListToCheck: [ACCESS_LIST.TICKET_CREATE] });
        if (!hasAccess) {
            return res.status(403).json({ message: 'Access denied to this section.' });
        }

        // Get user by phone number
        const foundUser = await getUserByPhoneNumber(myToken.phoneNumber);
        if (!foundUser) {
            return res.status(500).json({ message: 'Invalid user.' });
        }

        // Add filter for user tickets
        const filters = req.body.filters || [];
        filters.push({ property: 'userId', value: foundUser._id });
        req.body.filters = filters;

        // Fetch tickets
        const tickets = await getDataCollection(req.body, Ticket);
        const updatedTickets = await convertIdsToName(tickets);

        // Send response
        return res.status(200).json(updatedTickets);

    } catch (error:any) {
        return res.status(500).json({ error: error.toString() + ' Error occurred while retrieving data.' });
    }
};

export { ReadSentTicketController };
