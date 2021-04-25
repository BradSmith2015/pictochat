import React, { useRef, useState } from "react"

interface Props {
    handleSendCanvas: (dataUrl: any) => void;
}




export const DrawingCanvas: React.FC<Props> = ({ handleSendCanvas }) => {
    const style: React.CSSProperties = {
        border: "#000 1px solid"
    }

    const [currentCords, setCurrentCords] = useState({ x: 0, y: 0 });
    const [isDrawing, setIsDrawing] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);


    const onMouseUp = () => {
        setIsDrawing(false);
    }

    const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(true);
        const x = e.clientX;
        const y = e.clientY;
        setCurrentCords({ x, y });
    }

    const drawLine = (x0: number, y0: number, x1: number, y1: number) => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const offsetLeft = canvas.offsetLeft;
            const offSetTop = canvas.offsetTop;
            const ctx = canvas.getContext('2d')
            if (ctx) {
                ctx.beginPath();
                ctx.moveTo(x0 - offsetLeft, y0 - offSetTop);
                ctx.lineTo(x1 - offsetLeft, y1 - offSetTop);
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
            const x = e.clientX,
                y = e.clientY;
            drawLine(currentCords.x, currentCords.y, x, y);
            setCurrentCords({ x, y });
        } else return;
    }

    return (
        <div>
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
            <button
                onClick={(e) => {
                    e.preventDefault();
                    const dataUrl = canvasRef.current?.toDataURL("image/png");
                    handleSendCanvas(dataUrl);
                    canvasRef.current?.getContext("2d")?.clearRect(0, 0, 300, 200);
                }}
            >Send</button>
        </div>

    )
}