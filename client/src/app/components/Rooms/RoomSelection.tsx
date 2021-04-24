import { RoomDisplay } from "./RoomDisplay";

interface Props {
    onRoomSelection: (room: string) => void
}


export const RoomSelection: React.FC<Props> = ({ onRoomSelection }) => {
    const rooms = ["A", "B", "C", "D"]

    const getNumberOfPeopleInRoom = (room: String) => {
        return Math.round(Math.random() * 16);
    }


    return (
        <div>
            <div>Choose a Chat Room to join</div>
            {
                rooms.map((room) => {
                    const numOfPeopleInRoom = getNumberOfPeopleInRoom(room);
                    return (
                        <RoomDisplay
                            key={room}
                            room={room}
                            numOfPeopleInRoom={numOfPeopleInRoom}
                            handleClick={() => onRoomSelection(room)}
                        ></RoomDisplay>
                    )
                })
            }
        </div>
    )
}