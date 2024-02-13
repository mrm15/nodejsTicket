import express from 'express';
import {statusList} from "../../controllers/statusController/statusList";
import {readStatusController} from "../../controllers/statusController/readStatusController";
import {createStatusController} from "../../controllers/statusController/createStatusController";
import {updateStatusController} from "../../controllers/statusController/updateStatusController";
import {deleteStatusController} from "../../controllers/statusController/deleteStatusController";

const router = express.Router();

router.post('/create', createStatusController);
router.get('/read', readStatusController);
router.post('/update', updateStatusController);
router.delete('/delete/:id', deleteStatusController);
router.get('/departmentList', statusList);

export default router;
