'use client';
import { Briefcase, Calendar, Mail, Settings, Users } from 'lucide-react';
import EmailComposer from './searchable-components/email-composer';
import LeadList from './searchable-components/lead-list';
import LeadNotes from './searchable-components/lead-notes';
import MeetingScheduler from './searchable-components/meeting-scheduler';

export default function CRMDashboard() {
  return (
    <div className="flex rounded-xl overflow-hidden h-[calc(100vh-20rem)]">
      <div className="w-16 bg-gray-800 flex flex-col items-center py-4 space-y-8">
        <Users className="text-gray-300 hover:text-white cursor-pointer" size={24} />
        <Briefcase className="text-gray-300 hover:text-white cursor-pointer" size={24} />
        <Calendar className="text-gray-300 hover:text-white cursor-pointer" size={24} />
        <Mail className="text-gray-300 hover:text-white cursor-pointer" size={24} />
        <Settings className="text-gray-300 hover:text-white cursor-pointer mt-auto" size={24} />
      </div>

      <div className="flex-1 overflow-auto">
        <div className="w-full max-w-7xl mx-auto bg-[#F0F0F0] p-4 min-h-full">
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
      </div>
    </div>
  );
}
