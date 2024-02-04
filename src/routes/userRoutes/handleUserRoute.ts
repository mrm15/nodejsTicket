import express from 'express';
import {createUserController} from '../../controllers/userController/createUserController';

const router = express.Router();

router.post('/create', createUserController);
// router.post('/read', loginController.verifyLoginSMS);
// router.post('/read:id', loginController.verifyLoginSMS);
// router.post('/update/:id', loginController.verifyLoginSMS);
// router.post('/delete/:id', loginController.verifyLoginSMS);

export default router;
