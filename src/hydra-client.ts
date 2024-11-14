import { HydraClient } from "hydra-ai";
import { ComponentContextTool } from "hydra-ai/dist/hydra-ai/model/component-metadata";
import AddLeadForm from "./components/searchable-components/add-lead-form";
import AddMeetingForm from "./components/searchable-components/add-meeting-form";
import AddMessageForm from "./components/searchable-components/add-message-form";
import EditLeadForm from "./components/searchable-components/edit-lead-form";
import EditMeetingForm from "./components/searchable-components/edit-meeting-form";
import LeadDetails from "./components/searchable-components/lead-details";
import LeadList, { LeadListSkeleton } from "./components/searchable-components/lead-list";
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
    hydraApiUrl: "http://localhost:3000",
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
            hydra.registerComponent({
                name: "add-lead-form",
                description: "A form for adding new leads",
                component: AddLeadForm,
                propsDefinition: { lead: leadSchemaString },
            }),
            hydra.registerComponent({
                name: "lead-list",
                description: "A list of leads with their statuses",
                component: LeadList,
                propsDefinition: { leads: `${leadSchemaString}[]` },
                contextTools: [getLeadsTool],
                loadingComponent: LeadListSkeleton
            }),
            hydra.registerComponent({
                name: "lead-details",
                description: "A component for viewing details of a lead. These details include things like name, email, phone, status, and notes.",
                component: LeadDetails,
                propsDefinition: { leadId: "number" },
                contextTools: [getLeadsTool]
            }),
            hydra.registerComponent({
                name: "edit-lead-form",
                description: "A form for editing existing leads",
                component: EditLeadForm,
                propsDefinition: { lead: leadSchemaString },
                contextTools: [getLeadsTool]
            }),
            hydra.registerComponent({
                name: "lead-notes",
                description: "A component for adding and viewing notes on a lead",
                component: LeadNotes,
                propsDefinition: { lead: leadSchemaString },
                contextTools: [getLeadsTool]
            }),
            hydra.registerComponent({
                name: "meetings-list",
                description: "A list of meetings with their details",
                component: MeetingsList,
                propsDefinition: { meetings: `${meetingSchemaString}[]` },
                contextTools: [getLeadsTool]
            }),
            hydra.registerComponent({
                name: "add-meeting-form",
                description: "A component for scheduling meetings with leads",
                component: AddMeetingForm,
                propsDefinition: {
                    initialDateTimeISO: "string in ISO format",
                    initialDescription: "string",
                    initialLeadId: "string"
                },
                contextTools: [getLeadsTool]
            }),
            hydra.registerComponent({
                name: "meeting-details",
                description: "A component for viewing details of a meeting",
                component: MeetingDetails,
                propsDefinition: { meeting: meetingSchemaString, leadId: "string" },
                contextTools: [getLeadsTool]
            }),
            hydra.registerComponent({
                name: "edit-meeting-form",
                description: "A component for editing details of a meeting",
                component: EditMeetingForm,
                propsDefinition: { meeting: meetingSchemaString, leadId: "string" },
                contextTools: [getLeadsTool]
            }),
            hydra.registerComponent({
                name: "add-message-form",
                description: "A component for creating messages or emails to send",
                component: AddMessageForm,
                propsDefinition: { initialEmail: "string", initialSubject: "string", initialContent: "string" },
                contextTools: [getMessagesTool]
            }),
            hydra.registerComponent({
                name: "message-details",
                description: "A component for viewing details of a message",
                component: MessageDetails,
                propsDefinition: { message: messageSchemaString, leadId: "string" },
                contextTools: [getMessagesTool]
            }),
            hydra.registerComponent({
                name: "messages-list",
                description: "A list of messages with their details",
                component: MessagesList,
                propsDefinition: { messages: `${messageSchemaString}[]` },
                contextTools: [getMessagesTool]
            }),
        ]);
    } catch (error) {
        console.error("Error registering components:", error);
    }
};

export default hydra;
