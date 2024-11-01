import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Meeting } from '@/services/leads-service';
import { useState } from 'react';

interface MeetingDetailsProps {
  meeting: Meeting;
  onClose: () => void;
}

export default function MeetingDetails({ meeting, onClose }: MeetingDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card className="w-full min-w-[400px] max-w-[800px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-semibold">{meeting.description}</CardTitle>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {isEditing ? (
          <div>Edit form goes here</div>
        ) : (
          <>
            <div>
              <h3 className="font-semibold">Date</h3>
              <p>{meeting.date}</p>
            </div>
            <div>
              <h3 className="font-semibold">Time</h3>
              <p>{meeting.time}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
} 