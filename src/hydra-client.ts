import { HydraClient } from "hydra-ai";
import EmailComposer from "./components/searchable-components/email-composer";
import LeadForm from "./components/searchable-components/lead-form";
import LeadList from "./components/searchable-components/lead-list";
import LeadNotes from "./components/searchable-components/lead-notes";
import LeadStatusUpdate from "./components/searchable-components/lead-status-update";
import MeetingScheduler from "./components/searchable-components/meeting-scheduler";
import { LeadSchema } from "./schemas/lead";

const hydra = new HydraClient({
    hydraApiKey: process.env.NEXT_PUBLIC_HYDRA_API_KEY,
});

export const initHydraRegistration = async () => {
    if (!LeadSchema || !LeadSchema.shape) {
        console.error("LeadSchema is not properly defined");
        return;
    }

    const leadSchemaString = JSON.stringify(LeadSchema.shape);
    const leadStatusValues = LeadSchema.shape.status?._def?.values?.join(" | ") || "string";

    try {
        await Promise.all([
            hydra.registerComponent("lead-form", "A form for adding new leads", LeadForm,
                { lead: leadSchemaString }
            ),
            hydra.registerComponent("lead-list", "A list of leads with their statuses", LeadList,
                { leads: `${leadSchemaString}[]` }
            ),
            hydra.registerComponent("lead-status-update", "A component for updating lead status", LeadStatusUpdate,
                {
                    leadId: "number",
                    currentStatus: leadStatusValues
                }
            ),
            hydra.registerComponent("lead-notes", "A component for adding and viewing notes on a lead", LeadNotes,
                { lead: leadSchemaString }
            ),
            hydra.registerComponent("meeting-scheduler", "A component for scheduling meetings with leads", MeetingScheduler,
                {
                    initialDateTimeISO: "string in ISO format",
                    initialDescription: "string"
                }
            ),
            hydra.registerComponent("email-composer", "A component for composing and sending emails to leads", EmailComposer,
                {
                    email: "string",
                    initialSubject: "string",
                    initialMessage: "string"
                }
            ),
        ]);
    } catch (error) {
        console.error("Error registering components:", error);
    }
};

export default hydra;
