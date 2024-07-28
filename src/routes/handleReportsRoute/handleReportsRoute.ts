import express from 'express';
import {getDashboardController} from "../../controllers/reportsController/getDashboardController";



const router = express.Router();

router.get('/dashboard', getDashboardController)


export default router;
