import { useState } from "react";
import { Socket } from "socket.io-client";
import { DrawingCanvas } from "../Drawing/DrawingCanvas";
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

    const [message, setMessage] = useState("");
    const [chatStream, setChatStream] = useState([] as any);

    const handleSendCanvas = (dataUrl: any) => {
        socket.emit("drawing", dataUrl, room)
    }



    return (
        <div>
            <ChatDisplay chatStream={chatStream} room={"A"}></ChatDisplay>
            <DrawingCanvas handleSendCanvas={handleSendCanvas}>
            </DrawingCanvas>
            {/* <ChatInput
                value={message}
                handleChange={(e) => {
                    setMessage(e.target.value);
                }}
            ></ChatInput>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    socket.emit("message", message, room);
                    setChatStream([...chatStream, { username, message }]);
                    setMessage("");
                }}
            >
                Send
      </button> */}
        </div>)
}