// controllers/notificationController.ts
import {Request, Response, NextFunction} from 'express';
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {Subscription} from "../../models/subscription";


const subscribeNotificationController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {
    try {
        const {deviceId, subscription} = req.body;

        const { myToken } = req;
        const phoneNumber = myToken.phoneNumber;
        const userId = myToken.UserInfo.userData.userData.userId;
        // Check if the subscription already exists
        const existingSubscription = await Subscription.findOne({
            userId,
            deviceId,
            phoneNumber,
            endpoint: subscription.endpoint,
        });

        if (existingSubscription) {
            res.status(200).json({ message: 'اشتراک اعلان ها از قبل فعال است.' });
            return
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
            },
        });

        await newSubscription.save();
        res.status(201).json({ message: 'درخواست نوتیف براتون ثبت شد از این به بعد نوتیف میاد. هوراااا!' });
        return
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'این اشتراک قبلا در سیستم ثبت شده است.',
            });
        }

        console.error('Error storing subscription:', error);
        res.status(500).json({ error: error.toString() });
        return
    }

};

export {subscribeNotificationController};
