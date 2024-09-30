import express, {Request, Response} from "express";
import {initialSetupFunction} from "./initialSetupFunction";


const router = express.Router();

export const initialSetup = async (req: Request, res: Response): Promise<void> => {
    const resultOfAdd = await initialSetupFunction()
    res.status(resultOfAdd.statusCode).json({message: resultOfAdd.message})
}


router.get('/', initialSetup);
export default router;
