import { create } from 'zustand';
import { Message, addMessage, getMessages, updateMessage } from '../services/messages-service';

interface MessageStore {
    messages: Message[];
    fetchMessages: () => Promise<void>;
    addNewMessage: (message: Omit<Message, 'id'>) => Promise<void>;
    updateMessage: (id: number, message: Omit<Message, 'id'>) => Promise<void>;
}

export const useMessageStore = create<MessageStore>((set) => ({
    messages: [],
    fetchMessages: async () => {
        const messages = await getMessages();
        set({ messages });
    },
    addNewMessage: async (message) => {
        const newMessage = await addMessage(message);
        set((state) => ({
            messages: [...state.messages, newMessage]
        }));
    },
    updateMessage: async (id, message) => {
        const updatedMessage = await updateMessage(id, message);
        if (updatedMessage) {
            set((state) => ({
                messages: state.messages.map((m) =>
                    m.id === id ? updatedMessage : m
                )
            }));
        }
    }
})); 