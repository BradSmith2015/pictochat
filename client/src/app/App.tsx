import { io } from "socket.io-client";
import { InputField } from "./components/InputField";
import "./App.css";
import React, { useState } from "react";
import { ChatRoom } from "./components/ChatMessages/ChatRoom";
import { RoomSelection } from "./components/Rooms/RoomSelection";

const socket = io("http://localhost:8000", { autoConnect: false });

const App: React.FC = () => {
    const [username, setUsername] = useState("");
    const [usernameCreated, setUsernameCreated] = useState(false);
    const [isRoomSelected, setIsRoomSelected] = useState(false);
    const [room, setRoom] = useState("");

    const onUsernameSelected = () => {
        setUsernameCreated(true);
        socket.auth = { username }
        socket.connect();
    }

    const setUserRoom = (room: string) => {
        setRoom(room);
        setIsRoomSelected(true);
        socket.emit("roomConnection", room);
    }


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
    let display;
    if (!usernameCreated && !isRoomSelected) {
        display = userNameCreator
    }
    else if (usernameCreated && !isRoomSelected) {
        display = (<RoomSelection
            onRoomSelection={setUserRoom}
        ></RoomSelection>)
    } else {
        display = <ChatRoom socket={socket} username={username}></ChatRoom>
    }
    return <div className="App">{display}</div>;
};

export default App;
