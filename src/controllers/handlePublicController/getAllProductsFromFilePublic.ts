import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {getProductList} from "../../utils/productListFile/getProductList";
import {productMapper} from "./productMapper";
const getAllProductsFromFilePublic = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    try {

        // این تابع خودش هر 6 ساعت یه بار به روز میشه
        const allProducts = await getProductList();

        const neededProducts = productMapper(allProducts || [])
        // این تایه هم در صورتی که 6 ساعت رد شده باشه باید دوباره آجکت رو بسازه در غیر این صورت دیتا قبلی رو بده
        // const
        res.status(200).json({
            data: {
                List: neededProducts,
            }
        });
    } catch (error) {
        res.status(500).json({error});
        return;
    }
};

export {getAllProductsFromFilePublic};
