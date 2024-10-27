import {ITicketAssignment, TicketAssignment} from "../../../models/ticketAssignment ";

interface inputType {
    ticketAssignmentIdsArray: any[];
    readStatus: boolean;
}

const resultOfMarkAsReadArray = async ({ticketAssignmentIdsArray, readStatus}: inputType) => {


    await Promise.all(ticketAssignmentIdsArray.map(async (singleTicketAssignmentId) => {
        const ticketAssignmentFound: ITicketAssignment = (await TicketAssignment.findOne({_id: singleTicketAssignmentId}).exec())!;

        ticketAssignmentFound.readStatus = readStatus
        ticketAssignmentFound.readDate = new Date()
        await ticketAssignmentFound.save()
        return true;
    }));


    return "تغییر وضعیت انجام شد";
}
export default resultOfMarkAsReadArray