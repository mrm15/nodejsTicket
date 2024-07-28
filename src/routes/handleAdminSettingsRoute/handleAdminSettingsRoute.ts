import express from 'express';
import {getAdminSettings} from "../../controllers/adminSettingsController/getAdminSettings";
import {updateAdminSettingsController} from "../../controllers/adminSettingsController/updateAdminSettingsController";
import {getSafeAdminSettings} from "../../controllers/adminSettingsController/getSafeAdminSettings";


const router = express.Router();

router.get('/getAdminSettings', getAdminSettings)
router.get('/getSafeAdminSettings', getSafeAdminSettings)
router.post('/submit', updateAdminSettingsController)  //  // forward  to user Or department


export default router;
