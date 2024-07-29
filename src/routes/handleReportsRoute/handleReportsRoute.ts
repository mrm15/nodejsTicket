import express from 'express';
import {getDashboardController} from "../../controllers/reportsController/getDashboardController";
import {getTodayReportSms} from "../../controllers/reportsController/getTodayReportSms";



const router = express.Router();

router.get('/dashboard', getDashboardController)
router.get('/todayReportSms', getTodayReportSms)


export default router;
