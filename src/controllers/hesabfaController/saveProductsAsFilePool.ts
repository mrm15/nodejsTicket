import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import 'dotenv/config';
import saveProductList from "../../utils/productListFile/saveProductList";

const saveProductsAsFilePool = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    const {myToken} = req;
    if (!myToken) {
        res.status(200).json({message: 'مقدار توکن توی ری کوئست موجود نیست'});
        return;
    }

    try {
        await saveProductList();
        res.status(200).json({
            message: "جهت تست فایل pool را چک کنید."
        })
    } catch (error) {
        res.status(500).json({error});
        return;
    }
};

export {saveProductsAsFilePool};

