import express from 'express';
import {getBillData} from "../../controllers/hesabfaOpenController/getBillData";
import {saveAllContactsWithPhoneNumber} from "../../controllers/hesabfaOpenController/saveAllContactsWithPhoneNumber";
import {getSavedBills} from "../../controllers/hesabfaController/getSavedBills";


const router = express.Router();


router.get('/getBillData/:billNumber', getBillData)
router.get('/saveAllContactsWithPhoneNumber', saveAllContactsWithPhoneNumber)
router.get('/getSavedBills/', getSavedBills) // به روز رسانی فایل های  فاکتور bills


// router.get('/getArchive', getArchiveController)
// router.get('/getPending', getPendingController)


export default router;
