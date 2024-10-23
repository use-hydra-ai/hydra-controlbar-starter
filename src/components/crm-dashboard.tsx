'use client';
import EmailComposer from './searchable-components/email-composer';
import LeadList from './searchable-components/lead-list';
import LeadNotes from './searchable-components/lead-notes';
import MeetingScheduler from './searchable-components/meeting-scheduler';

export default function CRMDashboard() {
  return (
    <div className="w-full max-w-7xl mx-auto bg-[#F0F0F0] p-4 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold my-6 ml-6">Example CRM Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <LeadList />
        </div>


        <div>
          <LeadNotes
            lead={{
              id: 1,
              name: "John Doe",
              email: "john@example.com",
              company: "Acme Inc.",
              phone: "123-456-7890",
              status: "New",
              notes: [
                { id: 1, content: "Initial contact made", timestamp: "2024-06-15T10:00:00" },
                { id: 2, content: "Scheduled follow-up call", timestamp: "2024-06-16T14:30:00" },
              ],
              meetings: [],
            }}
          />
        </div>
        <div>
          <MeetingScheduler />
        </div>
        <div>
          <EmailComposer
            email="john@example.com"
            initialSubject="Follow-up"
            initialMessage="Dear John,"
          />
        </div>
      </div>
    </div>
  );
}
