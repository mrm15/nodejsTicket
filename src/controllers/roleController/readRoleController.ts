import {Request, Response, NextFunction} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {Role} from "../../models/roles";


const readRoleController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

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

        const userList = await Role.find({}).exec();



        const columnDefs = []


        columnDefs.push({minWidth: 150, headerName: "name", field: "name"})
        columnDefs.push({minWidth: 150, headerName: "description", field: "description"})



        const rowData = [...userList]

        const list = {columnDefs, rowData}

        res.status(200).json({
            list, message: 'لیست بارگزاری شد.',

            userList
        });
        return;

    } catch (error) {

        res.status(500).json({error});
        return
    }


};

export {readRoleController};
