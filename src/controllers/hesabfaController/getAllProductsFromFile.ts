import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {IUser, User} from "../../models/User";
import fs from 'fs';
import path from 'path';
import {getProductList} from "../../utils/productListFile/getProductList";

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


        const products = await getProductList()
        res.status(200).json({
            data: {
                List: products
            }
        });

    } catch (error) {
        res.status(500).json({error});
        return;
    }
};

export {getAllProductsFromFile};
