import {ITicket, Ticket} from "../../models/ticket";
import {ITicketAssignment, TicketAssignment} from "../../models/ticketAssignment ";
import {Department} from "../../models/department";
import mongoose from "mongoose";
import {NotificationPayload, sendNotificationToUser} from "../pushNotification/pushNotification";

interface IInput {
    ticketIdsArray: ITicket[];
    departmentId: string | null | mongoose.Schema.Types.ObjectId;
    userId: string | null | mongoose.Schema.Types.ObjectId;
    senderUserId: string;
}

const addToAssignedTickets = async ({ticketIdsArray, departmentId, userId, senderUserId}: IInput) => {

    const myList = await Promise.all(ticketIdsArray.map(async (singleTicketId: any) => {
        // آیدی اون تیکت رو میگیریم
        const ticketFound: ITicket = (await Ticket.findOne({_id: singleTicketId}).exec())!;
        const newRow: any = {};
        newRow.ticketId = ticketFound._id
        newRow.assignedBy = senderUserId
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
        const ticketTitle = (await Ticket.findOne({_id: singleTicketId}).lean())!

        // اینجا میخوام یه نوتیف بدم به کاربر
        if (userId) {
            const notificationArray: NotificationPayload[] = [{
                userId: userId?.toString(),
                phoneNumber: undefined,
                notification: {
                    title: "پیام جدید دریافت شد.",
                    body: ticketTitle.title + " دریافت شد.",
                    icon: "",
                    click_action: "/inbox",
                }
            }]
            await sendNotificationToUser(notificationArray)
        } else {
            const findAdminDepartment = await Department.findOne({managerUserId: userId})
            if (findAdminDepartment) {
                const notificationArray = [{
                    userId: findAdminDepartment._id,
                    phoneNumber: undefined,
                    notification: {
                        title: "پیام جدید دریافت شد.",
                        body: ticketTitle.title + " دریافت شد.",
                        icon: "",
                        click_action: "/inbox",
                    }
                },
                ]
                await sendNotificationToUser(notificationArray)
            }

        }

        return !!result;
    }))
    debugger
    return myList.find(row => row === true)
}
export default addToAssignedTickets