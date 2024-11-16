import { Meeting, MeetingFilters } from '@/services/leads-service';
import { useLeadStore } from '@/store/lead-store';
import { useEffect } from 'react';
import MeetingsList from './meetings-list';

interface MeetingsListContainerProps {
  filters?: MeetingFilters;
  onSelectMeeting?: (meeting: Meeting) => void;
}

export default function MeetingsListContainer({ filters, onSelectMeeting }: MeetingsListContainerProps) {
  const { leads, fetchLeads } = useLeadStore();
  
  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const filteredMeetings = leads.flatMap(lead => lead.meetings).filter(meeting => {
    if (!filters) return true;

    if (filters.leadId && meeting.leadId !== filters.leadId) {
      return false;
    }

    if (filters.dateFrom || filters.dateTo) {
      const meetingDate = new Date(meeting.date);
      if (filters.dateFrom && meetingDate < new Date(filters.dateFrom)) return false;
      if (filters.dateTo && meetingDate > new Date(filters.dateTo)) return false;
    }

    if (filters.search && !meeting.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    return true;
  });

  return (
    <MeetingsList 
      meetings={filteredMeetings} 
      onSelectMeeting={onSelectMeeting}
    />
  );
} 