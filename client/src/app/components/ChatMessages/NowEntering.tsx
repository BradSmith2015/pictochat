import { ChatBoarder } from "./ChatBoarder"

interface Props {
    username: string
    chatRoomId: string
}


export const NowEntering: React.FC<Props> = ({ username, chatRoomId }) => {
    return (
        <ChatBoarder borderColor="#000">
            <div style={{ "background": "#000", "color": "#FFF" }}>
                <span style={{ "color": "#D7D723" }}>Now Entering 🄰</span>: {username}
            </div>
        </ChatBoarder>
    )
}