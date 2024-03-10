import {Request, Response, NextFunction} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {userTicketTable} from "../../utils/userTicketTable";
import {inboxTicketList} from "../../utils/inboxTicketList";
import {Department} from "../../models/department";
import {departmentTickets} from "../../utils/getDepartmentTicketList";
import mongoose from "mongoose";

const readDepartmentTicketsController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    try {

        // باید نگاه کنیم اگه طرف ادمین دپارتمان بود تیکت های دپارتمانش رو نشونش بدیم و دیگه نیازی به  چک کردن دسترسی ها نیست.

        const { userId } = myToken.UserInfo.userData.userData;
        const departmentList = await Department.find().lean();
        const adminList = departmentList.map(singleDepartment => singleDepartment.managerUserId.toString());

        debugger
        // اگه کسی که این درخواست رو داده توی لیست ادمین های دپارتمان ها نبود پس بهش میگیم شرمنده تو اصلا اجاره نداری اینجا رو ببینی
        if (!adminList.includes(userId)) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
            return
        }
        // گرفتن اون آیدی دپارتمانی که این کاربر ادمینش هست
        let userDepartmentId: mongoose.Schema.Types.ObjectId | undefined;
        departmentList.forEach(singleDepartment => {
            if (singleDepartment.managerUserId?.toString() === userId) {
                userDepartmentId = singleDepartment._id
            }
        })


        if (userDepartmentId) {
            // میتونستم از روی شماره تلفن یوزرآیدی رو بگیرم اما اینجا ترجیح دادم اینطوری کنم و از توی توکن بردارم.
            const list = await departmentTickets({id: userDepartmentId})
            res.status(200).json({
                list, message: 'لیست بارگزاری شد.',
            });
            return;
        } else {

            const list = {
                columnDefs: [], rowData: []

            }
            res.status(200).json({
                list, message: 'لیست خالی است.',
            });
            return;
        }


    } catch (error: any) {

        res.status(500).json({error: error.toString()});
        return
    }


};

export {readDepartmentTicketsController};
