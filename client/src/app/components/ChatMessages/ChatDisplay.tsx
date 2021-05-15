import { ChatBoarder } from "./ChatBoarder";
import { NowEntering } from "./NowEntering";
import { ChatMessage, UserConnected, isChatMessage, ChatDrawing, isChatDrawing } from "./types";
import "./ChatDisplay.scss";
import { ChatDrawingDisplay } from "./ChatDrawingDisplay";

interface Props {
    chatStream: [ChatMessage | UserConnected | ChatDrawing];
    room: string;
}

export const ChatDisplay: React.FC<Props> = ({ chatStream, room }) => {
    return (
        <div className="chatDisplay">
            {chatStream.map((chat, idx) => {
                if (isChatDrawing(chat)) {
                    return (
                        <ChatBoarder
                            key={idx} borderColor="#432"
                            height="200px"
                            width="300px"
                        >
                            <ChatDrawingDisplay
                                drawing={chat.drawing}
                                text={chat.message}
                            ></ChatDrawingDisplay>
                        </ChatBoarder>
                    );
                }
                else if (isChatMessage(chat)) {
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