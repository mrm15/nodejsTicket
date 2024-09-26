import {FlattenMaps} from "mongoose"
import {IUser, User} from "../../../models/User";
import {timestampToTime} from "../../../utils/timestampToTime";
// من هر چیزی رو که اینجا اضافه مینم بعدا توی میدلور فیلتر میرم و تغییر میدم و سرچ میکنم.
//
export const convertIdsToName = async (dt: {
    results: (FlattenMaps<any> & Required<{ _id: unknown }>)[];
    totalDocuments: number;
    currentPage: number;
    pageSize: number
}) => {

    console.log(dt.results);
    const ticketList = dt.results

    try {
        dt.results = await Promise.all(ticketList.map(async (singleTicket) => {
            const row: any = {...singleTicket};
            const userFound: IUser = (await User.findOne({_id: row.userId}).lean())!;
            row['userCreateThisOrder'] = userFound?.name || '_'
            row['numberOfAttachments'] = row.attachments.length
            row['dateCreate'] = timestampToTime(row.createAt)
            row['lastChangeTime'] = timestampToTime(row.lastChangeTimeStamp)
            return row;
        }))
    } catch (error: any) {
        throw new Error(error?.toString())
    }

    return dt
}