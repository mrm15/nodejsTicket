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
 * Removes expired or unsubscribed endpoints from the database.
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

        // Filter out subscriptions missing endpoint or keys
        const validSubscriptions = subscriptions.filter((sub) => sub.endpoint && sub.keys)

        if (validSubscriptions.length === 0) {
            console.warn("No valid subscriptions found.");
            return;
        }

        // Prepare payload
        const pushPayload = JSON.stringify({
            title: notification.title,
            body: notification.body,
            icon: notification.icon || "/default-icon.png",
            click_action: notification.click_action || "/",
        });

        // Send notifications and handle errors
        const notifications = validSubscriptions.map(async (sub) => {
            try {
                await webPush.sendNotification(
                    {
                        endpoint: sub.endpoint,
                        keys: sub.keys,
                    },
                    pushPayload
                );
                console.log(" 1 notification sent To user :" , sub.phoneNumber)
            } catch (error: any) {
                if (error.statusCode === 410 || error.statusCode === 404) {
                    // Subscription is no longer valid, remove it from the database
                      console.warn(`Removing expired subscription: ${sub.endpoint}`);
                    await Subscription.deleteOne({ _id: sub._id });
                } else {
                    console.error(`Error sending notification to ${sub.endpoint}:`, error);
                }
            }
        });

        // Wait for all notifications to be sent
        await Promise.all(notifications);

    } catch (error) {
        console.error("Error sending notification:", error);
    }
};

export { sendNotificationToUser };
