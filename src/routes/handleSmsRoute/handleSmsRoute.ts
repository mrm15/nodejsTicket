import express from 'express';
import {createSmsTask} from "../../controllers/smsController/createSmsTask";
import {getArchiveController} from "../../controllers/smsController/getArchiveController";
import {getPendingController} from "../../controllers/smsController/getPendingController";


const router = express.Router();

router.post('/create', createSmsTask)
router.get('/getArchive', getArchiveController)
router.get('/getPending', getPendingController)


export default router;
