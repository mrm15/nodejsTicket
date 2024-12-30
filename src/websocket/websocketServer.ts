// src/websocket/websocketServer.ts
import {Server} from 'socket.io';
import {Server as HttpServer} from 'http';
import {handleConnection} from "./handleConnection/handleConnection";
import {identifyHandler} from "./identifyHandler/identifyHandler";
import {handleDisconnect} from "./handleDisconnect/handleDisconnect";

export const initializeSocketIO = (httpServer: HttpServer) => {
    // Initialize Socket.IO
    const io = new Server(httpServer, {
        cors: {
            origin: '*', // Adjust this based on your client-side domain
            methods: ['GET', 'POST'],
        },
    });

    // Handle WebSocket connections
    io.on('connection', async (socket) => {
        console.log('A user connected');

        // Listen for the 'identify' event
        // Listen for the 'identify' event
        socket.on('identify', (data) => {
            identifyHandler({socket, data}); // Call the separate handler
        });

        // Example event: sending a message to the server
        socket.on('message', (data) => {
            console.log('Received message:', data);
            // You can emit a response if needed
            socket.emit('response', {message: 'Message received!'});
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            handleDisconnect({socket, data:socket.data})
        });
    });

    return io;
};
