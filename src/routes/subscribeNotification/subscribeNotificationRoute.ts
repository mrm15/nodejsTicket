import express from 'express';
import {
    subscribeNotificationController
} from "../../controllers/subscribeNotificationController/subscribeNotificationController";
import {sendNotificationToUser} from "../../utils/pushNotification/pushNotification";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";


const router = express.Router();
router.post('/', subscribeNotificationController)
router.get('/', (req, res) => {

    res.status(200).json({
        message: "Hi ",
    })
    return

})

router.post('/test', async (req: CustomRequestMyTokenInJwt, res) => {
    const phoneNumber = req.myToken.phoneNumber
    await sendNotificationToUser({
        userId: undefined,
        phoneNumber,
        notification: {
            title: "از روی سرور واقعی میاد",
            body: "  آخ جون بالاخره کار کرد.هورااااا این نوتیفیکیشن از روی سرور واقعی میاد 💖",
            icon: "",
            click_action: "/",
        }
    })
    res.status(200).json({
        message: "Hi ",
    })
    return
})


export default router;
