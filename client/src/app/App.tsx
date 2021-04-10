import { io } from "socket.io-client";
import { InputField } from "./components/InputField";
import { ChatDisplay } from "./components/ChatMessages/ChatDisplay";
import "./App.css";
import { useState } from "react";
import { UserConnected, ChatMessage } from "./components/ChatMessages/types";

const socket = io("http://localhost:8000", { autoConnect: false });

const App: React.FC = () => {
    const [username, setUsername] = useState("");
    const [usernameCreated, setUsernameCreated] = useState(false);
    //   const [isConnected, setIsConnected] = useState(socket.connected);
    const [message, setMessage] = useState("");
    const [chatStream, setChatStream] = useState([] as any);

    socket.on("chatStream", (message: ChatMessage) => {
        const newChatMessages = [...chatStream, message];
        setChatStream(newChatMessages);
    });

    const onUsernameSelected = () => {
        setUsernameCreated(true);
        socket.auth = { username }
        socket.connect();
    }

    const chat = (
        <div>
            <ChatDisplay chatStream={chatStream} room={"A"}></ChatDisplay>
            <InputField
                value={message}
                handleChange={(e) => {
                    setMessage(e.target.value);
                }}
            ></InputField>
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
        </div>
    );
    const userNameCreator = (
        <div>
            <InputField
                value={username}
                handleChange={(e) => {
                    setUsername(e.target.value);
                }}
            ></InputField>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    onUsernameSelected();
                }}
            >
                Set Username
      </button>
        </div>
    );
    const display = usernameCreated ? chat : userNameCreator;
    return <div className="App">{display}</div>;
};

export default App;
