import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {IUser, User} from "../../models/User";
import fs from 'fs';
import path from 'path';

const getAllProductsFromFilePublic = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {



    try {
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

export {getAllProductsFromFilePublic};
