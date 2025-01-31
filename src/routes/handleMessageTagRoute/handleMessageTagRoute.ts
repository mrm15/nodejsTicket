import express from 'express';
import {createRoleController} from '../../controllers/roleController/createRoleController';
import {readRoleController} from "../../controllers/roleController/readRoleController";
import {updateRoleController} from "../../controllers/roleController/updateRoleController";
import {deleteRoleController} from "../../controllers/roleController/deleteRoleController";
import {roleList} from "../../controllers/roleController/roleList";
import {createMessageTagController} from "../../controllers/messageTagController/createMessageTagController";
import {readMessageTagController} from "../../controllers/messageTagController/readMessageTagController";
import {updateMessageTagController} from "../../controllers/messageTagController/updateMessageTagController";

const router = express.Router();

router.post('/create', createMessageTagController);
router.post('/read', readMessageTagController);
router.post('/update', updateMessageTagController);
router.delete('/delete/:id', deleteRoleController);
router.get('/roleList', roleList);

export default router;
