import "./ChatBoarder.scss"

interface Props {
    borderColor: string
}

export const ChatBoarder: React.FC<Props> = ({ borderColor, children }) => {
    const style: React.CSSProperties = {
        borderColor
    }
    return (
        <div className="chat-boarder-container"
            style={style}
        >
            {children}
        </div>
    )
}