import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";

import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";

import {File, IFile} from "../../models/files"
import {removeFileFromServer} from "../../utils/removeFileFromServer";


const deleteFilesController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }
    try {

        let message = ''
        const {id} = req.params;
        // 11 آیا توی پروفایل کاربری هست؟
        // 12 آیا توی تیکت ها و تیکت آرشیو هست؟
        // 13 آیا توی تیکت ریپلای و آرشیو ریپلای هست؟
        // 14 آیا  توی عکس دپارتمان هست؟

        /*******************************/
        //  باید بعدا اینو چک کنم وقتی میخواد فایل پاک بشه
        // حتما باید چک کنیم که آیا توی دیتابیسی هست یا نه؟


                //11 آیا توی پروفایل کاربری هست؟
                let foundFileInUserProfile: IUser | null | boolean= await User.findOne({profilePictureUrl: id}).exec();
                if (foundFileInUserProfile) {
                    message += `کاربر با شماره  ${foundFileInUserProfile?.phoneNumber} این عکس پروفایل رو داره. لطفا ابتدا کاربر را حذف کنید و یا عکس پروفایل کابر را تغییر دهید.`
                    res.status(409).json({message});
                    return
                }
                //12 آیا توی تیکت ها

                // const foundFileInTicket  = await Ticket.findOne({ticketFileID: id}).exec();
                // if (foundFileInTicket) {
                //     message += `تیکت با شماره  ${foundFileInUserProfile?.ticketId} این فایل رو داره. لطفا ابتدا تیکت را حذف کنید.`
                //     res.status(409).json({message});
                //     return
                // }

                //12 تیکت آرشیو هست؟
                // const foundFileInTicketArchive  = await Ticket.findOne({ticketFileID: id}).exec();
                // if (foundFileInTicketArchive) {
                //     message += `تیکت آرشیو شده با شماره  ${foundFileInTicketArchive?.ticketId} این فایل رو داره. لطفا ابتدا تیکت را حذف کنید.`
                //     res.status(409).json({message});
                //     return
                // }

                //13 تیکت ریپلای هست؟
                // const foundFileInTicketReply  = await TicketReply.findOne({ticketFileID: id}).exec();
                // if (foundFileInTicketReply) {
                //     message += `تیکت  آرشیو شده با شماره  ${foundFileInTicketReply?.ticketId} این فایل رو داره. لطفا ابتدا تیکت را حذف کنید.`
                //     res.status(409).json({message});
                //     return
                // }
                //14 تیکت ریپلای آرشیو هست؟
                // const foundFileInTicketReplyArchive  = await TicketReplyArchive.findOne({ticketFileID: id}).exec();
                // if (foundFileInTicketReplyArchive) {
                //     message += `تیکت ریپلای آرشیو  شده با شماره  ${foundFileInTicketReplyArchive?.ticketId} این فایل رو داره. لطفا ابتدا تیکت را حذف کنید.`
                //     res.status(409).json({message});
                //     return
                // }




        const foundFile: IFile | null = await File.findOne({_id: id}).exec()
        if (!foundFile) {
            res.status(409).json({
                message: `یه مشکلی پیش اومد. این فایل در پایگاه داده وجود نداره.!!!.🙄`
            });
            return
        }


        // اول باید فایل رو از روی سرور حذف کنم

        // چک میکنم اصلا روی سرور موجود هست یا نه

        // اگه موجود نبود که میگم اوکی میشه حذفش کرد و اوکی ادامه بده

        // اگه موجود بود حذفش میکنم و میگم اوکی ادامه بده
        // Attempt to find and delete the user by ID

        const isRemovedFileFromServer = await removeFileFromServer(foundFile.fileName)

        if (!isRemovedFileFromServer) {
            res.status(409).json({message: 'مشکلی در حذف فایل پیش اومد.!'});
            return
        }

        const deletedFile = await File.findByIdAndDelete(id);

        // Check if a user was found and deleted
        if (!deletedFile) {
            res.status(404).json({message: 'موردی پیش اومده! حذف نشد'});
            return
        }

        // Successfully deleted the user
        res.status(200).json({message: `فایل با نام ${deletedFile?.fileName} برای همیشه حذف شد.`,});
        return
    } catch (error: any) {
        // Handle potential errors, such as invalid ObjectId format
        res.status(500).json({message: 'Error deleting ROLE', error: error?.message});
        return
    }


};

export {deleteFilesController};
