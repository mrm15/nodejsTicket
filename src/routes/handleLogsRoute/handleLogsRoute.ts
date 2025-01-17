import express from 'express';
import {readLogsController} from "../../controllers/logsController/readLogsController";
import {deleteLogController} from "../../controllers/logsController/deleteLogController";


const router = express.Router();

router.post('/read', readLogsController);
router.delete('/delete/', deleteLogController);
// router.get('/info', getUserInfo);
// router.post('/updateInfo', updateHisInfo); // update by id in token  user is changing his info


export default router;
