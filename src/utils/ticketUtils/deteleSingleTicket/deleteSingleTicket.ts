import { TicketReply } from "../../../models/ticketReply";
import { Ticket } from "../../../models/ticket";
import { File } from "../../../models/files";
import fs from "fs/promises";
import mongoose from "mongoose";
import path from "path";
import {TicketAssignment} from "../../../models/ticketAssignment ";
import {deleteFileFromFtp} from "../../uploadUtil/deleteFileFromFtp";

interface TaskResult {
    status: boolean;
    message: string;
}

// Function to delete a file from server and database
export const deleteFile = async (fileId: mongoose.Schema.Types.ObjectId, resultTask: TaskResult): Promise<void> => {
    try {
        const file = await File.findById(fileId);
        if (file) {
            // Delete the file from the server
            const absoluteFilePath = path.join('/data/uploads', file.filePath);

            // await fs.unlink(absoluteFilePath);
            await deleteFileFromFtp(absoluteFilePath)
            // Delete the file from the database
            await File.deleteOne({ _id: fileId });
            resultTask.message += `فایل ${file?.fileName} حذف شد. 🙌 `;
        } else {
            resultTask.message += `فایل با شناسه ${fileId} پیدا نشد. ❌ `;
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            resultTask.message += `خطا در حذف فایل ${fileId}: ${error?.message} 🚨 `;
        } else {
            resultTask.message += `خطای ناشناخته‌ای در حذف فایل ${fileId} رخ داد. 🚨 `;
        }
    }
};

const deleteSingleTicket = async (id: any): Promise<TaskResult> => {
    const resultTask: TaskResult = {
        status: false,
        message: "",
    };

    try {
        // Step 1: Find the ticket
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            resultTask.message = `تیکتی با این شناسه پیدا نشد! 😒`;
            return resultTask;
        }

        // Step 2: Delete ticket attachments
        if (ticket.attachments && ticket.attachments.length > 0) {
            await Promise.all(ticket.attachments.map((fileId) => deleteFile(fileId, resultTask)));
        }

        // Step 3: Find and delete ticket replies
        const replies = await TicketReply.find({ ticketId: id });

        // Collect all attachments from replies
        const replyAttachments = replies.flatMap((reply) => reply.attachments || []);

        // Delete all reply attachments
        if (replyAttachments.length > 0) {
            await Promise.all(replyAttachments.map((fileId) => deleteFile(fileId, resultTask)));
        }

        // Delete all replies in one operation
        const replyDeletionResult = await TicketReply.deleteMany({ ticketId: id });
        resultTask.message += `${replyDeletionResult.deletedCount} پاسخ مرتبط با تیکت حذف شدند. 💬 `;

        // Step 4: Delete ticket assignments
        const assignmentDeletionResult = await TicketAssignment.deleteMany({ ticketId: id });
        resultTask.message += `${assignmentDeletionResult.deletedCount} تخصیص مرتبط با تیکت حذف شدند. 🗂 `;

        // Step 5: Delete the ticket
        await Ticket.deleteOne({ _id: id });
        resultTask.message += `تیکت و تمام پاسخ‌ها و تخصیص‌ها با موفقیت حذف شدند! 🎉 `;
        resultTask.status = true;
    } catch (error: unknown) {
        if (error instanceof Error) {
            resultTask.message = `خطای حذف تیکت: ${error.message} 🚨 `;
        } else {
            resultTask.message = `خطای ناشناخته‌ای رخ داد. 🚨 `;
        }
    }

    return resultTask;
};

export default deleteSingleTicket;
