import { create } from 'zustand';
import { Message } from '../services/leads-service';

interface MessageStore {
    messages: Message[];
    fetchMessages: () => Promise<void>;
    addNewMessage: (message: Omit<Message, 'id'>) => Promise<void>;
    updateMessage: (id: number, message: Omit<Message, 'id'>) => Promise<void>;
}

export const useMessageStore = create<MessageStore>((set) => ({
    messages: [],
    fetchMessages: async () => {
        const messages: Message[] = [
            {
                id: 1,
                email: "john@example.com",
                subject: "Follow-up on our conversation",
                content: "Thank you for your time yesterday...",
                timestamp: new Date().toISOString(),
                status: "sent"
            },
        ];
        set({ messages });
    },
    addNewMessage: async (message) => {
        const newMessage = {
            ...message,
            id: Date.now(),
            timestamp: new Date().toISOString()
        };
        set((state) => ({
            messages: [...state.messages, newMessage]
        }));
    },
    updateMessage: async (id, message) => {
        set((state) => ({
            messages: state.messages.map((m) =>
                m.id === id ? { ...m, ...message } : m
            )
        }));
    }
})); 