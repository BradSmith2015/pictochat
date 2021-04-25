

export interface ChatMessage {
    username: string,
    message: string
}

export interface ChatDrawing {
    username: string,
    drawing : string
}


export interface UserConnected {
    username: string
}


export function isChatMessage(chat: ChatMessage | UserConnected): chat is ChatMessage {
    return (chat as ChatMessage).message !== undefined;
}


export function isChatDrawing(chat: ChatMessage | UserConnected | ChatDrawing): chat is ChatDrawing {
    return (chat as ChatDrawing).drawing !== undefined;
}