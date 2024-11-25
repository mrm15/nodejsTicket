import express from 'express';
import {
    subscribeNotificationController
} from "../../controllers/subscribeNotificationController/subscribeNotificationController";


const router = express.Router();
router.post('/', subscribeNotificationController)
router.get('/', (req,res)=>{

    res.status(200).json({
        message:"Hi ",
    })
    return

})




export default router;
