export interface ChatMessage {
    id: number;
    sender: 'user' | 'ai';
    message: string;
    timestamp: Date;
}