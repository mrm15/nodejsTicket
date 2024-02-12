import express from 'express';
import {departmentList} from "../../controllers/departmentController/departmentList";
import {readDepartmentController} from "../../controllers/departmentController/readDepartmentController";
import {createDepartmentController} from "../../controllers/departmentController/createDepartmentController";
import {updateDepartmentController} from "../../controllers/departmentController/updateDepartmentController";
import {deleteDepartmentController} from "../../controllers/departmentController/deleteDepartmentController";

const router = express.Router();

router.post('/create', createDepartmentController);
router.get('/read', readDepartmentController);
router.post('/update', updateDepartmentController);
router.delete('/delete/:id', deleteDepartmentController);
router.get('/departmentList', departmentList);

export default router;
