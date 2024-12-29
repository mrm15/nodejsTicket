// src/websocket/websocketServer.ts
import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

export const initializeSocketIO = (httpServer: HttpServer) => {
    // Initialize Socket.IO
    const io = new Server(httpServer, {
        cors: {
            origin: '*', // Adjust this based on your client-side domain
            methods: ['GET', 'POST'],
        },
    });

    // Handle WebSocket connections
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Example event: sending a message to the server
        socket.on('message', (data) => {
            console.log('Received message:', data);
            // You can emit a response if needed
            socket.emit('response', { message: 'Message received!' });
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    return io;
};
