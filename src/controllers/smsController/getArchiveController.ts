import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {Role} from "../../models/roles";
import {Department} from "../../models/department";
import {IsmsArchive, SmsArchive} from "../../models/smsArchive";


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
        const rowData : IsmsArchive[] = await SmsArchive.find({}).lean();


        const columnDefs = []


        columnDefs.push({minWidth: 150, headerName: "name", field: "name"})
        columnDefs.push({minWidth: 150, headerName: "description", field: "description"})



        const list = {columnDefs, rowData:[]}




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
