import { Message } from '@/services/leads-service';
import { PlusIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import { useState } from 'react';
import AddMessageForm from './add-message-form';

interface MessagesListProps {
  messages: Message[];
  onSelectMessage: (message: Message) => void;
}

export default function MessagesList({ messages, onSelectMessage }: MessagesListProps) {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="flex flex-col bg-white rounded-lg p-4 min-w-[400px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Messages</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="p-2 text-black rounded-full hover:bg-gray-200 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
      
      {showAddForm && (
        <div className="mb-4">
          <AddMessageForm onClose={() => setShowAddForm(false)} />
        </div>
      )}

      <div className="space-y-2">
        {messages.map((message) => (
          <div
            key={message.id}
            onClick={() => onSelectMessage(message)}
            className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-sm">{message.subject}</h3>

            </div>
            <p className="text-sm text-gray-600 truncate mb-1">{message.email}</p>
            <p className="text-xs text-gray-400">
              {DateTime.fromISO(message.timestamp).toFormat('ccc, MMM d h:mma')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 