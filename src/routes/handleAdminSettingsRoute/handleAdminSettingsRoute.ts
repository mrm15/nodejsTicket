import express from 'express';
import {getAdminSettings} from "../../controllers/adminSettingsController/getAdminSettings";
import {updateAdminSettingsController} from "../../controllers/adminSettingsController/updateAdminSettingsController";


const router = express.Router();

router.get('/getAdminSettings', getAdminSettings)
router.post('/submit', updateAdminSettingsController)  //  // forward  to user Or department


export default router;
