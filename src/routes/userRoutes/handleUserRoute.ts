import express from 'express';
import {createUserController} from '../../controllers/userController/createUserController';
import {readUserController} from "../../controllers/userController/readUserController";
import {updateUserController} from "../../controllers/userController/updateUserController";
import {deleteUserController} from "../../controllers/userController/deleteUserController";
import {userList} from "../../controllers/userController/userList";
import {getUserInfo} from "../../controllers/userController/getUserInfo";
import {updateHisInfo} from "../../controllers/userController/updateHisInfo";
import {userListDetails} from "../../controllers/userController/userListDetails";
import {createCustomerController } from "../../controllers/userController/createFullUserController";

const router = express.Router();

router.post('/create', createUserController);
router.post('/createFullUser', createCustomerController);
// router.get('/read', readUserController);
router.post('/read', readUserController);
// router.post('/read:id', loginController.verifyLoginSMS);
router.post('/update', updateUserController);
router.delete('/delete/:id', deleteUserController);
router.get('/userList', userList);
router.get('/userListDetails', userListDetails);
router.get('/info', getUserInfo);
router.post('/updateInfo', updateHisInfo); // update by id in token  user is changing his info


export default router;
