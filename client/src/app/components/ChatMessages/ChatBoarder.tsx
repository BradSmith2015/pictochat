import "./ChatBoarder.scss"

interface Props {
    borderColor: string,
    height?: string,
    width?: string
}

export const ChatBoarder: React.FC<Props> = ({ borderColor, height, width, children }) => {
    const style: React.CSSProperties = {
        borderColor,
        height,
        width
    }
    return (
        <div className="chat-boarder-container"
            style={style}
        >
            {children}
        </div>
    )
}