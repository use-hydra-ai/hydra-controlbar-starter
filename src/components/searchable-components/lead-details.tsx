import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lead } from '@/services/leads-service';
import { useEffect, useState } from 'react';
import { useLeadStore } from '../../store/lead-store';
import EditLeadForm from './edit-lead-form';
import LeadNotes from './lead-notes';

interface LeadDetailsProps {
  leadId: number;
}

export default function LeadDetails({ leadId }: LeadDetailsProps) {
  const { leads, fetchLeads } = useLeadStore();
  const [lead, setLead] = useState<Lead | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    const foundLead = leads.find(l => l.id === leadId);
    setLead(foundLead || null);
  }, [leadId, leads]);

  if (!lead) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full max-w-[800px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-semibold">{lead.name}</CardTitle>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {isEditing ? (
          <EditLeadForm lead={lead} onClose={() => setIsEditing(false)} />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>{lead.email}</p>
              </div>
              <div>
                <h3 className="font-semibold">Company</h3>
                <p>{lead.company}</p>
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p>{lead.phone}</p>
              </div>
              <div>
                <h3 className="font-semibold">Status</h3>
                <p>{lead.status}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Notes</h3>
              <LeadNotes lead={lead} />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
