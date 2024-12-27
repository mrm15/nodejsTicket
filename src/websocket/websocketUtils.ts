import WebSocket from 'ws';

// بررسی اتصال کلاینت
export function isClientConnected(client: WebSocket): boolean {
    return client.readyState === WebSocket.OPEN;
}
