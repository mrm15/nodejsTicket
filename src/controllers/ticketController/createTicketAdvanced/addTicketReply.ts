import {getCurrentTimeStamp} from "../../../utils/timing";
import {TicketReply} from "../../../models/ticketReply";


export const addTicketReply = async (ticketId: string, userInfo: any, firstReplyMessage: string) => {
    const replyData = {
        ticketId,
        userId: userInfo._id,
        departmentId: userInfo.departmentId,
        description: firstReplyMessage,
        replyDate: getCurrentTimeStamp(),
        attachments: [],
        visibleToUser: true,
        createAt: getCurrentTimeStamp(),
        updateAt: getCurrentTimeStamp(),
    };
    return await TicketReply.create(replyData);
};
