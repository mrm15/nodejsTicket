import express from 'express';
import {createRoleController} from '../../controllers/roleController/createRoleController';
import {readRoleController} from "../../controllers/roleController/readRoleController";
import {updateRoleController} from "../../controllers/roleController/updateRoleController";
import {deleteRoleController} from "../../controllers/roleController/deleteRoleController";
import {roleList} from "../../controllers/roleController/roleList";
import {createMessageTagController} from "../../controllers/messageTagController/createMessageTagController";
import {readMessageTagController} from "../../controllers/messageTagController/readMessageTagController";
import {updateMessageTagController} from "../../controllers/messageTagController/updateMessageTagController";
import {deleteMessageTagController} from "../../controllers/messageTagController/deleteMessageTagController";
import {messageTagList} from "../../controllers/messageTagController/messageTagList";

const router = express.Router();

router.post('/create', createMessageTagController);
router.post('/read', readMessageTagController);
router.post('/update', updateMessageTagController);
router.delete('/delete/:id', deleteMessageTagController);
router.get('/tagsList', messageTagList);

export default router;
