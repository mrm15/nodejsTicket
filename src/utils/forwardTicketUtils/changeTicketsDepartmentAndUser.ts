import {ITicket, Ticket} from "../../models/ticket";

interface IInput {
    ticketIdsArray: ITicket[];
    departmentId: string | null;
    userId: string | null;
}

const changeTicketsDepartmentAndUser = async ({
                                                  ticketIdsArray,
                                                  departmentId,
                                                  userId
                                              }: IInput) => {


    const myList = await Promise.all(ticketIdsArray.map(async (singleTicketId: any) => {
        const ticketFound: ITicket = (await Ticket.findOne({_id: singleTicketId}).exec())!;
        // @ts-ignore
        ticketFound.assignedToDepartmentId = departmentId
        // @ts-ignore
        ticketFound.assignToUserId = userId || null

        const resultTask = await ticketFound.save();
        return !!resultTask
    }))

    return myList.find((row: boolean) => !row)

}

export default changeTicketsDepartmentAndUser