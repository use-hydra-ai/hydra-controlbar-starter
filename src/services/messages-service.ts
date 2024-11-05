import { MessageSchema } from "@/schemas/lead";
import { z } from "zod";

export type Message = z.infer<typeof MessageSchema>;

let messages: Message[] = [
    {
        id: 1,
        email: "john@example.com",
        subject: "Follow-up on our conversation",
        content: "Thank you for your time yesterday...",
        timestamp: "2024-06-15T10:00:00",
    },
    {
        id: 2,
        email: "jane@techcorp.com",
        subject: "Product Demo Follow-up",
        content: "Great meeting you today. As discussed...",
        timestamp: "2024-06-16T14:30:00",
    },
    {
        id: 3,
        email: "alice@globalfirm.com",
        subject: "Proposal Review",
        content: "I've reviewed the proposal and have some feedback...",
        timestamp: "2024-06-17T09:45:00",
    }
];

export async function getMessages(): Promise<Message[]> {
    return messages;
}

export async function getMessage(id: number): Promise<Message | undefined> {
    return messages.find(message => message.id === id);
}

export async function addMessage(message: Omit<Message, 'id'>): Promise<Message> {
    const newMessage: Message = {
        ...message,
        id: messages.length + 1,
    };
    messages.push(newMessage);
    return newMessage;
}

export async function updateMessage(id: number, message: Omit<Message, 'id'>): Promise<Message | undefined> {
    const messageIndex = messages.findIndex(m => m.id === id);
    if (messageIndex !== -1) {
        messages[messageIndex] = { ...messages[messageIndex], ...message };
        return messages[messageIndex];
    }
    return undefined;
} 