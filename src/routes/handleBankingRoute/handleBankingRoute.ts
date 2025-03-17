import express from 'express';

import {allBanksFirstUserId} from "../../controllers/bankingRouteController/allBanksFirstUserId";
import {myBankDepartment} from "../../controllers/bankingRouteController/myBankDepartment";
import {myBankFirstUserId} from "../../controllers/bankingRouteController/myBankFirstUserId";
import {detailsBankController} from "../../controllers/bankingRouteController/detailsBankController";


const router = express.Router();

router.post('/myBankFirstUserId', myBankFirstUserId);
router.post('/allBanksFirstUserId', allBanksFirstUserId);
router.post('/myBankDepartment', myBankDepartment);
router.post('/detailsBank', detailsBankController);




export default router;
