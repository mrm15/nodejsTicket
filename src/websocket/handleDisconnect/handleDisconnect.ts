import { Socket } from 'socket.io';
import { changeUserStatus } from '../../utils/ChangeUserSatus/ChangeUserStatus';

interface IdentifyData {
    userId: string; // Define the structure of the 'data' object
}

interface IdentifyHandlerParams {
    socket: Socket; // Type from socket.io
    data: IdentifyData; // Use the interface for the 'data' parameter
}

export const handleDisconnect = async ({ socket, data }: IdentifyHandlerParams): Promise<void> => {
    console.log("==============================")
    console.log(socket.data)
    console.log("==============================")
    try {
        const { userId } = data;
        // Call the changeUserStatus utility function
        await changeUserStatus({ userId, userStatus: 'offline' });
        // Attach userId to socket for further use
        // socket.data.userId = userId;
        // Emit success response
        // socket.emit('ack', { success: true }); // Minimal acknowledgment
    } catch (error: any) {
        // Emit error response with details
        socket.emit('error', { message: `${error?.toString()} - An error occurred while identifying the user` });
    }
};
