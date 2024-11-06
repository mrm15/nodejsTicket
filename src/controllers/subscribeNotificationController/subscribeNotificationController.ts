import {Request, Response, NextFunction} from 'express';
import {IUser, User} from "../../models/User";
import {getCurrentTimeStamp} from "../../utils/timing";
import {CustomRequestMyTokenInJwt} from "../../middleware/verifyJWT";
import {ACCESS_LIST} from "../../utils/ACCESS_LIST";
import {checkAccessList} from "../../utils/checkAccessList";
import {Department} from "../../models/department";
import {stringToBoolean} from "../../utils/stringBoolean";
import {Status, IStatus} from "../../models/status";


const subscriptions: PushSubscription[] = [];

const subscribeNotificationController = async (req: CustomRequestMyTokenInJwt, res: Response, next: NextFunction) => {

    // const {myToken} = req;

    // res.status(201).json({myToken})
    //
    // return

    // if (!myToken) {
    //     const message = 'مقدار توکن توی ری کوئست موجود نیست'
    //     res.status(403).json({message});
    //     return
    // }

    try {


        const subscription = req.body;

        // Check if subscription already exists
        const isSubscribed = subscriptions.some(
            (sub) => JSON.stringify(sub) === JSON.stringify(subscription)
        );

        if (!isSubscribed) {
            subscriptions.push(subscription);
            console.log('New subscription added:', subscription);
        }

        res.status(201).json({ message: 'Subscription added' });
        return;

    } catch (error) {

        res.status(500).json({
            error: error?.toString(),
        });
        return
    }

};

export {subscribeNotificationController};
