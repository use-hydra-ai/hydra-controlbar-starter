import { HydraClient } from "hydra-ai";
import { ComponentContextTool } from "hydra-ai/dist/hydra-ai/model/component-metadata";
import AddLeadForm from "./components/searchable-components/add-lead-form";
import AddMeetingForm from "./components/searchable-components/add-meeting-form";
import AddMessageForm from "./components/searchable-components/add-message-form";
import EditLeadForm from "./components/searchable-components/edit-lead-form";
import EditMeetingForm from "./components/searchable-components/edit-meeting-form";
import LeadDetails from "./components/searchable-components/lead-details";
import LeadList from "./components/searchable-components/lead-list";
import LeadNotes from "./components/searchable-components/lead-notes";
import MeetingDetails from "./components/searchable-components/meeting-details";
import MeetingsList from "./components/searchable-components/meetings-list";
import MessageDetails from "./components/searchable-components/message-details";
import MessagesList from "./components/searchable-components/messages-list";
import { LeadSchema, MeetingSchema, MessageSchema } from "./schemas/lead";
import { getLeads } from "./services/leads-service";
import { getMessages } from "./services/messages-service";

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

const getMessagesTool: ComponentContextTool = {
    getComponentContext: getMessages,
    definition: {
        name: "getMessages",
        description: "Get a list of all the messages",
        parameters: []
    }
}

export const initHydraRegistration = async () => {
    if (!LeadSchema || !LeadSchema.shape) {
        console.error("LeadSchema is not properly defined");
        return;
    }

    const leadSchemaString = JSON.stringify(LeadSchema.shape);
    const meetingSchemaString = JSON.stringify(MeetingSchema.shape);
    const messageSchemaString = JSON.stringify(MessageSchema.shape);

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
            hydra.registerComponent("meetings-list", "A list of meetings with their details", MeetingsList,
                { meetings: `${meetingSchemaString}[]` },
                [getLeadsTool]
            ),
            hydra.registerComponent("add-meeting-form", "A component for scheduling meetings with leads", AddMeetingForm,
                {
                    initialDateTimeISO: "string in ISO format",
                    initialDescription: "string",
                    initialLeadId: "string"
                },
                [getLeadsTool]
            ),
            hydra.registerComponent("meeting-details", "A component for viewing details of a meeting", MeetingDetails,
                { meeting: meetingSchemaString, leadId: "string" },
                [getLeadsTool]
            ),
            hydra.registerComponent("edit-meeting-form", "A component for editing details of a meeting", EditMeetingForm,
                { meeting: meetingSchemaString, leadId: "string" },
                [getLeadsTool]
            ),
            hydra.registerComponent("add-message-form", "A component for creating messages or emails to send", AddMessageForm,
                { initialEmail: "string", initialSubject: "string", initialContent: "string" },
                [getMessagesTool]
            ),
            hydra.registerComponent("message-details", "A component for viewing details of a message", MessageDetails,
                { message: messageSchemaString, leadId: "string" },
                [getMessagesTool]
            ),
            hydra.registerComponent("messages-list", "A list of messages with their details", MessagesList,
                { messages: `${messageSchemaString}[]` },
                [getMessagesTool]
            ),
        ]);
    } catch (error) {
        console.error("Error registering components:", error);
    }
};

export default hydra;
