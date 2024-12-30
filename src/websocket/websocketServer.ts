import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { identifyHandler } from './identifyHandler/identifyHandler';
import { handleDisconnect } from './handleDisconnect/handleDisconnect';

/**
 * A map to track user connections.
 * Each userId is mapped to a set of their connected socket IDs.
 *
 * نقشه‌ای برای پیگیری اتصالات کاربران.
 * هر userId به مجموعه‌ای از شناسه‌های سوکت‌های متصل شده مرتبط است.
 */
export const userSocketMap = new Map<string, Set<string>>();

/**
 * A reverse map to track which userId is associated with a given socket ID.
 *
 * یک نقشه معکوس برای پیگیری اینکه هر شناسه سوکت به کدام userId متصل است.
 */
export const socketToUserMap = new Map<string, string>();

/**
 * Adds a socket ID to the userSocketMap and updates the socketToUserMap.
 *
 * یک شناسه سوکت را به userSocketMap اضافه کرده و socketToUserMap را به‌روزرسانی می‌کند.
 */
const addSocketForUser = (userId: string, socketId: string) => {
    if (!userSocketMap.has(userId)) {
        userSocketMap.set(userId, new Set<string>());
    }
    userSocketMap.get(userId)?.add(socketId);
    socketToUserMap.set(socketId, userId);
};

/**
 * Removes a socket ID from the userSocketMap and updates the socketToUserMap.
 *
 * یک شناسه سوکت را از userSocketMap حذف کرده و socketToUserMap را به‌روزرسانی می‌کند.
 */
const removeSocketForUser = (userId: string, socketId: string) => {
    const sockets = userSocketMap.get(userId);
    if (sockets) {
        sockets.delete(socketId);
        if (sockets.size === 0) {
            userSocketMap.delete(userId);
        }
    }
    socketToUserMap.delete(socketId);
};

// Declare a variable to store the io instance
let io: Server;

/**
 * Initializes the WebSocket server and handles connection logic.
 *
 * سرور وب‌سوکت را مقداردهی اولیه کرده و منطق اتصال را مدیریت می‌کند.
 */
export const initializeSocketIO = (httpServer: HttpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: '*', // مشخص کردن منبع (در حالت واقعی، بهتر است محدود شود)
            methods: ['GET', 'POST'], // روش‌های مجاز HTTP
        },
    });

    io.on('connection', (socket) => {
        console.log(`A user connected with socket ${socket.id}`);

        /**
         * Handles the 'identify' event where the client sends their userId.
         *
         * مدیریت رویداد 'identify' که در آن کاربر userId خود را ارسال می‌کند.
         */
        socket.on('identify', async (data) => {
            try {
                const userId = data.userId;
                addSocketForUser(userId, socket.id);
                await identifyHandler({ socket, userId });
            } catch (error) {
                console.error('Error in identifyHandler:', error);
                socket.emit('error', { message: 'An error occurred' });
            }
        });

        /**
         * Handles the 'disconnect' event when the user disconnects.
         *
         * مدیریت رویداد 'disconnect' زمانی که کاربر اتصال را قطع می‌کند.
         */
        socket.on('disconnect', async () => {
            const userId = socketToUserMap.get(socket.id);
            if (userId) {
                removeSocketForUser(userId, socket.id);
                console.log(`Socket ${socket.id} for user ${userId} disconnected`);
                await handleDisconnect({ socket, userId });
            }
        });
    });

    return io;
};

/**
 * Exports the io instance for use in other parts of the application.
 *
 * io را برای استفاده در سایر بخش‌های برنامه صادر می‌کند.
 */
export const getIoInstance = (): Server => {
    if (!io) {
        throw new Error('Socket.IO has not been initialized! Call initializeSocketIO first.');
    }
    return io;
};
