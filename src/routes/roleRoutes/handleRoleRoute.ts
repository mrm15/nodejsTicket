import express from 'express';
import {createRoleController} from '../../controllers/roleController/createRoleController';
import {readRoleController} from "../../controllers/roleController/readRoleController";
import {updateRoleController} from "../../controllers/roleController/updateRoleController";
import {deleteRoleController} from "../../controllers/roleController/deleteRoleController";
import {roleList} from "../../controllers/roleController/roleList";

const router = express.Router();

router.post('/create', createRoleController);
router.get('/read', readRoleController);
router.post('/read', readRoleController);
router.post('/update', updateRoleController);
router.delete('/delete/:id', deleteRoleController);
router.get('/roleList', roleList);

export default router;
