import {Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";

import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {uuidGenerator} from "../../utils/uuidGenerator";
import {getUserInfoByPhoneNumber} from "../LoginRegisterSms/getUserInfoByPhoneNumber";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {addLog} from "../../utils/logMethods/addLog";
import {submitAddOrEditContactToHesabfa} from "../HesabfaFunction/submitAddOrEditContactToHesabfa";
import getAdminSettingsData from "../../utils/adminSettings/getAdminSettingsData";


const createCustomerController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {
    const { myToken } = req;
    const newUserData = req.body;
    let message="";
    if (!myToken) {
        return res.status(403).json({ message: 'مقدار توکن توی ری کوئست موجود نیست' });
    }

    try {
        const { phoneNumber } = myToken;
        const arrayListToCheck = [ACCESS_LIST.createCustomer];
        const hasAccessToAddUser = await checkAccessList({ phoneNumber, arrayListToCheck });

        if (!hasAccessToAddUser) {
            return res.status(403).json({ message: 'شما مجوز دسترسی به این بخش را ندارید.' });
        }

        // Set default values for userName and isActive if they are not provided.
        // This follows best practices to ensure required fields are set before saving data.
        if (!newUserData.userName) {
            newUserData.userName = uuidGenerator(); // Generates a unique identifier if userName is missing.
        }

        if (newUserData.isActive === undefined || newUserData.isActive === null) {
            newUserData.isActive = true; // Defaults new users to active if not explicitly set.
        }
        // Check if the user with the provided phone number already exists.
        const existingUser : any | {} = await getUserInfoByPhoneNumber(newUserData.phoneNumber);
        if (existingUser && Object.keys(existingUser).length !== 0) {
            // If the user already exists and already has a contactCode, we return an error.
            if (existingUser?.userData?.contactCode) {
                return res.status(409).json({ message: 'کاربر از قبل وجود دارد و دارای contactCode می‌باشد.' });
            }
        } else {
            // If the user does not exist, set additional default fields before creating a new user.
            const adminSetting = await getAdminSettingsData();
            const adminSettingsData = adminSetting.adminSettingData;
            newUserData.departmentId = adminSettingsData?.customerDepartment;
            newUserData.role = adminSettingsData?.customerRole;
            await User.create({ ...newUserData });
            message+="کاربر در سایت نمارنگ ایجاد شد.  ";


        }

        // Prepare contact data to send to Hesabfa.
        const nameHere =(newUserData.name ?? "") + (newUserData.familyName  ?? "")
        let contact = {
            "Code": null,
            "Name": nameHere,
            "Company": newUserData.company,
            "FirstName": nameHere,
            "LastName": newUserData.familyName,
            "ContactType": "1",
            "NationalCode": newUserData.nationalCode,
            "EconomicCode": null,
            "RegistrationNumber": null,
            "Address": newUserData.address,
            "City": newUserData.city,
            "State": newUserData.province,
            "PostalCode": null,
            "Phone": newUserData.mobile,
            "Fax": null,
            "Mobile": newUserData.phoneNumber,
            "Email": null,
            "Website": null,
            "Tag": "از سایت ",
            // "TaxType": "-1",
            "Active": "true",
            "Note": newUserData.description,
            "ContactCredit": null,
            "NodeFamily": "اشخاص : مشتریان عادی"
        }

        // Attempt to add or update contact information in Hesabfa.
        const result2 = await submitAddOrEditContactToHesabfa(contact);
        const contactCode = result2?.Result?.Code;

        // If a valid contactCode is returned, update the user's record accordingly.
        if (contactCode) {
            await User.updateOne(
                { phoneNumber: newUserData.phoneNumber },
                { $set: { contactCode } }
            );
            message+="کاربر در حسابفا ثبت شد و کد مشتری اختصاص یافت."
        }

        // Log the operation for auditing and traceability.
        await addLog({
            req: req,
            name: `${myToken?.UserInfo?.userData?.userData?.name} ${myToken?.UserInfo?.userData?.userData?.familyName}`,
            phoneNumber: req?.myToken?.phoneNumber || "00000000000",
            description: `یک کاربر با مشخصات زیر ایجاد کرد: ${JSON.stringify(newUserData)}`,
            statusCode: 200,
        });

        return res.status(200).json({ message });
    } catch (error) {
        return res.status(500).json({ error: error?.toString() });
    }
};

export { createCustomerController };
