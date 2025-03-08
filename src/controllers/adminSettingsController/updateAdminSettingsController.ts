import {Request, Response, NextFunction} from 'express';

import {getCurrentTimeStamp} from "../../utils/timing";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";


import {AdminSettings, IAdminSettings} from "../../models/adminSettings";
import {setNullIfEmpty} from "../../utils/functions";
import {addLog} from "../../utils/logMethods/addLog";
import cacheKeyNames from "../../utils/cache/cacheKeyNames";
import myNodeCache from "../../utils/cache/cache";


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

            debugger
            currentSettings.userId = myToken?.UserInfo?.userData?.userData?.userId;
            currentSettings.firstDestinationForTickets = updatedAdminSettings.firstDestinationForTickets;
            currentSettings.billDepartmentId = updatedAdminSettings.billDepartmentId;
            currentSettings.showUsersListInSendTicketForm = updatedAdminSettings.showUsersListInSendTicketForm;
            currentSettings.firstStatusTicket = updatedAdminSettings.firstStatusTicket;
            currentSettings.registerInPanel = updatedAdminSettings.registerInPanel;
            currentSettings.maxFileSize = parseFloat(updatedAdminSettings.maxFileSize);
            currentSettings.customerDepartment = updatedAdminSettings.customerDepartment;
            currentSettings.customerRole = updatedAdminSettings.customerRole;
            currentSettings.registerDepartment = updatedAdminSettings.registerDepartment;
            currentSettings.registerRole = updatedAdminSettings.registerRole;
            currentSettings.forwardTicketsAfterVerify = updatedAdminSettings.forwardTicketsAfterVerify || null;
            currentSettings.sendSMSAfterSubmitBill = updatedAdminSettings.sendSMSAfterSubmitBill;
            currentSettings.sendSMSAfterVerifyBill = updatedAdminSettings.sendSMSAfterVerifyBill;
            currentSettings.exceptionFromChangeFactorTagList = updatedAdminSettings.exceptionFromChangeFactorTagList;
            currentSettings.loginCodeHack = updatedAdminSettings.loginCodeHack;
            currentSettings.mainFileMessageTagId = updatedAdminSettings.mainFileMessageTagId|| null;
            currentSettings.screenShotMessageTagId = updatedAdminSettings.screenShotMessageTagId|| null;
            currentSettings.billMessageTagId = updatedAdminSettings.billMessageTagId|| null;
            currentSettings.nodeFileMessageId = updatedAdminSettings.nodeFileMessageId|| null;
            currentSettings.updateAt = getCurrentTimeStamp();


            await AdminSettings.updateOne({_id: currentSettings._id}, currentSettings).exec();
            await addLog({
                req: req,
                name: myToken?.UserInfo?.userData?.userData?.name + " " + myToken?.UserInfo?.userData?.userData?.familyName,
                phoneNumber: req?.myToken?.phoneNumber || "00000000000",
                description: `به روز رسانی تنظیمات مدیریتی 
            ${JSON.stringify(currentSettings)}
            `,
                statusCode: 200,
            })
            // کش ها رو اینجا حدف میکنیم چون آپدیت شده
            myNodeCache.del(cacheKeyNames.adminSettings);
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
