import { HydraClient } from "hydra-ai";
import { ComponentContextTool } from "hydra-ai/dist/hydra-ai/model/component-metadata";
import AddLeadForm from "./components/searchable-components/add-lead-form";
import AddMeetingForm from "./components/searchable-components/add-meeting-form";
import EditLeadForm from "./components/searchable-components/edit-lead-form";
import EmailComposer from "./components/searchable-components/email-composer";
import LeadDetails from "./components/searchable-components/lead-details";
import LeadList from "./components/searchable-components/lead-list";
import LeadNotes from "./components/searchable-components/lead-notes";
import { LeadSchema } from "./schemas/lead";
import { getLeads } from "./services/leads-service";

const hydra = new HydraClient({
    hydraApiKey: process.env.NEXT_PUBLIC_HYDRA_API_KEY,
});

const getLeadsTool: ComponentContextTool = {
    getComponentContext: getLeads,
    definition: {
        name: "getLeads",
        description: "Get a list of all the leads",
        parameters: []
    }
}

export const initHydraRegistration = async () => {
    if (!LeadSchema || !LeadSchema.shape) {
        console.error("LeadSchema is not properly defined");
        return;
    }

    const leadSchemaString = JSON.stringify(LeadSchema.shape);

    try {
        await Promise.all([
            hydra.registerComponent(
                "add-lead-form",
                "A form for adding new leads",
                AddLeadForm,
                { lead: leadSchemaString },
            ),
            hydra.registerComponent(
                "lead-list",
                "A list of leads with their statuses",
                LeadList,
                { leads: `${leadSchemaString}[]` },
                [getLeadsTool]
            ),
            hydra.registerComponent("lead-details", "A component for viewing details of a lead. These details include things like name, email, phone, status, and notes.", LeadDetails,
                { leadId: "number" },
                [getLeadsTool]
            ),
            hydra.registerComponent("edit-lead-form", "A form for editing existing leads", EditLeadForm,
                { lead: leadSchemaString },
                [getLeadsTool]
            ),
            hydra.registerComponent("lead-notes", "A component for adding and viewing notes on a lead", LeadNotes,
                { lead: leadSchemaString },
                [getLeadsTool]
            ),
            hydra.registerComponent("meeting-scheduler", "A component for scheduling meetings with leads", AddMeetingForm,
                {
                    initialDateTimeISO: "string in ISO format",
                    initialDescription: "string"
                },
                [getLeadsTool]
            ),
            hydra.registerComponent("email-composer", "A component for composing and sending emails to leads", EmailComposer,
                {
                    email: "string",
                    initialSubject: "string",
                    initialMessage: "string"
                },
                [getLeadsTool]
            ),
        ]);
    } catch (error) {
        console.error("Error registering components:", error);
    }
};

export default hydra;
