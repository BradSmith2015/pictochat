import { io } from "socket.io-client";
import { InputField } from "./app/components/InputField";
import './App.css';
import { useState } from "react";
const socket = io("http://localhost:8000");

const App: React.FC = () => {

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [message, setMessage] = useState("")
    const [chatMessages, setChatMessages] = useState([""]);

    socket.on("chatMessage", (message) => {
        const newChatMessages = [...chatMessages, message]
        setChatMessages(newChatMessages)
    })




    return (
        <div className="App">
            <ul>
                {chatMessages.reverse().map((chatMessage, idx) => (
                    <li key={idx}> {chatMessage}</li>
                ))}
            </ul>

            <InputField
                value={message}
                handleChange={(e) => {
                    setMessage(e.target.value)
                }}></InputField>
            <button onClick={(e) => {
                e.preventDefault();
                socket.emit("message", message)
                setChatMessages([...chatMessages, message])
                setMessage("");
            }}>Send</button>
        </div>
    );
}

export default App;
