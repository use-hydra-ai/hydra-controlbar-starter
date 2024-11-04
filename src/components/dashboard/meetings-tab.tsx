import { Meeting } from '@/services/leads-service';
import { useLeadStore } from '@/store/lead-store';
import { useEffect, useState } from 'react';
import MeetingDetails from '../searchable-components/meeting-details';
import MeetingsList from '../searchable-components/meetings-list';

export default function MeetingsTab() {
  const { leads } = useLeadStore();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  useEffect(() => {
    const allMeetings = leads.flatMap(lead => lead.meetings);
    setMeetings(allMeetings);
    if (allMeetings.length > 0) {
      setSelectedMeeting(allMeetings[0]);
    }
  }, [leads]);

  return (
    <div className="flex gap-4">
      <MeetingsList meetings={meetings} onSelectMeeting={setSelectedMeeting} />
      {selectedMeeting && (
        <MeetingDetails meeting={selectedMeeting} leadId={selectedMeeting.leadId} onClose={() => setSelectedMeeting(null)} />
      )}
    </div>
  );
} 