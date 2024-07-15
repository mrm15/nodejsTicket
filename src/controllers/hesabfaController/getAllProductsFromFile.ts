import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {IUser, User} from "../../models/User";
import fs from 'fs';
import path from 'path';

const getAllProductsFromFile = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    const {myToken} = req;
    if (!myToken) {
        const message = 'مقدار توکن توی ری کوئست موجود نیست';
        res.status(200).json({message});
        return;
    }

    try {
        const {userId} = myToken?.UserInfo?.userData?.userData;
        const foundUser: IUser | null = await User.findOne({_id: userId}).lean();

        if (!foundUser) {
            res.status(401).json({message: 'کاربری با این شماره تلفن یافت نشد'});
            return;
        }

        const filePath = path.join(__dirname, 'products.json');

        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            res.status(500).json({message: 'فایل محصولات یافت نشد'});
            return;
        }

        // Read data from the file
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.status(500).json({message: 'خطا در خواندن فایل محصولات'});
                return;
            }

            const products = JSON.parse(data);
            res.status(200).json({
                data: {
                    List: products
                }
            });
        });

    } catch (error) {
        res.status(500).json({error});
        return;
    }
};

export {getAllProductsFromFile};
