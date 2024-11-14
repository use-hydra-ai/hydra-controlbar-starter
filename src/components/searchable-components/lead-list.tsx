import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { Lead, LeadStatus } from '../../services/leads-service';
import { useLeadStore } from '../../store/lead-store';
import AddLeadForm from './add-lead-form';
import LeadDetails from './lead-details';

interface LeadListProps {
  leads: Lead[];
  onSelectLead?: (leadId: number) => void;
  isLoading?: boolean;
}

export default function LeadList({ leads = [], onSelectLead, isLoading = false }: LeadListProps) {
  const { updateLeadStatus } = useLeadStore();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [showAddLeadForm, setShowAddLeadForm] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null);

  const handleStatusChange = async (leadId: number, newStatus: LeadStatus) => {
    await updateLeadStatus(leadId, newStatus);
    setOpenDropdown(null);
  };

  const handleLeadClick = (leadId: number) => {
    if (onSelectLead) {
      onSelectLead(leadId);
    } else {
      setSelectedLeadId(leadId);
    }
  };

  if (selectedLeadId !== null) {
    return <LeadDetails leadId={selectedLeadId} />;
  }

  const getStatusColor = (status: string): { bg: string; text: string } => {
    switch (status) {
      case "New": return { bg: "bg-blue-100", text: "text-blue-800" };
      case "Contacted": return { bg: "bg-yellow-100", text: "text-yellow-800" };
      case "Qualified": return { bg: "bg-green-100", text: "text-green-800" };
      case "Closed": return { bg: "bg-gray-100", text: "text-gray-800" };
      default: return { bg: "bg-gray-100", text: "text-gray-800" };
    }
  };

  const LoadingSkeleton = () => (
    <>
      {[1, 2, 3].map((index) => (
        <div 
          key={index}
          className="bg-white p-4 flex items-center border-b border-gray-200"
        >
          <div className="flex-1 min-w-0 mr-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>
          <div className="flex-1 min-w-0 mr-4">
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          </div>
          <div>
            <div className="h-6 w-20 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="flex flex-col bg-white rounded-lg p-4 min-w-[400px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Leads</h2>
        <button
          onClick={() => setShowAddLeadForm(true)}
          className="p-2 text-black rounded-full hover:bg-gray-200 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
      {showAddLeadForm && (
        <div className="mb-4">
          <AddLeadForm onClose={() => setShowAddLeadForm(false)} />
        </div>
      )}
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        leads.map((lead, index) => (
          <div 
            key={lead.id} 
            className={`bg-white p-4 flex items-center ${
              index !== leads.length - 1 ? 'border-b border-gray-200' : ''
            } hover:bg-gray-100 transition-colors cursor-pointer`}
            onClick={() => handleLeadClick(lead.id)}
          >
            <div className="flex-1 min-w-0 mr-4">
              <h3 className="text-sm font-semibold truncate" title={lead.name}>{lead.name}</h3>
              <p className="text-sm text-gray-600 truncate" title={lead.email}>{lead.email}</p>
            </div>
            <div className="flex-1 min-w-0 mr-4">
              <p className="text-sm text-gray-800 truncate" title={lead.company}>{lead.company}</p>
            </div>
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === lead.id ? null : lead.id)}
                className={`px-2 py-1 rounded-md text-sm font-medium hover:opacity-80 ${getStatusColor(lead.status).bg} ${getStatusColor(lead.status).text}`}
              >
                {lead.status}
              </button>
              {openDropdown === lead.id && (
                <div className="absolute z-10 right-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {["New", "Contacted", "Qualified", "Closed"].map((status) => {
                      const { bg, text } = getStatusColor(status);
                      return (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(lead.id, status as LeadStatus)}
                          className={`block w-full text-left px-4 py-2 text-sm hover:opacity-80`}
                          role="menuitem"
                        >
                          <span className={`${bg} ${text} font-medium rounded-md px-2 py-1`}>{status}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export function LeadListSkeleton() {
  return <LeadList leads={[]} isLoading={true} />;
}
