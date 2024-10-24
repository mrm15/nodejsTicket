import express from "express";
import {initialSetupFunction} from "../../utils/initialSetup/initialSetupFunction";

const router = express.Router();
const initialSetUpHandle = async (req: any, res: any) => {
    const result123 = await initialSetupFunction();
    res.status(result123.statusCode).json({
        status: true,
        message: result123.message + " اولین کاربر ایجاد شد"
    });
    return

}
router.get('/', initialSetUpHandle);

export default router;
