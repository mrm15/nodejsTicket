import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";
import {File, IFile} from "../../models/files";
import {getCurrentTimeStamp} from "../../utils/timing";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {addNewUserF} from "../LoginRegisterSms/addNewUserF";
import {uuidGenerator} from "../../utils/uuidGenerator";
import {getUserInfoByPhoneNumber} from "../LoginRegisterSms/getUserInfoByPhoneNumber";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";


const readUserController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

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

        const userList = await User.find({}).exec();
        // نکته ای که الان فهمیدم اینه که مقدار آی دی رو
        // lean
        // نمیده ولی
        // exec
        // میده


        const columnDefs = []


        columnDefs.push({minWidth: 150, headerName: "name", field: "name"})
        columnDefs.push({minWidth: 150, headerName: "شماره تماس", field: "phoneNumber"})
        columnDefs.push({minWidth: 150, headerName: "phoneNumber3", field: "phoneNumber3"})
        columnDefs.push({minWidth: 150, headerName: "postalCode", field: "postalCode"})
        columnDefs.push({minWidth: 150, headerName: "profilePictureUrl", field: "profilePictureUrl"})
        columnDefs.push({minWidth: 150, headerName: "province", field: "province"})
        columnDefs.push({minWidth: 150, headerName: "registerNumberCompany", field: "registerNumberCompany"})
        columnDefs.push({minWidth: 150, headerName: "tasks", field: "tasks"})
        columnDefs.push({minWidth: 150, headerName: "tickets", field: "tickets"})
        columnDefs.push({minWidth: 150, headerName: "title", field: "title"})
        columnDefs.push({minWidth: 150, headerName: "tokens", field: "tokens"})
        columnDefs.push({minWidth: 150, headerName: "updateAt", field: "updateAt"})
        columnDefs.push({minWidth: 150, headerName: "userName", field: "userName"})
        columnDefs.push({minWidth: 150, headerName: "website", field: "website"})


        const rowData = [...userList.reverse()]

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

export {readUserController};
