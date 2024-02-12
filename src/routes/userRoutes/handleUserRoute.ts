import express from 'express';
import {createUserController} from '../../controllers/userController/createUserController';
import {readUserController} from "../../controllers/userController/readUserController";
import {updateUserController} from "../../controllers/userController/updateUserController";
import {deleteUserController} from "../../controllers/userController/deleteUserController";
import {departmentList} from "../../controllers/departmentController/departmentList";
import {userList} from "../../controllers/userController/userList";

const router = express.Router();

router.post('/create', createUserController);
router.get('/read', readUserController);
// router.post('/read:id', loginController.verifyLoginSMS);
router.post('/update', updateUserController);
router.delete('/delete/:id', deleteUserController);
router.get('/userList', userList);


export default router;
