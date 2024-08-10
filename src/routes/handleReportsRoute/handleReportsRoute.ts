import express from 'express';
import {getDashboardController} from "../../controllers/reportsController/getDashboardController";
import {getTodayReportSms} from "../../controllers/reportsController/getTodayReportSms";
import {getAdminReport} from "../../controllers/reportsController/getAdminReport";



const router = express.Router();

router.get('/dashboard', getDashboardController)
router.get('/todayReportSms', getTodayReportSms)
router.post('/adminReport', getAdminReport)


export default router;
