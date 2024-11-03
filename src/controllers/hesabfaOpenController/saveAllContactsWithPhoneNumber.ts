import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {IUser, User} from "../../models/User";
import axios from "axios";
import {handleResponse} from "../utility/handleResponse";
import {timestampToTime} from "../../utils/timestampToTime";
import {AdminSettings, IAdminSettings} from "../../models/adminSettings";
import {converthesabfaToSiteObject} from "./converthesabfaToSiteObject";


const saveAllContactsWithPhoneNumber = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const API_KEY = process.env.HESABFA_API_KEY
    if (!API_KEY) {
        res.status(500).json({message: 'api key یافت نشد'});
        return
    }
    const LOGIN_TOKEN = process.env.HESABFA_LOGIN_TOKEN
    if (!LOGIN_TOKEN) {
        res.status(500).json({message: 'LOGIN TOKEN یافت نشد'});
        return
    }

    try {
        // دریافت تمام مخاطبین از حسابفا
        try {
            const url = ' https://api.hesabfa.com/v1/contact/getcontacts'
            const data = {
                apiKey: API_KEY,
                // userId: 'mail@example.com',
                // password: '123456',
                loginToken: LOGIN_TOKEN,
                queryInfo: {
                    SortBy: 'Code',
                    SortDesc: true,
                    Take: 100000,
                    Skip: 0,
                }
            }
            const result = await axios.post(url, data);
            const contactList = result.data.Result.List;
            const AllContactsWithPhoneNumber = contactList.filter((row: any) => row.Mobile !== "");

            // در حال حاضر کاربارن باید توی کدوم دپارتمان عضو شن؟
            const adminSettingsResult: IAdminSettings = (await AdminSettings.findOne({}).lean())!
            const registerDepartment = adminSettingsResult?.registerDepartment
            const myRole = (adminSettingsResult?.registerRole)!;


            const resultOfSaveNewContactsFromHesabfaToTable = await Promise.all(AllContactsWithPhoneNumber.map(async (singleContacts: any, index: number) => {
                let row;


                row = converthesabfaToSiteObject({
                    contact: singleContacts,
                    departmentId: registerDepartment,
                    role: myRole
                });
                try {

                    // اول چک کنم آیا همچنی مخاطبی دارم یا نه اگه دارم که هیچی
                    const isThereSameContact: IUser | null = await User.findOne({phoneNumber: row.phoneNumber}).exec()


                    if(row.nationalCode===""){
                        return "no nationalCode!!!";
                    }

                    if (isThereSameContact) {
                        return "same: " + row.phoneNumber;
                    }

                    const saveNewContact = await User.create(row);
                    return saveNewContact.phoneNumber;

                } catch (error) {
                    return error
                }
            }));

            res.status(200).json({
                result: resultOfSaveNewContactsFromHesabfaToTable

            })
            return;

        } catch (error: any) {
            const statusCode = error?.status || 500
            res.status(statusCode).json({
                message: error?.toString(),
            })
            return;
        }

    } catch (error) {

        res.status(500).json({error});
        return
    }


};

export {saveAllContactsWithPhoneNumber};
