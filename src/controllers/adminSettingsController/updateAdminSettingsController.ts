import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";
import {getCurrentTimeStamp} from "../../utils/timing";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {booleanToString, stringToBoolean} from "../../utils/stringBoolean";
import {IStatus, Status} from "../../models/status";
import {AdminSettings, IAdminSettings} from "../../models/adminSettings";
import {setNullIfEmpty} from "../../utils/functions";


const updateAdminSettingsController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


        const {myToken} = req;
        const updatedAdminSettings = req.body;

        if (!myToken) {
            const message = 'مقدار توکن توی ری کوئست موجود نیست'
            res.status(403).json({message});
            return
        }

        try {


            const {phoneNumber} = myToken

            const {id} = req.body


            const arrayListToCheck = [
                ACCESS_LIST.ADMIN_SETTINGS
            ]
            const hasAccessToAdminSettings = await checkAccessList({phoneNumber, arrayListToCheck})

            if (!hasAccessToAdminSettings) {
                res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید.'});
                return
            }

            // check if this phone number is uniq
            let currentSettings: IAdminSettings = (await AdminSettings.findOne({}).lean())!


            if (!currentSettings) {
                res.status(500).json({message: "وضعیتی  با این نام یافت نشد."});
                return
            }


            updatedAdminSettings.registerDepartment = setNullIfEmpty(updatedAdminSettings.registerDepartment);
            updatedAdminSettings.registerRole = setNullIfEmpty(updatedAdminSettings.registerRole);



            currentSettings.userId = myToken?.UserInfo?.userData?.userData?.userId;
            currentSettings.firstDestinationForTickets = updatedAdminSettings.firstDestinationForTickets;
            currentSettings.showUsersListInSendTicketForm = updatedAdminSettings.showUsersListInSendTicketForm;
            currentSettings.firstStatusTicket = updatedAdminSettings.firstStatusTicket;
            currentSettings.customerDepartment = updatedAdminSettings.customerDepartment;
            currentSettings.registerInPanel = updatedAdminSettings.registerInPanel;
            currentSettings.registerDepartment = updatedAdminSettings.registerDepartment;
            currentSettings.registerRole = updatedAdminSettings.registerRole;
            currentSettings.maxFileSize = parseFloat(updatedAdminSettings.maxFileSize);
            currentSettings.updateAt = getCurrentTimeStamp();


            await AdminSettings.updateOne({_id: currentSettings._id}, currentSettings).exec();
            res.status(200).json({message: 'تنظیمات مدیریتی با موفقیت ثبت شد.',});
            return;

        } catch (error) {

            res.status(500).json({
                error: error?.toString(),

            });
            return
        }


    }
;

export {updateAdminSettingsController};
