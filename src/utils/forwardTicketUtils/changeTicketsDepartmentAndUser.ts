import {ITicket, Ticket} from "../../models/ticket";

interface IInput {
    ticketArray: ITicket[];
    departmentId: string|null;
    userId: string|null;
}

const changeTicketsDepartmentAndUser = async ({
                                                  ticketArray,
                                                  departmentId,
                                                  userId
                                              }: IInput) => {


    const myList = await Promise.all(ticketArray.map(async (singleTicket: ITicket) => {
        const row: any = {...singleTicket};
        const ticketFound: ITicket = (await Ticket.findOne({_id: row._id}).exec())!;
        // @ts-ignore
        ticketFound.assignedToDepartmentId = departmentId
        if (userId !== '') {
            // @ts-ignore
            ticketFound.assignToUserId = userId
        }
        const resultTask = await ticketFound.save();
        return !!resultTask
    }))

    return myList.find((row: boolean) => !row)

}

export default changeTicketsDepartmentAndUser