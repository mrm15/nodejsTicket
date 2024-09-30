import {IUser, User} from "../../models/User";
import {Department, IDepartment} from "../../models/department";
import {IStatus, Status} from "../../models/status";
import {getCurrentTimeStamp} from "../../utils/timing";
import {AdminSettings, IAdminSettings} from "../../models/adminSettings";


export const registerRandomAdminSettings = async () => {
    // هیچ تنظیماتی نیست. بریم الکی ثبت کنیم

    debugger
    const randomUser: IUser | null = (await User.findOne({}).lean())!;
    if (!randomUser) {
        return {
            statusCode:406,
            message: 'لطفا یک کاربر تعریف کنید.',

        }

    }


    const randomDepartment: IDepartment | null = await Department.findOne({}).lean()
    if (!randomDepartment) {
        return {
            statusCode:406,
            message: 'لطفا یک دپارتمان تعریف کنید.',

        }
    }
    const randomStatus: IStatus | null = await Status.findOne({}).lean()
    if (!randomStatus)
        return {
            statusCode:406,
            message: 'لطفا یک استاتوس تعریف کنید.',
        }

    const currentTimeStamp = getCurrentTimeStamp()
    const newAdminSettingData: IAdminSettings = new AdminSettings({

        // userId: randomUser._id,
        // firstDestinationForTickets: randomDepartment._id,
        // showUsersListInSendTicketForm: false,
        // firstStatusTicket: randomStatus._id,
        // maxFileSize: 5.0,
        // customerDepartment: null,
        // registerInPanel: "notActive",
        // exceptionFromChangeFactorTagList: "",
        // loginCodeHack: null,
        // createAt: currentTimeStamp,
        // updateAt: currentTimeStamp,
    })
    await newAdminSettingData.save();
    return {
        statusCode:200,
        message: 'تنظیمات تعریف شد',

    }
}