import { Message } from '@/services/leads-service';
import { useMessageStore } from '@/store/message-store';
import { useEffect, useState } from 'react';
import MessageDetails from '../searchable-components/message-details';
import MessagesList from '../searchable-components/messages-list';

export default function MessagesTab() {
  const { messages, fetchMessages } = useMessageStore();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <div className="flex gap-4">
      <MessagesList messages={messages} onSelectMessage={setSelectedMessage} />
      {selectedMessage && (
        <MessageDetails 
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)} 
        />
      )}
    </div>
  );
} 