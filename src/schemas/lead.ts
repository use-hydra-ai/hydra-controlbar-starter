import { z } from "zod";

export const LeadStatusEnum = z.enum(["New", "Contacted", "Qualified", "Closed"]);

export const LeadSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    company: z.string(),
    phone: z.string(),
    status: LeadStatusEnum,
    notes: z.array(z.object({
        id: z.number(),
        content: z.string(),
        timestamp: z.string(),
    })),
    meetings: z.array(z.object({
        id: z.number(),
        date: z.string(),
        time: z.string(),
        description: z.string(),
    })),
});

export type Lead = z.infer<typeof LeadSchema>;
