import { ChatBoarder } from "./ChatBoarder";
import { NowEntering } from "./NowEntering";
import { ChatMessage, UserConnected, isChatMessage } from "./types";
import "./ChatDisplay.scss";

interface Props {
    chatStream: [ChatMessage | UserConnected];
    room: string;
}

export const ChatDisplay: React.FC<Props> = ({ chatStream, room }) => {
    return (
        <div className="chatDisplay">
            {chatStream.map((chat, idx) => {
                if (isChatMessage(chat)) {
                    return <ChatBoarder key={idx} borderColor="#432">{chat.username}: {chat.message}</ChatBoarder>;
                } else {
                    return (
                        <NowEntering
                            key={idx}
                            chatRoomId={room}
                            username={chat.username}
                        ></NowEntering>
                    );
                }
            })}
        </div>
    );
};
