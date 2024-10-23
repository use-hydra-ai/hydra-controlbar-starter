import { create } from 'zustand';
import { Lead, addLead, getLeads, updateLead, updateLeadStatus } from '../services/leads-service';

interface LeadStore {
    leads: Lead[];
    fetchLeads: () => Promise<void>;
    addNewLead: (lead: Omit<Lead, 'id'>) => Promise<void>;
    updateExistingLead: (id: number, lead: Omit<Lead, 'id'>) => Promise<void>;
    updateLeadStatus: (id: number, status: Lead['status']) => Promise<void>;
}

export const useLeadStore = create<LeadStore>((set) => ({
    leads: [],
    fetchLeads: async () => {
        const leads = await getLeads();
        set({ leads });
    },
    addNewLead: async (lead) => {
        const newLead = await addLead(lead);
        set((state) => ({ leads: [...state.leads, newLead] }));
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
}));

