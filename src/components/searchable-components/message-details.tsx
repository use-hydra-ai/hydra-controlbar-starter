import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Message } from '@/services/leads-service';
import { XIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import { Button } from '../ui/button';

interface MessageDetailsProps {
  message: Message;
  onClose?: () => void;
}

export default function MessageDetails({ message, onClose }: MessageDetailsProps) {
  const formattedDate = DateTime.fromISO(message.timestamp).toFormat('EEE, MMM dd h:mm a');

  return (
    <Card className="w-full min-w-[400px] max-w-[800px]">
      {onClose && (
        <Button onClick={onClose} variant="ghost" className="absolute top-2 right-2">
          <XIcon className="w-4 h-4" />
        </Button>
      )}
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-semibold">{message.subject}</CardTitle>
          <p className="text-sm text-gray-500 mt-1">To: {message.email}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <>
          <div>
            <h3 className="font-semibold">Date</h3>
              <p>{formattedDate}</p>
            </div>
            <div>
              <h3 className="font-semibold">Content</h3>
              <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        </>
      </CardContent>
    </Card>
  );
} 