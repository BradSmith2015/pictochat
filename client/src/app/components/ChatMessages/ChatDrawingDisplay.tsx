
import "./ChatDrawingDisplay.scss";

interface Props {
    text: string
    drawing: string;
}

export const ChatDrawingDisplay: React.FC<Props> = ({ drawing, text }) => {
    return (
        <div className="chat-drawing-container">
            <div className="chat-drawing-image-container">
                <img alt="user drawing" src={drawing}></img>
            </div>
            <div className="chat-drawing-text-container">
                {text}
            </div>
        </div>

    );
};