'use client';
import { useLeadStore } from '@/store/lead-store';
import { Briefcase, Calendar, Mail, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import AnalyticsDashboard from './searchable-components/analytics-dashboard';
import ContactList from './searchable-components/contact-list';
import EmailComposer from './searchable-components/email-composer';
import LeadList from './searchable-components/lead-list';
import LeadNotes from './searchable-components/lead-notes';
import MeetingScheduler from './searchable-components/meeting-scheduler';
import TaskManager from './searchable-components/task-manager';

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState('leads');
  const { leads, fetchLeads } = useLeadStore();
  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);


  const renderActiveTab = () => {
    switch (activeTab) {
      case 'leads':
        return (
          <>
            <LeadList leads={leads ?? []}/>
            {leads?.[0] && <LeadNotes lead={leads[0]} />}
            <MeetingScheduler />
            {leads?.[0] && <EmailComposer email={leads[0].email} initialSubject="Hello" initialMessage="Hello, how are you?" />}
          </>
        );
      case 'contacts':
        return <ContactList />;
      case 'tasks':
        return <TaskManager />;
      case 'analytics':
        return <AnalyticsDashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full max-w-7xl mx-auto rounded-xl overflow-hidden h-[calc(100vh-20rem)]">
      <div className="w-16 bg-gray-800 flex flex-col items-center py-4 space-y-8">
        <Users onClick={() => setActiveTab('leads')} className="text-gray-300 hover:text-white cursor-pointer" size={24} />
        <Briefcase onClick={() => setActiveTab('contacts')} className="text-gray-300 hover:text-white cursor-pointer" size={24} />
        <Calendar onClick={() => setActiveTab('tasks')} className="text-gray-300 hover:text-white cursor-pointer" size={24} />
        <Mail onClick={() => setActiveTab('analytics')} className="text-gray-300 hover:text-white cursor-pointer" size={24} />
      </div>

      <div className="flex-1 overflow-auto">
        <div className="w-full max-w-7xl mx-auto bg-[#F0F0F0] p-4 min-h-full">
          <h2 className="text-xl font-semibold my-6 ml-6">Example CRM App</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderActiveTab()}
          </div>
        </div>
      </div>
    </div>
  );
}
