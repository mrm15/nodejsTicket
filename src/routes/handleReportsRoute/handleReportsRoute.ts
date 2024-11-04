import express from 'express';
import {getDashboardController} from "../../controllers/reportsController/getDashboardController";
import {getTodayReportSms} from "../../controllers/reportsController/getTodayReportSms";
import {getAdminReport} from "../../controllers/reportsController/getAdminReport";
import getBillUsersReport from "../../controllers/reportsController/getBillUsersReport/getBillUsersReport";



const router = express.Router();
// اینو از فرانت برداشتم
// router.get('/dashboard', getDashboardController)
router.get('/todayReportSms', getTodayReportSms)
router.post('/adminReport', getAdminReport)
router.post('/billUsers', getBillUsersReport)


export default router;
