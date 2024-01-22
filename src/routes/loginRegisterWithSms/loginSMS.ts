import express from 'express';
import * as loginController from '../../controllers/LoginRegisterSms/loginController';

const router = express.Router();

router.post('/new', loginController.handleLoginSMS);
router.post('/verify', loginController.verifyLoginSMS);

export default router;
