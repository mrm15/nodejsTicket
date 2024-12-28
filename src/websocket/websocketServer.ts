// src/websocket/websocketServer.ts
import WebSocket, { WebSocketServer, RawData } from 'ws';
import http from 'http';
import { handleUserMessage } from './handleUserMessage/handleUserMessage';

// نوع پیام‌های وب‌سوکت
export interface WebSocketMessage {
    type: string;
    data: any;
}

// ذخیره شناسه کاربران در مپ
const clients = new Map<WebSocket, string>(); // Map از کلاینت به شناسه کاربر

let wss: WebSocketServer;

// راه‌اندازی وب‌سوکت سرور
export function initializeWebSocket(server: http.Server): void {
    // ایجاد WebSocketServer با سرور HTTP
    wss = new WebSocketServer({ server });

    console.log('WebSocket server initialized');

    // رویداد اتصال کلاینت جدید
    wss.on('connection', (ws: WebSocket) => {
        console.log('New client connected');

        // رویداد دریافت پیام از کلاینت
        ws.on('message', async (message: RawData) => {
            try {
                // تبدیل داده خام به ساختار WebSocketMessage
                const parsedMessage: WebSocketMessage = JSON.parse(message.toString());

                // اگر پیام از نوع 'identify' بود، شناسه کاربر را ثبت کن
                if (parsedMessage.type === 'identify') {
                    const userId = parsedMessage.data.userId;
                    if (userId) {
                        clients.set(ws, userId); // ذخیره کلاینت با شناسه کاربر
                        console.log(`User identified: ${userId}`);
                        console.log(clients);
                    } else {
                        console.error('Identify message received without userId');
                    }
                } else {
                    // سایر پیام‌ها را مدیریت کن
                    await handleUserMessage({ message, ws });
                }
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        });

        // رویداد قطع اتصال کلاینت
        ws.on('close', () => {
            const userId = clients.get(ws);
            if (userId) {
                console.log(`Client disconnected: ${userId}`);
            } else {
                console.log('An unidentified client disconnected');
            }
            clients.delete(ws); // حذف کلاینت از Map
        });
    });
}

// ارسال پیام به همه‌ی کلاینت‌های متصل
export function broadcastMessage(message: WebSocketMessage): void {
    wss.clients.forEach((client: WebSocket) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}
