// Fetch tickets for a specific user
import {Ticket} from "../../../models/ticket";
import {TicketReply} from "../../../models/ticketReply";
import {User} from "../../../models/User";

// Fetch tickets for a specific user
export const getUserTickets = async (phoneNumber: string, filters: any) => {
    // Map filters to query fields
    const queryFilters: any = {};

    if (filters.Date) {
        queryFilters.createAt = {};
        if (filters.Date.$gte) {
            queryFilters.createAt.$gte = new Date(filters.Date.$gte); // Convert $gte to Date
        }
        if (filters.Date.$lt) {
            queryFilters.createAt.$lt = new Date(filters.Date.$lt); // Convert $lt to Date
        }
    }
    if (filters.Status) {
        queryFilters.billStatus = filters.Status; // Add bill status filter
    }

    // Find the user by phone number
    const user = await User.findOne({ phoneNumber });
    if (!user) {
        throw new Error("User not found.");
    }

    // Fetch tickets with `_id`, `billNumber`, and `billStatus`
    const tickets = await Ticket.find(
        { firstUserId: user._id, ...queryFilters }, // Match user and apply filters
        "_id billNumber billStatus createAt" // Select specific fields
    ).lean(); // Use `.lean()` for better performance

    // Extract ticket IDs for the next query
    const ticketIds = tickets.map(ticket => ticket._id);

    // Fetch replies with only `_id`, `billNumber`, and `billStatus`
    const replies = await TicketReply.find(
        {
            ticketId: { $in: ticketIds }, // Match ticket IDs
            ...queryFilters, // Apply filters here as well
        },
        "billNumber billStatus createAt" // Select specific fields
    ).lean();

    // Extract only `billNumber` from tickets if they are valid strings (non-empty)
    const ticketBillNumbers = tickets
        .filter(ticket => typeof ticket.billNumber === "string" && ticket.billNumber.trim() !== "")
        .map(ticket => ticket.billNumber);

// Extract only `billNumber` from replies if they are valid strings (non-empty)
    const replyBillNumbers = replies
        .filter(reply => typeof reply.billNumber === "string" && reply.billNumber.trim() !== "")
        .map(reply => reply.billNumber);

// Combine all `billNumber` values into a single array
    const allBillNumbers = [...ticketBillNumbers, ...replyBillNumbers];


    // Return the result
    const temp = [{
        data: allBillNumbers, // Only billNumber values
        name: `${user.name} ${user.familyName}` // Combine user name and family name
    }];

    return temp;
};

// Fetch tickets for a specific department
export const getDepartmentTickets = async (filters: any) => {
    const tickets = await Ticket.find(filters);

    const ticketIds = tickets.map(ticket => ticket._id);
    const replies = await TicketReply.find({
        ticketId: {$in: ticketIds},
        ...filters,
    });

    return aggregateTicketData(tickets, replies);
};

// Fetch all tickets (user + department)
export const getAllTickets = async (filters: any) => {
    const tickets = await Ticket.find(filters);

    const ticketIds = tickets.map(ticket => ticket._id);
    const replies = await TicketReply.find({
        ticketId: {$in: ticketIds},
        ...filters,
    });
    return aggregateTicketData(tickets, replies);
};

// Aggregate data from tickets and replies
const aggregateTicketData = (tickets: any[], replies: any[]) => {
    const aggregatedData = tickets.map(ticket => ({
        id: ticket._id,
        billNumber: ticket.billNumber,
        billStatus: ticket.billStatus,
    }))
    const aggregatedDataReply = replies.map(ticket => ({
        id: ticket._id,
        billNumber: ticket.billNumber,
        billStatus: ticket.billStatus,
    }))

    return [...aggregatedData, ...aggregatedDataReply]
};

