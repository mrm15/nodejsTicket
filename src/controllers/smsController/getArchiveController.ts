import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {Role} from "../../models/roles";
import {Department, IDepartment} from "../../models/department";
import {IsmsArchive, SmsArchive} from "../../models/smsArchive";
import {IUser, User} from "../../models/User";
import {timestampToTime} from "../../utils/timestampToTime";


const getArchiveController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست'
        res.status(403).json({message});
        return
    }


    // res.status(201).json({myToken})
    //
    // return


    try {
        const myRowData : IsmsArchive[] = await SmsArchive.find({}).lean();



        const rowData = await Promise.all(myRowData.map(async (singleRow) => {
            const row: any = {...singleRow};
            const foundedDepartment : IDepartment | null = await Department.findOne({_id:row.senderDepartmentId});
            row['senderDepartmentId'] = foundedDepartment?.name || "- "
            const foundedUser = await User.findOne({_id:row.senderUserId})
            row['senderUserId']  = foundedUser?.name || "-"
            return row;
        }));


        const columnDefs = []


        columnDefs.push({minWidth: 150, headerName: "تعداد تلاش ", field: "counter"})
        columnDefs.push({minWidth: 150, headerName: "شماره مقصد", field: "destinationNumber"})
        columnDefs.push({minWidth: 150, headerName: "دپارتمان مبدا", field: "senderDepartmentId"})
        columnDefs.push({minWidth: 150, headerName: "کاربر ارسال کننده", field: "senderUserId"})
        columnDefs.push({minWidth: 150, headerName: "وضعیت", field: "status"})
        columnDefs.push({minWidth: 150, headerName: "متن", field: "text"})



        const list = {columnDefs, rowData}




        res.status(200).json({
            list, message: 'لیست بارگزاری شد.',
        });
        return;

    } catch (error) {

        res.status(500).json({error});
        return
    }


};

export {getArchiveController};
