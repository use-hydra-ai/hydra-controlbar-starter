import { LeadFilters } from '@/services/leads-service';
import { useEffect } from 'react';
import { useLeadStore } from '../../store/lead-store';
import LeadList from './lead-list';

interface LeadListContainerProps {
  filters?: LeadFilters;
  onSelectLead?: (leadId: number) => void;
}

export default function LeadListContainer({ filters, onSelectLead }: LeadListContainerProps) {
  const { leads, fetchLeads, fetchFilteredLeads } = useLeadStore();
  
  useEffect(() => {
    if (filters) {
      fetchFilteredLeads(filters);
    } else {
      fetchLeads();
    }
  }, [fetchLeads, fetchFilteredLeads, filters]);

  return (
    <LeadList 
      leads={leads} 
      onSelectLead={onSelectLead} 
      isLoading={!leads.length}
    />
  );
} 