import express from 'express';
import {readLogsController} from "../../controllers/logsController/readLogsController";


const router = express.Router();

router.post('/read', readLogsController);
// router.delete('/delete/:id', deleteUserController);
// router.get('/info', getUserInfo);
// router.post('/updateInfo', updateHisInfo); // update by id in token  user is changing his info


export default router;
