import express from 'express';
import {getAdminSettings} from "../../controllers/adminSettingsController/getAdminSettings";
import {updateAdminSettingsController} from "../../controllers/adminSettingsController/updateAdminSettingsController";
import {getSafeAdminSettings} from "../../controllers/adminSettingsController/getSafeAdminSettings";


const router = express.Router();

router.get('/getAdminSettings', getAdminSettings)
router.get('/getSafeAdminSettings', getSafeAdminSettings) // no logs
router.post('/submit', updateAdminSettingsController)  //


export default router;
