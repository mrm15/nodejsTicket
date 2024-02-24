import {Request, Response, NextFunction} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {IFile,File} from "../../models/files";
import {timestampToTime} from "../../utils/timestampToTime";


const readFilesController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

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
        const arrayListToCheck = [ACCESS_LIST.USER_READ_ALL]
        const hasAccessToReadAllUsers = await checkAccessList({phoneNumber: myToken.phoneNumber, arrayListToCheck})
        if (!hasAccessToReadAllUsers) {
            res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
            return
        }

        let fileList: IFile[] = await File.find({}).lean()


        const myList: any = fileList.map((r, index) => {
            let row: any = {...r}

            row.id = r._id
            row.uploadDate = timestampToTime(r.uploadDate)

            return row
        })



        const columnDefs = []


        columnDefs.push({minWidth: 150, headerName: "fileName", field: "fileName"})
        columnDefs.push({minWidth: 150, headerName: "uploadDate", field: "uploadDate"})


        const rowData = [...myList]

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

export {readFilesController};
