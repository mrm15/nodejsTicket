import express from 'express';
import {getUserStatus} from "../../controllers/userStatusController/getUserStatus";
import {setUserStatus} from "../../controllers/userStatusController/setUserStatus";
import {createSmsTask} from "../../controllers/smsController/createSmsTask";


const router = express.Router();

router.post('/create', createSmsTask)


export default router;
