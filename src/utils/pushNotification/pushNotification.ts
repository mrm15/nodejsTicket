import { Subscription } from "../../models/subscription";
import webPush from "web-push";

interface NotificationPayload {
    userId?: string;
    phoneNumber?: string;
    notification: {
        title: string;
        body: string;
        icon?: string;
        clickAction?: string;
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
        });

        if (subscriptions.length === 0) {
            console.warn(`No subscriptions found for userId: ${userId} or phoneNumber: ${phoneNumber}`);
            return;
        }

        // Prepare payload
        const pushPayload = JSON.stringify({
            title: notification.title,
            body: notification.body,
            icon: notification.icon || '/default-icon.png',
            click_action: notification.clickAction || '/',
        });

        // Send notifications
        const notifications = subscriptions.map((sub) =>
            webPush.sendNotification(
                {
                    endpoint: sub.endpoint,
                    keys: sub.keys,
                },
                pushPayload
            )
        );

        await Promise.all(notifications);

        console.log(`Notifications sent to ${subscriptions.length} devices.`);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

export { sendNotificationToUser };
