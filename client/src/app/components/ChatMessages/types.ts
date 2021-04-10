

export interface ChatMessage {
    username: string,
    message: string
}

export interface UserConnected {
    username: string
}


export function isChatMessage(chat: ChatMessage | UserConnected): chat is ChatMessage {
    return (chat as ChatMessage).message !== undefined;
}