import { useEffect, useState } from 'react';
import { getLeads, Lead, LeadStatus, updateLeadStatus } from '../../services/leads-service';

export default function LeadList() {
  const [leadsState, setLeadsState] = useState<Lead[]>([]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      const leads = await getLeads();
      setLeadsState(leads);
    };
    fetchLeads();
  }, []);

  const handleStatusChange = async (leadId: number, newStatus: "New" | "Contacted" | "Qualified" | "Closed") => {
    const updatedLead = await updateLeadStatus(leadId, newStatus);
    if (updatedLead) {
      setLeadsState(leadsState.map(lead => lead.id === leadId ? updatedLead : lead));
    }
    setOpenDropdown(null);
  };

  const getStatusColor = (status: string): { bg: string; text: string } => {
    switch (status) {
      case "New": return { bg: "bg-blue-100", text: "text-blue-800" };
      case "Contacted": return { bg: "bg-yellow-100", text: "text-yellow-800" };
      case "Qualified": return { bg: "bg-green-100", text: "text-green-800" };
      case "Closed": return { bg: "bg-gray-100", text: "text-gray-800" };
      default: return { bg: "bg-gray-100", text: "text-gray-800" };
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white rounded-lg p-4 min-w-[400px]">
      {leadsState.map((lead) => (
        <div key={lead.id} className="bg-white shadow-md rounded-lg p-4 flex items-center">
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
              className={`px-2 py-1 rounded-md text-sm font-medium ${getStatusColor(lead.status).bg} ${getStatusColor(lead.status).text}`}
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
      ))}
    </div>
  );
}
