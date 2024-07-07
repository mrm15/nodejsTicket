import express from 'express';
import {getBillData} from "../../controllers/hesabfaOpenController/getBillData";
import {saveAllContactsWithPhoneNumber} from "../../controllers/hesabfaOpenController/saveAllContactsWithPhoneNumber";


const router = express.Router();


router.get('/getBillData/:billNumber', getBillData)
router.get('/saveAllContactsWithPhoneNumber', saveAllContactsWithPhoneNumber)

// router.get('/getArchive', getArchiveController)
// router.get('/getPending', getPendingController)


export default router;
