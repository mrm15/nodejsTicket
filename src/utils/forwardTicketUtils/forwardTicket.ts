import changeTicketsDepartmentAndUser from "./changeTicketsDepartmentAndUser";
import addToAssignedTickets from "./addToAssignedTickets";

interface IForwardTicket {
    ticketArray: any[],
    departmentId: string,
    userId: string,
    senderUserId: string
}

const forwardTicket = async ({ticketArray, departmentId, userId, senderUserId}: IForwardTicket) => {

    const resultOfChangeTicketsDepartmentAndUser = await changeTicketsDepartmentAndUser({
        ticketArray,
        departmentId,
        userId
    })
    // تا اینجا یه سری از تیکت ها یا شایدم همه تغییر داده شدن و مقصد و کاربرشون تغییر کرد
    const resultOfAddToAssignedTickets = await addToAssignedTickets({ticketArray, departmentId, userId, senderUserId})
    //  و تا اینجا هم تیکت ایجاد شده و توی لیست تیکت ها رفته حالا اگه قراره نوتیف بدم باید اینجا بدم

    return {
        status: true,
        message: "تیکت ها با موفقیت ارجاع شدند"
    }
}
export default forwardTicket