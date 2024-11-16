import { Message, MessageFilters } from '@/services/leads-service';
import { useMessageStore } from '@/store/message-store';
import { useEffect } from 'react';
import MessagesList from './messages-list';

interface MessagesListContainerProps {
  filters?: MessageFilters;
  onSelectMessage?: (message: Message) => void;
}

export default function MessagesListContainer({ filters, onSelectMessage }: MessagesListContainerProps) {
  const { messages, fetchMessages } = useMessageStore();
  
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const filteredMessages = messages.filter(message => {
    if (!filters) return true;

    if (filters.email && !message.email.toLowerCase().includes(filters.email.toLowerCase())) {
      return false;
    }

    if (filters.search && !(
      message.subject.toLowerCase().includes(filters.search.toLowerCase()) ||
      message.content.toLowerCase().includes(filters.search.toLowerCase())
    )) {
      return false;
    }

    if (filters.dateFrom || filters.dateTo) {
      const messageDate = new Date(message.timestamp);
      if (filters.dateFrom && messageDate < new Date(filters.dateFrom)) return false;
      if (filters.dateTo && messageDate > new Date(filters.dateTo)) return false;
    }

    return true;
  });

  return (
    <MessagesList 
      messages={filteredMessages} 
      onSelectMessage={onSelectMessage}
    />
  );
}
