import express from 'express';
import {getBillData} from "../../controllers/hesabfaOpenController/getBillData";


const router = express.Router();


router.get('/getBillData/:billNumber', getBillData)

// router.get('/getArchive', getArchiveController)
// router.get('/getPending', getPendingController)


export default router;
