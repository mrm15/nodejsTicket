import webPush from 'web-push';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

// Access VAPID keys from environment variables
const PUBLIC_VAPID_KEY = process.env.PUBLIC_VAPID_KEY as string;
const PRIVATE_VAPID_KEY = process.env.PRIVATE_VAPID_KEY as string;

webPush.setVapidDetails(
    'mailto:mrm.learn@gmail.com', // Replace with a valid email
    PUBLIC_VAPID_KEY,
    PRIVATE_VAPID_KEY
);

export default webPush;
