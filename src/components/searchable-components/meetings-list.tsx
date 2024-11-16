import { Meeting } from '@/services/leads-service';
import { PlusIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import { useState } from 'react';
import AddMeetingForm from './add-meeting-form';

interface MeetingsListProps {
  meetings: Meeting[];
  onSelectMeeting?: (meeting: Meeting) => void;
  isLoading?: boolean;
}

export default function MeetingsList({ meetings = [], onSelectMeeting, isLoading = false }: MeetingsListProps) {
  const [showAddForm, setShowAddForm] = useState(false);

  const LoadingSkeleton = () => (
    <>
      {[1, 2, 3].map((index) => (
        <div 
          key={index}
          className="bg-white p-4 flex items-center border-b border-gray-200"
        >
          <div className="flex-1 min-w-0 mr-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="flex flex-col bg-white rounded-lg p-4 min-w-[400px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Meetings</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="p-2 text-black rounded-full hover:bg-gray-200 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
      
      {showAddForm && (
        <div className="mb-4">
          <AddMeetingForm onClose={() => setShowAddForm(false)} />
        </div>
      )}

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        meetings.map((meeting, index) => (
          <div
            key={`${meeting.id}-${meeting.leadId}`}
            className={`bg-white p-4 flex items-center ${
              index !== meetings.length - 1 ? 'border-b border-gray-200' : ''
            } hover:bg-gray-100 transition-colors cursor-pointer`}
            onClick={() => onSelectMeeting?.(meeting)}
          >
            <div className="flex-1 min-w-0 mr-4">
              <h3 className="text-sm font-semibold truncate" title={meeting.description}>
                {meeting.description}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {DateTime.fromISO(meeting.date).toFormat('EEE, MMM dd h:mm a')}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export function MeetingsListSkeleton() {
  return <MeetingsList meetings={[]} isLoading={true} />;
}
