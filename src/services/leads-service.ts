import { LeadFiltersSchema, LeadSchema, LeadStatusEnum, MessageSchema } from "@/schemas/lead";
import { z } from "zod";

export type Lead = z.infer<typeof LeadSchema>;
export type LeadStatus = z.infer<typeof LeadStatusEnum>;

export type Note = z.infer<typeof LeadSchema>["notes"][number];
export type Meeting = z.infer<typeof LeadSchema>["meetings"][number];
export type Message = z.infer<typeof MessageSchema>;

export type LeadFilters = z.infer<typeof LeadFiltersSchema>;

const leads: Lead[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        company: "Acme Inc.",
        phone: "123-456-7890",
        status: "New",
        notes: [
            { id: 1, leadId: 1, content: "Initial contact made", timestamp: "2024-06-15T10:00:00" },
            { id: 2, leadId: 1, content: "Scheduled follow-up call", timestamp: "2024-06-16T14:30:00" },
        ],
        meetings: [
            { id: 1, leadId: 1, date: "2024-06-20", time: "14:00", description: "Introductory call" },
        ],
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@techcorp.com",
        company: "TechCorp",
        phone: "987-654-3210",
        status: "Qualified",
        notes: [
            { id: 3, leadId: 2, content: "Expressed interest in our premium package", timestamp: "2024-06-18T11:15:00" },
        ],
        meetings: [
            { id: 2, leadId: 2, date: "2024-06-25", time: "10:30", description: "Product demo" },
        ],
    },
    {
        id: 3,
        name: "Alice Johnson",
        email: "alice@globalfirm.com",
        company: "Global Firm LLC",
        phone: "555-123-4567",
        status: "Contacted",
        notes: [
            { id: 4, leadId: 3, content: "Sent initial proposal", timestamp: "2024-06-19T09:45:00" },
        ],
        meetings: [],
    },
    {
        id: 4,
        name: "Bob Williams",
        email: "bob@innovate.io",
        company: "Innovate.io",
        phone: "444-789-0123",
        status: "New",
        notes: [],
        meetings: [
            { id: 3, leadId: 4, date: "2024-06-30", time: "15:00", description: "Initial consultation" },
        ],
    },
    {
        id: 5,
        name: "Eva Brown",
        email: "eva@megacorp.com",
        company: "MegaCorp",
        phone: "777-888-9999",
        status: "Closed",
        notes: [
            { id: 5, leadId: 5, content: "Discussing contract terms", timestamp: "2024-06-20T14:30:00" },
            { id: 6, leadId: 5, content: "Requested pricing breakdown", timestamp: "2024-06-21T10:00:00" },
        ],
        meetings: [
            { id: 4, leadId: 5, date: "2024-06-28", time: "11:00", description: "Contract review" },
        ],
    },
];

export async function getLeads(): Promise<Lead[]> {
    return leads;
}

export async function getLead(id: number): Promise<Lead | undefined> {
    return leads.find(lead => lead.id === id);
}

export async function addLead(lead: Omit<Lead, 'id'>): Promise<Lead> {
    const newLead: Lead = {
        ...lead,
        id: leads.length + 1,
        notes: [],
        meetings: [],
    };
    leads.push(newLead);
    return newLead;
}

export async function updateLead(id: number, lead: Omit<Lead, 'id'>): Promise<Lead | undefined> {
    const leadIndex = leads.findIndex(l => l.id === id);
    if (leadIndex !== -1) {
        leads[leadIndex] = { ...leads[leadIndex], ...lead };
        return leads[leadIndex];
    }
    return undefined;
}

export async function updateLeadStatus(id: number, status: LeadStatus): Promise<Lead | undefined> {
    const lead = await getLead(id);
    if (lead) {
        lead.status = status;
    }
    return lead;
}

export async function addNote(leadId: number, content: string): Promise<Note | undefined> {
    const lead = await getLead(leadId);
    if (lead) {
        const newNote: Note = {
            id: lead.notes.length + 1,
            leadId,
            content,
            timestamp: new Date().toISOString(),
        };
        lead.notes.push(newNote);
        return newNote;
    }
    return undefined;
}

export async function addMeeting(leadId: number, meeting: Omit<Meeting, 'id' | 'leadId'>): Promise<Meeting | undefined> {
    const lead = await getLead(leadId);
    if (lead) {
        const newMeeting: Meeting = {
            ...meeting,
            id: lead.meetings.length + 1,
            leadId,
        };
        lead.meetings.push(newMeeting);
        return newMeeting;
    }
    return undefined;
}

export async function getFilteredLeads(filters: LeadFilters = {}): Promise<Lead[]> {
    let filteredLeads = [...leads];

    if (filters.status) {
        filteredLeads = filteredLeads.filter(lead => lead.status === filters.status);
    }

    if (filters.company) {
        filteredLeads = filteredLeads.filter(lead =>
            lead.company.toLowerCase().includes(filters.company!.toLowerCase())
        );
    }

    if (filters.hasMeetings !== undefined) {
        filteredLeads = filteredLeads.filter(lead =>
            filters.hasMeetings ? lead.meetings.length > 0 : lead.meetings.length === 0
        );
    }

    if (filters.hasNotes !== undefined) {
        filteredLeads = filteredLeads.filter(lead =>
            filters.hasNotes ? lead.notes.length > 0 : lead.notes.length === 0
        );
    }

    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredLeads = filteredLeads.filter(lead =>
            lead.name.toLowerCase().includes(searchTerm) ||
            lead.email.toLowerCase().includes(searchTerm) ||
            lead.company.toLowerCase().includes(searchTerm)
        );
    }

    if (filters.dateFrom || filters.dateTo) {
        filteredLeads = filteredLeads.filter(lead => {
            return lead.meetings.some(meeting => {
                const meetingDate = new Date(meeting.date);
                if (filters.dateFrom && meetingDate < new Date(filters.dateFrom)) return false;
                if (filters.dateTo && meetingDate > new Date(filters.dateTo)) return false;
                return true;
            });
        });
    }

    return filteredLeads;
}
