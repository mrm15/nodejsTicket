import { Socket, DefaultEventsMap } from "socket.io";
import sleep from "../../utils/sleep";

export const handleConnection = async (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {

    // const token = socket.handshake.auth.token;

    await sleep(3000)
    socket.emit('response', { message:"123" });
    debugger

    return

}