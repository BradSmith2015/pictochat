import React, { useRef, useState } from "react"
import "./ChatInput.scss"
interface Props {
    handleSendDrawingAndText: (dataUrl: any, message: string) => void;
    handleSendMessageText: (message: string) => void;
}




export const ChatInput: React.FC<Props> = ({ handleSendDrawingAndText, handleSendMessageText }) => {
    const style: React.CSSProperties = {
        border: "#000 1px solid"
    }

    const [currentCords, setCurrentCords] = useState({ x: 0, y: 0 });
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasDrawn, setHasDrawn] = useState(false);
    const [message, setMessage] = useState("");
    // const [isTyping, setIsTyping] = useState(false);


    const canvasRef = useRef<HTMLCanvasElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);



    const onMouseUp = () => {
        setIsDrawing(false);
        inputRef.current?.focus();

    }

    const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!hasDrawn) setHasDrawn(true);
        setIsDrawing(true);
        console.log(e);
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        setCurrentCords({ x, y });
    }

    const drawLine = (x0: number, y0: number, x1: number, y1: number) => {
        if (canvasRef.current) {
            console.log(canvasRef)
            const canvas = canvasRef.current;
            const offsetLeft = canvas.offsetLeft;
            const offSetTop = canvas.offsetTop;
            const ctx = canvas.getContext('2d')
            if (ctx) {
                console.log(ctx)
                ctx.beginPath();
                console.log(offsetLeft)
                ctx.moveTo(x0, y0);
                ctx.lineTo(x1, y1);
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.closePath();
            }
        }


        return;
    }

    const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (isDrawing) {
            const x = e.nativeEvent.offsetX,
                y = e.nativeEvent.offsetY;
            drawLine(currentCords.x, currentCords.y, x, y);
            setCurrentCords({ x, y });
        } else return;
    }

    const handleOnTextChange = (e: any) => {
        setMessage(e.target.value);
    }


    const handleOnSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (hasDrawn) {
            const dataUrl = canvasRef.current?.toDataURL("image/png");
            handleSendDrawingAndText(dataUrl, message);
            canvasRef.current?.getContext("2d")?.clearRect(0, 0, 300, 200);
            setHasDrawn(false);
        } else {
            handleSendMessageText(message);
        }
        setMessage("");

    }

    return (
        <div >
            <div className="chat-input-display-container">
                <div className="chat-input-canvas"
                >
                    <canvas
                        width={300}
                        height={200}
                        style={style}
                        ref={canvasRef}
                        onMouseDown={(e) => onMouseDown(e)}
                        onMouseMove={(e) => onMouseMove(e)}
                        onMouseUp={() => onMouseUp()}

                    >
                    </canvas>
                </div>
                <div className="chat-input-text">
                    <textarea className="chat-input-textarea" ref={inputRef} value={message} onChange={handleOnTextChange} />
                </div>
            </div>
            <button
                onClick={(e) => {
                    handleOnSend(e)
                }}
            >Send</button>
        </div>

    )
}