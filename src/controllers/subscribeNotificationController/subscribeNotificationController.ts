// controllers/notificationController.ts
import {Request, Response, NextFunction} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {Subscription} from "../../models/subscription";


const subscribeNotificationController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {
    try {
        const {deviceId, subscription} = req.body;

        const {myToken} = req;
        const phoneNumber = myToken.phoneNumber
        const userId = myToken.UserInfo.userData.userData.userId
        // Check if the deviceId already exists for the user
        const existingSubscription = await Subscription.findOne({userId, deviceId, endpoint:subscription.endpoint});

        if (existingSubscription) {
            return res.status(200).json({message: 'برای نوتیف قبلا توی  سییتم ثبت شدید!'});
        }

        // Save the new subscription to MongoDB
        const newSubscription = new Subscription({
            userId,
            phoneNumber,
            deviceId, // Unique for each device
            endpoint: subscription.endpoint,
            expirationTime: subscription.expirationTime,
            keys: {
                p256dh: subscription.keys.p256dh,
                auth: subscription.keys.auth,
            }
        })
        await newSubscription.save()
        res.status(201).json({message: 'درخواست نوتیف براتون ثبت شد از این ب بعد نوتیف میاد. هوراااا!'});

        return
    } catch (error: any) {
        console.error('Error storing subscription:', error);
        res.status(500).json({error: error.toString()});
    }
};

export {subscribeNotificationController};
