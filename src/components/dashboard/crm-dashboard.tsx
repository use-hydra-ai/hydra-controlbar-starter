'use client';
import { Calendar, Mail, Users } from 'lucide-react';
import { useState } from 'react';
import LeadsTab from './leads-tab';
import MeetingsTab from './meetings-tab';
import MessagesTab from './messages-tab';

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState('leads');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'leads':
        return <LeadsTab />;
      case 'meetings':
        return <MeetingsTab />;
      case 'mail':
        return <MessagesTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full max-w-7xl mx-auto rounded-xl overflow-hidden h-[calc(100vh-20rem)]">
      <div className="w-16 bg-gray-800 flex flex-col items-center py-4 space-y-8">
        <Users onClick={() => setActiveTab('leads')} className="text-gray-300 hover:text-white cursor-pointer" size={24} />
        <Calendar onClick={() => setActiveTab('meetings')} className="text-gray-300 hover:text-white cursor-pointer" size={24} />
        <Mail onClick={() => setActiveTab('mail')} className="text-gray-300 hover:text-white cursor-pointer" size={24} />
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
