import {ITicketAssignment, TicketAssignment} from "../../../models/ticketAssignment ";

interface inputType {
    idArray: any[];
    readStatus: boolean;
}

const resultOfMarkAsReadArray = async ({idArray, readStatus}: inputType) => {


    await Promise.all(idArray.map(async (singleTicketAssignmentId) => {
        const ticketAssignmentFound: ITicketAssignment = (await TicketAssignment.findOne({_id: singleTicketAssignmentId}).exec())!;

        ticketAssignmentFound.readStatus = readStatus
        ticketAssignmentFound.readDate = new Date()
        await ticketAssignmentFound.save()
        return true;
    }));


    return {
        message: "تغییر وضعیت انجام شد"
    }
}
export default resultOfMarkAsReadArray