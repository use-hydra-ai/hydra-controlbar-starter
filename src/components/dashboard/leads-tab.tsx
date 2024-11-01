import { useLeadStore } from '@/store/lead-store';
import React, { useEffect } from 'react';
import LeadDetails from '../searchable-components/lead-details';
import LeadList from '../searchable-components/lead-list';

export default function LeadsTab() {
  const { leads } = useLeadStore();
  const [selectedLeadId, setSelectedLeadId] = React.useState<number | null>(null);

  useEffect(() => {
    if (leads && leads.length > 0) {
      setSelectedLeadId(leads[0].id);
    }
  }, [leads]);

  return (
    <div className="flex gap-4">
      <LeadList leads={leads ?? []} onSelectLead={setSelectedLeadId} />
      {selectedLeadId && <LeadDetails leadId={selectedLeadId} />}
    </div>
  );
}
