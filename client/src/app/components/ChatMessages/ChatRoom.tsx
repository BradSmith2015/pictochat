import { useState } from "react";
import { Socket } from "socket.io-client";
import { ChatDisplay } from "./ChatDisplay";
import { ChatInput } from "./ChatInput";
import { ChatMessage, UserConnected } from "./types";

interface Props {
    socket: Socket,
    username: string,
    room: string
}


export const ChatRoom: React.FC<Props> = ({ socket, username, room }) => {
    socket.on("chatStream", (message: ChatMessage) => {
        const newChatMessages = [...chatStream, message];
        setChatStream(newChatMessages);
    });

    const [chatStream, setChatStream] = useState([] as any);

    const handleSendDrawingAndText = (dataUrl: any, message: string) => {
        socket.emit("drawingAndText", dataUrl, message, room)
        setChatStream([...chatStream, { drawing: dataUrl, message, username }])
    }

    const handleSendText = (message: string) => {
        socket.emit("message", message, room);
        setChatStream([...chatStream, { message, username }])

    }
    return (
        <div>
            <ChatDisplay chatStream={chatStream} room={"A"}></ChatDisplay>
            <ChatInput handleSendDrawingAndText={handleSendDrawingAndText} handleSendMessageText={handleSendText}>
            </ChatInput>
        </div>)
}