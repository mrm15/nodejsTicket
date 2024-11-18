import express from 'express';

import {allBanksFirstUserId} from "../../controllers/bankingRouteController/allBanksFirstUserId";
import {myBankDepartment} from "../../controllers/bankingRouteController/myBankDepartment";
import {myBankFirstUserId} from "../../controllers/bankingRouteController/myBankFirstUserId";


const router = express.Router();

router.post('/myBankFirstUserId', myBankFirstUserId);
router.post('/allBanksFirstUserId', allBanksFirstUserId);
router.post('/myBankDepartment', myBankDepartment);




export default router;
