import { WebSocketMessage } from './websocketServer';

// مدیریت پیام ورودی
export function handleIncomingMessage(message: WebSocketMessage): void {
    console.log("Handling incoming message:", message);

    // اینجا می‌تونی بر اساس نوع پیام‌ها رفتار متفاوتی داشته باشی
    if (message.type === "ping") {
        console.log("Ping received");
    }
}

// ساختاردهی پیام خروجی
export function formatMessage(type: string, data: any): WebSocketMessage {
    return { type, data };
}
