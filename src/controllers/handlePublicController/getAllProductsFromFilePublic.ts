import {NextFunction, Response} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {getProductList} from "../../utils/productListFile/getProductList";

const getAllProductsFromFilePublic = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {


    try {

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

export {getAllProductsFromFilePublic};
