import changeTicketsDepartmentAndUser from "./changeTicketsDepartmentAndUser";
import addToAssignedTickets from "./addToAssignedTickets";
import mongoose from "mongoose";

interface IForwardTicket {
    ticketIdsArray: any[],
    departmentId: string,
    userId: string,
    senderUserId: string
}

const forwardTicket = async ({ticketIdsArray, departmentId, userId, senderUserId}: IForwardTicket) => {


    const resultOfChangeTicketsDepartmentAndUser = await changeTicketsDepartmentAndUser({
        ticketIdsArray: ticketIdsArray,
        departmentId,
        userId
    })
    const newDepartmentId = departmentId ? new  mongoose.Types.ObjectId(departmentId) : null
    const newUserId =  userId ? new mongoose.Types.ObjectId(userId) : null
    // تا اینجا یه سری از تیکت ها یا شایدم همه تغییر داده شدن و مقصد و کاربرشون تغییر کرد
    const resultOfAddToAssignedTickets = await addToAssignedTickets({ticketIdsArray: ticketIdsArray, departmentId:newDepartmentId, userId:newUserId, senderUserId})
    //  و تا اینجا هم تیکت ایجاد شده و توی لیست تیکت ها رفته حالا اگه قراره نوتیف بدم باید اینجا بدم

    return {
        status: true,
        message: "تیکت با موفقیت ارجاع شد"
    }
}
export default forwardTicket