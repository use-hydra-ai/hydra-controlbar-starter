'use client';
import { useLeadStore } from '@/store/lead-store';
import { Briefcase, Calendar, Mail, Settings, Users } from 'lucide-react';
import { useEffect } from 'react';
import EmailComposer from './searchable-components/email-composer';
import LeadList from './searchable-components/lead-list';
import LeadNotes from './searchable-components/lead-notes';
import MeetingScheduler from './searchable-components/meeting-scheduler';

export default function CRMDashboard() {
    const { leads, fetchLeads } = useLeadStore();
    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);
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
          <h2 className="text-xl font-semibold my-6 ml-6">Example CRM App</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <LeadList leads={leads} />
            </div>


            <div>
              {leads.length > 0 && (
                <LeadNotes
                  lead={leads[0]}
                />
              )}
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
