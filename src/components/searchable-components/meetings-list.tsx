import { Meeting } from '@/services/leads-service';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import MeetingDetails from './meeting-details';
import MeetingScheduler from './meeting-scheduler';

interface MeetingsListProps {
  meetings: Meeting[];
  onSelectMeeting: (meeting: Meeting) => void;
}

export default function MeetingsList({ meetings, onSelectMeeting }: MeetingsListProps) {
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [showMeetingScheduler, setShowMeetingScheduler] = useState(false);

  const handleMeetingClick = (meeting: Meeting) => {
    if (onSelectMeeting) {
      onSelectMeeting(meeting);
    } else {
      setSelectedMeeting(meeting);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg p-4 min-w-[400px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Meetings</h2>
        <button
          onClick={() => setShowMeetingScheduler(true)}
          className="p-2 text-black rounded-full hover:bg-gray-200 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
      {showMeetingScheduler && (
        <div className="mb-4">
          <MeetingScheduler onClose={() => setShowMeetingScheduler(false)} />
        </div>
      )}
      {selectedMeeting ? (
        <MeetingDetails meeting={selectedMeeting} onClose={() => setSelectedMeeting(null)} />
      ) : (
        meetings.map((meeting, index) => (
          <div
            key={meeting.id}
            className={`bg-white p-4 flex items-center ${
              index !== meetings.length - 1 ? 'border-b border-gray-200' : ''
            } hover:bg-gray-100 transition-colors cursor-pointer`}
            onClick={() => handleMeetingClick(meeting)}
          >
            <div className="flex-1 min-w-0 mr-4">
              <h3 className="text-sm font-semibold truncate" title={meeting.description}>
                {meeting.description}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {meeting.date} at {meeting.time}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
