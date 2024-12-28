import WebSocket, { RawData } from 'ws';
import { WebSocketMessage } from '../websocketServer';
import sleep from '../../utils/sleep';

interface HandleUserMessageArgs {
    message: RawData; // نوع داده‌ای خام دریافتی (RawData)
    ws: WebSocket;    // نوع سوکت (WebSocket)
}

export const handleUserMessage = async ({ message, ws }: HandleUserMessageArgs) => {
    // تبدیل داده‌ی خام به آبجکت WebSocketMessage
    const parsedMessage: WebSocketMessage = JSON.parse(message.toString());

    console.log('Received message:', parsedMessage);

    // نمونه تاخیر 3 ثانیه‌ای
    await sleep(3000);

    // مدیریت پیام‌های مختلف، نمونه برای پیام 'ping'
    if (parsedMessage.type === 'ping') {
        ws.send(JSON.stringify({ type: 'pong', data: 'Hello from server!' }));
    }

    // لاگ کردن پیام خام
    console.log(message);
};
