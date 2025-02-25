import {Request, Response, NextFunction} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {Role} from "../../models/roles";
import {Department, IDepartment} from "../../models/department";
import {IStatus, Status} from "../../models/status";
import {addLog} from "../../utils/logMethods/addLog";


const readStatusController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

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

        let statusList: IStatus[] = await Status.find({}).lean()


        const myList: any = statusList.map((r, index) => {
            let row: any = {...r}
            for (const rowKey in row) {
                const value = row[rowKey];
                let temp = value
                if (value === true) {
                    temp = 'true'
                } else if (value === false) {
                    temp = 'false'
                }
                row[rowKey] = temp
            }

            row.id = row._id
            return row
        })



        const columnDefs = []


        columnDefs.push({minWidth: 150, headerName: "name", field: "name"})
        columnDefs.push({minWidth: 150, headerName: "description", field: "description"})


        const rowData = [...myList]

        const list = {columnDefs, rowData}

        await addLog({
            req: req,
            name: myToken?.UserInfo?.userData?.userData?.name + " " + myToken?.UserInfo?.userData?.userData?.familyName,
            phoneNumber: req?.myToken?.phoneNumber || "00000000000",
            description: ` جدول وضعیت ها رو مشاهده کرد.`,
            statusCode: 200,
        })
        res.status(200).json({
            list, message: 'لیست بارگزاری شد.',


        });
        return;

    } catch (error) {

        res.status(500).json({error});
        return
    }


};

export {readStatusController};
