import {ITicket, Ticket} from "../../models/ticket";
import {ITicketAssignment, TicketAssignment} from "../../models/ticketAssignment ";
import {Department} from "../../models/department";

interface IInput {
    ticketArray: ITicket[];
    departmentId: string | null;
    userId: string | null;
    senderUserId:string;
}

const addToAssignedTickets = async ({ticketArray, departmentId, userId,senderUserId}: IInput) => {

    const myList = await Promise.all(ticketArray.map(async (singleTicket: ITicket) => {
        // آیدی اون تیکت رو میگیریم
        const ticketFound: ITicket = (await Ticket.findOne({_id: singleTicket._id}).exec())!;
        const newRow: any = {};
        newRow.ticketId = ticketFound._id
        newRow.assignedBy=senderUserId
        newRow.createdAt = new Date();
        // نگاه میکنیم به مقدار  کاربر  اگه ست شده بود به کاربر باید اختصاص بدیم و به دپارتمان توجه نکنیم
        if (userId) {
            newRow.assignmentType = "user"
            newRow.assignedToDepartmentId = null
            newRow.assignedToUserId = userId
        } else if (departmentId && !userId) {
            newRow.assignmentType = "department"
            newRow.assignedToDepartmentId = departmentId
            newRow.assignedToUserId = null
        }
        const result = await TicketAssignment.create(newRow)
        return !!result;
    }))
    return myList.find(row => !row)
}
export default addToAssignedTickets