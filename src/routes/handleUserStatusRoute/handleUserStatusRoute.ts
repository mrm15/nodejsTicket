import express from 'express';
import {getUserStatus} from "../../controllers/userStatusController/getUserStatus";
import {setUserStatus} from "../../controllers/userStatusController/setUserStatus";


const router = express.Router();

router.get('/getUserStatus', getUserStatus)
router.post('/setUserStatus', setUserStatus)  //  // forward  to user Or department


export default router;
