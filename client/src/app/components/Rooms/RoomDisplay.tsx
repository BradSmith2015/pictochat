import { MouseEventHandler } from "react"
import "./RoomDisplay.scss"

interface Props {
    room: String,
    numOfPeopleInRoom: number,
    handleClick: MouseEventHandler<HTMLDivElement> | undefined
}


export const RoomDisplay: React.FC<Props> = ({ room, numOfPeopleInRoom, handleClick }) => (
    <div className="room-display-container"
        onClick={handleClick}
    >
        <div className="chat-room-image">

        </div>
        <div className="chat-room-name">
            <span>Chat Room {room}</span>
        </div>
        <div className="room-count">
            {numOfPeopleInRoom} / 16
        </div>
    </div>
)