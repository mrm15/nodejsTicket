import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {IUser, User} from "../../models/User";
import axios from "axios";
import {handleResponse} from "../utility/handleResponse";
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const saveProductsAsFile = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const API_KEY = process.env.HESABFA_API_KEY;
    if (!API_KEY) {
        res.status(500).json({message: 'API key یافت نشد'});
        return;
    }
    const LOGIN_TOKEN = process.env.HESABFA_LOGIN_TOKEN;
    if (!LOGIN_TOKEN) {
        res.status(500).json({message: 'LOGIN TOKEN یافت نشد'});
        return;
    }

    const {myToken} = req;
    if (!myToken) {
        res.status(200).json({message: 'مقدار توکن توی ری کوئست موجود نیست'});
        return;
    }

    try {
        const {userId} = myToken?.UserInfo?.userData?.userData;
        const foundUser: IUser | null = await User.findOne({_id: userId}).lean();

        if (!foundUser) {
            res.status(401).json({message: 'کاربری با این شماره تلفن یافت نشد'});
            return;
        }

        const url = 'https://api.hesabfa.com/v1/item/getitems';
        const data = {
            apiKey: API_KEY,
            loginToken: LOGIN_TOKEN,
            queryInfo: {
                SortBy: 'Code',
                SortDesc: true,
                Take: 10000,
                Skip: 0,
                Filters: []
            }
        };

        try {
            const result = await axios.post(url, data);
            handleResponse(result, res);

            // Save products to JSON file
            const products = result.data?.Result?.List || [];
            const filePath = path.join(__dirname, 'products.json');

            // Check if file exists and delete it
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            // Write new data to the file
            fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

        } catch (error: any) {
            res.status(500).json({
                message: error?.toString(),
            });
            return;
        }
    } catch (error) {
        res.status(500).json({error});
        return;
    }
};

export {saveProductsAsFile};
