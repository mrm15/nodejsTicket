import { Subscription } from "../../models/subscription";
import webPush from "../../config/notifications";

interface NotificationPayload {
    userId?: string;
    phoneNumber?: string;
    notification: {
        title: string;
        body: string;
        icon?: string;
        click_action?: string;
    };
}
/**
 * Sends a push notification to a specific user.
 * @param payload - Object containing userId, phoneNumber, and notification content
 */
const sendNotificationToUser = async (payload: NotificationPayload) => {
    try {

        const { userId, phoneNumber, notification } = payload;

        // Find subscriptions by userId or phoneNumber
        const subscriptions = await Subscription.find({
            $or: [
                { userId: userId || undefined },
                { phoneNumber: phoneNumber || undefined },
            ],
        }).lean();

        if (subscriptions.length === 0) {
            console.warn(`No subscriptions found for userId: ${userId} or phoneNumber: ${phoneNumber}`);
            return;
        }

        // Filter out expired or unsubscribed subscriptions
        const validSubscriptions = subscriptions.filter(sub => {
            return sub.endpoint && sub.keys; // Check if the endpoint and keys are valid
        });

        if (validSubscriptions.length === 0) {
            console.warn('No valid subscriptions found.');
            return;
        }

        // Prepare payload

        const pushPayload = JSON.stringify({
            title: notification.title,
            body: notification.body,
            icon: notification.icon || '/default-icon.png',
            click_action: notification.click_action || '/',
        });
        // Send notifications
        const notifications = validSubscriptions.map((sub) =>
            webPush.sendNotification(
                {
                    endpoint: sub.endpoint,
                    keys: sub.keys,
                },
                pushPayload
            )
        );
        await Promise.all(notifications);
    } catch (error) {
        console.error('Error sending notification:', error);
    }

};

export { sendNotificationToUser };
