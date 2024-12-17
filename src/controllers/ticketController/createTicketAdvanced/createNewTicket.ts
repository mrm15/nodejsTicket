import {IUser} from "../../../models/User";
import {getNextSequenceValue, ITicket, Ticket} from "../../../models/ticket";
import {getCurrentTimeStamp} from "../../../utils/timing";


export const createNewTicket = async (
    senderInfo: IUser,
    ticketData: any,
    status: string,
    assignedToDepartmentId: string | null,
    assignToUserId: string | null
): Promise<ITicket> => {
    const ticketNumber = await getNextSequenceValue('ticketNumber');
    const newTicket: any = {
        ticketNumber,
        userId: senderInfo._id,
        title: ticketData.title,
        description: ticketData.description,
        priority: 'زیاد',
        status,
        firstDepartmentId: assignedToDepartmentId,
        firstUserId: assignToUserId,
        attachments: ticketData.files,
        lastChangeTimeStamp: getCurrentTimeStamp(),
        createAt: getCurrentTimeStamp(),
        updateAt: getCurrentTimeStamp(),
    };

    return await Ticket.create(newTicket);
};
