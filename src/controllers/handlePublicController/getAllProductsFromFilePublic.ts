import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {getProductList} from "../../utils/productListFile/getProductList";
import {productMapper} from "./productMapper";
import {addLog} from "../../utils/logMethods/addLog";
const getAllProductsFromFilePublic = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    try {

        // این تابع خودش هر 6 ساعت یه بار به روز میشه
        const allProducts = await getProductList();

        const neededProducts = productMapper(allProducts || [])
        // این تایه هم در صورتی که 6 ساعت رد شده باشه باید دوباره آجکت رو بسازه در غیر این صورت دیتا قبلی رو بده
        // const
        await addLog({
            req: req,
            phoneNumber: req?.myToken?.phoneNumber || "00000000000",
            description: "صفحه ی قیمت های محصولات مشاهده شد!",
            statusCode: 200,
        })
        res.status(200).json({
            data: {
                List: neededProducts,
            }
        });
    } catch (error:any) {
        await addLog({
            req: req,
            phoneNumber: req?.myToken?.phoneNumber || "000000",
            description: "خطا در لود صفحه ی قیمت ها!",
            statusCode: 500,
        })
        res.status(500).json({error: error.toString()});
        return;
    }
};

export {getAllProductsFromFilePublic};
