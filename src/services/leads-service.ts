import { LeadSchema, LeadStatusEnum } from "@/schemas/lead";
import { z } from "zod";

export type Lead = z.infer<typeof LeadSchema>;
export type LeadStatus = z.infer<typeof LeadStatusEnum>;

export type Note = z.infer<typeof LeadSchema>["notes"][number];
export type Meeting = z.infer<typeof LeadSchema>["meetings"][number];

let leads: Lead[] = [
    {
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
            content,
            timestamp: new Date().toISOString(),
        };
        lead.notes.push(newNote);
        return newNote;
    }
    return undefined;
}

export async function addMeeting(leadId: number, meeting: Omit<Meeting, 'id'>): Promise<Meeting | undefined> {
    const lead = await getLead(leadId);
    if (lead) {
        const newMeeting: Meeting = {
            ...meeting,
            id: lead.meetings.length + 1,
        };
        lead.meetings.push(newMeeting);
        return newMeeting;
    }
    return undefined;
}
