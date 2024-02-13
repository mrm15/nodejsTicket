import express from 'express';
import {logoutController} from "../../controllers/logoutController/logoutController";


const router = express.Router();

router.get('/', logoutController);


export default router;
