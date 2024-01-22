import { Router } from 'express';
import { handleNewUserSMS } from '../../controllers/LoginRegisterSms/registerViaSmsController';

const router = Router();

router.post('/new', handleNewUserSMS.handleNewUserSMS);
router.post('/verify', handleNewUserSMS.handleVerifySMS);

export default router;
