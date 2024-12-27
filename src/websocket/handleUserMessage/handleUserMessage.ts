import {WebSocketMessage} from "../websocketServer";
import sleep from "../../utils/sleep";



export const handleUserMessage = async ({message , ws}:any) => {

    const parsedMessage: WebSocketMessage = JSON.parse(message.toString());
    console.log("Received message:", parsedMessage);
    await sleep(3000)

    // اینجا می‌تونی پیام‌ها رو مدیریت کنی
    if (parsedMessage.type === "ping") {
        ws.send(JSON.stringify({ type: "pong", data: "Hello from server!" }));
    }
    console.log(message)
}