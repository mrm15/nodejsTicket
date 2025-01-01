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


    debugger
    const myList = await Promise.all(ticketIdsArray.map(async (singleTicketId: any) => {
        try{const ticketFound: ITicket = (await Ticket.findOne({_id: singleTicketId}).exec())!;
            // @ts-ignore
            ticketFound.lastAssignedDepartmentId = departmentId
            // @ts-ignore
            ticketFound.lastAssignedUserId = userId || null
            // ticketFound.lastChangeTimeStamp = userId || null

            const resultTask = await ticketFound.save();
            return !!resultTask
        }catch (error){
            debugger
            return  false;
        }
    }))
    debugger

    return myList.find((row: boolean) => !row)

}

export default changeTicketsDepartmentAndUser