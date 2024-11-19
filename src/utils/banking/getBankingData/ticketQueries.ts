// Fetch tickets for a specific user
import {Ticket} from "../../../models/ticket";
import {TicketReply} from "../../../models/ticketReply";
import {User} from "../../../models/User";

// Fetch tickets for a specific user
export const getUserTickets = async (phoneNumber: string, filters: any) => {
    debugger
    const user = await User.findOne({phoneNumber});
    if (!user) {
        throw new Error("User not found.")
    }


    debugger
    // Query tickets and populate user information
    const tickets = await Ticket.find({firstUserId: user._id})
        // .populate("userId", "name familyName") // Only select name and familyName
        .exec();

    // Query ticket replies and populate user information
    const ticketIds = tickets.map(ticket => ticket._id);
    const replies = await TicketReply.find({
        ticketId: {$in: ticketIds},
        ...filters,
    }).lean()
    debugger
    // .populate("userId", "name familyName")
    // .exec();
    const temp = [{
        data: aggregateTicketData(tickets, replies),
        name: user.name + " "+ user.familyName
    }]


    return temp
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
    debugger
    return aggregateTicketData(tickets, replies);
};

// Aggregate data from tickets and replies
const aggregateTicketData = (tickets: any[], replies: any[]) => {
    const aggregatedData = tickets.map(ticket => ({
        ticketId: ticket._id,
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        billNumber: ticket.billNumber,
        billStatus: ticket.billStatus,
    }))

    return {
        data: aggregatedData,
        ticketCount: tickets.length,
        replyCount: replies.length,
    };
};

