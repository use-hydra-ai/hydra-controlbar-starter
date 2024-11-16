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

export const LeadFiltersSchema = z.object({
    status: z.enum(["New", "Contacted", "Qualified", "Closed"]).optional()
        .describe("Filter leads by their current status"),

    company: z.string().optional()
        .describe("Filter leads by company name (case-insensitive partial match)"),

    hasMeetings: z.boolean().optional()
        .describe("Filter leads based on whether they have any scheduled meetings"),

    hasNotes: z.boolean().optional()
        .describe("Filter leads based on whether they have any notes"),

    search: z.string().optional()
        .describe("Search leads by name, email, or company (case-insensitive partial match)"),

    dateFrom: z.string().optional()
        .describe("Filter leads with meetings scheduled from this date (ISO format)"),

    dateTo: z.string().optional()
        .describe("Filter leads with meetings scheduled until this date (ISO format)")
});

export const MeetingFiltersSchema = z.object({
    leadId: z.number().optional()
        .describe("Filter meetings for a specific lead"),

    dateFrom: z.string().optional()
        .describe("Filter meetings from this date (ISO format)"),

    dateTo: z.string().optional()
        .describe("Filter meetings until this date (ISO format)"),

    search: z.string().optional()
        .describe("Search meetings by description (case-insensitive partial match)")
});

export const MessageFiltersSchema = z.object({
    search: z.string().optional(),
    dateFrom: z.string().optional(),
    dateTo: z.string().optional(),
    email: z.string().optional(),
});

export type Lead = z.infer<typeof LeadSchema>;
export type MessageFilters = z.infer<typeof MessageFiltersSchema>;
