import { HydraClient } from "hydra-ai";
import EmailComposer from "./components/searchable-components/email-composer";
import LeadForm from "./components/searchable-components/lead-form";
import LeadList from "./components/searchable-components/lead-list";
import LeadNotes from "./components/searchable-components/lead-notes";
import LeadStatusUpdate from "./components/searchable-components/lead-status-update";
import MeetingScheduler from "./components/searchable-components/meeting-scheduler";

const hydra = new HydraClient({
    hydraApiKey: process.env.NEXT_PUBLIC_HYDRA_API_KEY,
});

export const initHydraRegistration = async () => {
    await Promise.all([
        hydra.registerComponent("lead-form", "A form for adding new leads", LeadForm,
            {
                lead: "{ name?: string; email?: string; company?: string; phone?: string }"
            }
        ),
        hydra.registerComponent("lead-list", "A list of leads with their statuses", LeadList,
            {
                leads: "{id: number, name: string, email: string, company: string, status: string}[]"
            }
        ),
        hydra.registerComponent("lead-status-update", "A component for updating lead status", LeadStatusUpdate,
            {
                leadId: "number",
                currentStatus: "string"
            }
        ),
        hydra.registerComponent("lead-notes", "A component for adding and viewing notes on a lead", LeadNotes,
            {
                leadId: "number",
                notes: "{id: number, content: string, timestamp: string}[]"
            }
        ),
        hydra.registerComponent("meeting-scheduler", "A component for scheduling meetings with leads", MeetingScheduler,
            {
                leadId: "number"
            }
        ),
        hydra.registerComponent("email-composer", "A component for composing and sending emails to leads", EmailComposer,
            {
                leadId: "number",
                leadEmail: "string"
            }
        ),
    ]);
};

export default hydra;
