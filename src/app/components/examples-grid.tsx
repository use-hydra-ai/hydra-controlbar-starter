'use client';

import { useState } from 'react';
import EmailComposer from './searchable-components/email-composer';
import LeadForm from './searchable-components/lead-form';
import LeadList from './searchable-components/lead-list';
import LeadNotes from './searchable-components/lead-notes';
import LeadStatusUpdate from './searchable-components/lead-status-update';
import MeetingScheduler from './searchable-components/meeting-scheduler';

export default function ExamplesGrid() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button
        onClick={toggleVisibility}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        {isVisible ? 'Hide Available Components' : 'Show Available Components'}
      </button>

      {isVisible && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
          <div>
            <h2 className="text-xl font-semibold mb-2">Lead Form</h2>
            <LeadForm />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Lead List</h2>
            <LeadList/>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Lead Status Update</h2>
            <LeadStatusUpdate
              leadId={1}
              currentStatus="New"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Lead Notes</h2>
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
                meetings: [
                    { id: 1, date: "2024-06-20", time: "14:00", description: "Introductory call" },
                ],
              }}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Meeting Scheduler</h2>
            <MeetingScheduler
              leadId={1}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Email Composer</h2>
            <EmailComposer
              leadId={1}
              leadEmail="john@example.com"
            />
          </div>
        </div>
      )}
    </div>
  );
}
