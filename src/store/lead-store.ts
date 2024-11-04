import { create } from 'zustand';
import { Lead, Meeting, addLead, addMeeting, getLeads, updateLead, updateLeadStatus } from '../services/leads-service';

interface LeadStore {
    leads: Lead[];
    fetchLeads: () => Promise<void>;
    addNewLead: (lead: Omit<Lead, 'id'>) => Promise<void>;
    updateExistingLead: (id: number, lead: Omit<Lead, 'id'>) => Promise<void>;
    updateLeadStatus: (id: number, status: Lead['status']) => Promise<void>;
    addNewMeeting: (leadId: number, meeting: Omit<Meeting, 'id'>) => Promise<void>;
}

export const useLeadStore = create<LeadStore>((set) => ({
    leads: [],
    fetchLeads: async () => {
        const leads = await getLeads();
        set({ leads });
    },
    addNewLead: async (lead) => {
        const newLead = await addLead(lead);
        set((state) => {
            const leadExists = state.leads.some((l) => l.id === newLead.id);
            if (!leadExists) {
                return { leads: [...state.leads, newLead] };
            }
            return state;
        });
    },
    updateExistingLead: async (id, lead) => {
        const updatedLead = await updateLead(id, lead);
        if (updatedLead) {
            set((state) => ({
                leads: state.leads.map((l) => (l.id === id ? updatedLead : l)),
            }));
        }
    },
    updateLeadStatus: async (id, status) => {
        const updatedLead = await updateLeadStatus(id, status);
        if (updatedLead) {
            set((state) => ({
                leads: state.leads.map((l) => (l.id === id ? updatedLead : l)),
            }));
        }
    },
    addNewMeeting: async (leadId, meeting) => {
        const newMeeting = await addMeeting(leadId, meeting);
        if (newMeeting) {
            set((state) => ({
                leads: state.leads.map((l) =>
                    l.id === leadId
                        ? { ...l, meetings: [...l.meetings, newMeeting] }
                        : l
                ),
            }));
        }
    },
}));
