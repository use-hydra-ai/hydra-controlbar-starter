import { z } from "zod";

export const LeadStatusEnum = z.enum(["New", "Contacted", "Qualified", "Closed"]);

export const NoteSchema = z.object({
    id: z.number(),
    leadId: z.number(),
    content: z.string(),
    timestamp: z.string(),
});

export const MeetingSchema = z.object({
    id: z.number(),
    leadId: z.number(),
    date: z.string(),
    time: z.string(),
    description: z.string(),
});

export const LeadSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    company: z.string(),
    phone: z.string(),
    status: LeadStatusEnum,
    notes: z.array(NoteSchema),
    meetings: z.array(MeetingSchema),
});

export const MessageSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    subject: z.string(),
    content: z.string(),
    timestamp: z.string(),
});

export type Lead = z.infer<typeof LeadSchema>;
