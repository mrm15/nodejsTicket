import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';
import { handleUserMessage } from './handleUserMessage/handleUserMessage';

// نوع پیام‌های وب‌سوکت
export interface WebSocketMessage {
    type: string;
    data: any;
}

// ذخیره شناسه کاربران
const clients = new Map<WebSocket, string>(); // Map از کلاینت به شناسه کاربر

let wss: WebSocketServer;

// راه‌اندازی وب‌سوکت سرور
export function initializeWebSocket(server: http.Server): void {
    wss = new WebSocketServer({ server });

    console.log('WebSocket server initialized');

    wss.on('connection', (ws) => {
        console.log('New client connected');

        ws.on('message', async (message) => {
            try {
                const parsedMessage: WebSocketMessage = JSON.parse(message.toString());

                // اگر پیام از نوع 'identify' بود، شناسه را ذخیره کن
                if (parsedMessage.type === 'identify') {
                    const userId = parsedMessage.data.userId;
                    if (userId) {
                        clients.set(ws, userId); // ذخیره کلاینت با شناسه
                        console.log(`User identified: ${userId}`);
                        console.log(clients)
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

        // وقتی کلاینت قطع می‌شه
        ws.on('close', () => {
            const userId = clients.get(ws); // شناسه کلاینت
            if (userId) {
                console.log(`Client disconnected: ${userId}`);
            } else {
                console.log('An unidentified client disconnected');
            }
            clients.delete(ws); // حذف کلاینت از Map
        });
    });
}

// ارسال پیام به همه کلاینت‌ها
export function broadcastMessage(message: WebSocketMessage): void {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}
