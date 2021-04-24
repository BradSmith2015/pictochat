import { useState } from "react";
import { Socket } from "socket.io-client";
import { ChatDisplay } from "./ChatDisplay";
import { ChatInput } from "./ChatInput";
import { ChatMessage, UserConnected } from "./types";

interface Props {
    socket: Socket,
    username: string
}


export const ChatRoom: React.FC<Props> = ({ socket, username }) => {
    socket.on("chatStream", (message: ChatMessage) => {
        const newChatMessages = [...chatStream, message];
        setChatStream(newChatMessages);
    });

    const [message, setMessage] = useState("");
    const [chatStream, setChatStream] = useState([] as any);


    return (
        <div>
            <ChatDisplay chatStream={chatStream} room={"A"}></ChatDisplay>
            <ChatInput
                value={message}
                handleChange={(e) => {
                    setMessage(e.target.value);
                }}
            ></ChatInput>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    socket.emit("message", message);
                    setChatStream([...chatStream, { username, message }]);
                    setMessage("");
                }}
            >
                Send
      </button>
        </div>)
}