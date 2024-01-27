import express from 'express';
import * as loginController from '../../controllers/LoginRegisterSms/loginController';
import {admin} from "../../controllers/Admin/admin"

const router = express.Router();

router.get('/', admin);


export default router;