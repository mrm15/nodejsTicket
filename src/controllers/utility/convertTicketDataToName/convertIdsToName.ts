import {FlattenMaps} from "mongoose"
import {IUser, User} from "../../../models/User";
import {timestampToTime} from "../../../utils/timestampToTime";
import {Department, IDepartment} from "../../../models/department";
import {IStatus, Status} from "../../../models/status";
// من هر چیزی رو که اینجا اضافه مینم بعدا توی میدلور فیلتر میرم و تغییر میدم و سرچ میکنم.
//
export const convertIdsToName = async (dt: {
    results: (FlattenMaps<any> & Required<{ _id: unknown }>)[];
    totalDocuments: number;
    currentPage: number;
    pageSize: number
}) => {

    // console.log(dt.results);
    const ticketList = dt.results

    try {
        dt.results = await Promise.all(ticketList.map(async (singleTicket) => {
            const row: any = {...singleTicket};
            const userFound: IUser = (await User.findOne({_id: row.userId}).lean())!;
            const userFoundAssigned: IUser = (await User.findOne({_id: row.assignToUserId}).lean())!;
            const departmentFound: IDepartment = (await Department.findOne({_id: row.assignedToDepartmentId}).lean())!;
            const statusFound: IStatus = (await Status.findOne({_id: row.status}).lean())!;


            // #10001
            row['userCreateThisOrder'] = userFound?.name || '_'
            row['userPhoneNumber'] = userFound?.phoneNumber || '_'
            row['numberOfAttachments'] = row.attachments.length
            row['dateCreate'] = timestampToTime(row.createAt)
            row['lastChangeTime'] = timestampToTime(row.lastChangeTimeStamp)
            row['statusText'] = statusFound?.name || "-" ;
            row['assignedToDepartmentIdText'] = departmentFound?.name || "-" ;
            row['assignToUserIdText'] = userFoundAssigned?.name || "-" ;
            /////////////////////////////////////////////////////////////////////


            return row;
        }))
    } catch (error: any) {
        throw new Error(error?.toString())
    }

    return dt
}