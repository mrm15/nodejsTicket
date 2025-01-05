import {ITicket, Ticket} from "../../models/ticket";
import {ITicketAssignment, TicketAssignment} from "../../models/ticketAssignment ";
import {Department} from "../../models/department";
import mongoose from "mongoose";
import {NotificationPayload, sendNotificationToUser} from "../pushNotification/pushNotification";

interface IInput {
    ticketIdsArray: ITicket[],
    departmentId: mongoose.Types.ObjectId | null,
    userId: mongoose.Types.ObjectId | null ,
    senderUserId: string,
}

const addToAssignedTickets = async ({ticketIdsArray, departmentId, userId, senderUserId}: IInput) => {
    debugger
    const myList = await Promise.all(ticketIdsArray.map(async (singleTicketId: any) => {
        // آیدی اون تیکت رو میگیریم
        debugger
        const ticketFound: ITicket = (await Ticket.findOne({_id: singleTicketId}).exec())!;

        const newRow: any={};
        newRow.ticketId = ticketFound.id
        newRow.assignedBy = new mongoose.Types.ObjectId(senderUserId)
        newRow.createdAt = new Date();
        // نگاه میکنیم به مقدار  کاربر  اگه ست شده بود به کاربر باید اختصاص بدیم و به دپارتمان توجه نکنیم
        if (userId) {
            newRow.assignmentType = "user";
            newRow.assignedToDepartmentId = null;
            newRow.assignedToUserId = userId;
        } else if (departmentId && !userId) {
            newRow.assignmentType = "department";
            newRow.assignedToDepartmentId = departmentId;
            newRow.assignedToUserId = null;
        }
        const isThereSameAssignment: ITicketAssignment | null = await TicketAssignment.findOne({
            ticketId: ticketFound._id,
            assignedBy: senderUserId,
            assignedToUserId: userId ? userId : null,
            assignedToDepartmentId: (departmentId && !userId) ? departmentId : null,
        }).lean()
        newRow.assignedBy = new mongoose.Types.ObjectId(senderUserId)
        newRow.createdAt = new Date();

        let result
        if (!!isThereSameAssignment) {
            result = await TicketAssignment.findOneAndUpdate(
                {_id: isThereSameAssignment._id},
                {
                    $set: {
                        isDeleteDestination: false,
                        isDeleteFromAssignedBy: false,
                        assignDate: new Date(),          // Updating the assign date
                        readDate: null,             // Setting readDate to current date
                        readStatus: false,                 // Updating the read status
                        numberOfAssign: isThereSameAssignment.numberOfAssign + 1,
                        updatedAt: new Date(),            // Updating the updatedAt field
                    }
                },
                {new: true} // Option to return the updated document
            );
        } else {
            result = await TicketAssignment.create(newRow)

        }


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
                debugger
                const notificationArray = [{
                    userId: findAdminDepartment.id,
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

    return myList.find(row => row === true)
}
export default addToAssignedTickets