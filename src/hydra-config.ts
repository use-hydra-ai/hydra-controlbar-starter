import { HydraClient } from "hydra-ai";
import { ComponentContextTool } from "hydra-ai/dist/hydra-ai/model/component-metadata";
import AddLeadForm from "./components/searchable-components/add-lead-form";
import AddMeetingForm from "./components/searchable-components/add-meeting-form";
import AddMessageForm from "./components/searchable-components/add-message-form";
import EditLeadForm from "./components/searchable-components/edit-lead-form";
import EditMeetingForm from "./components/searchable-components/edit-meeting-form";
import LeadDetails from "./components/searchable-components/lead-details";
import { LeadListSkeleton } from "./components/searchable-components/lead-list";
import LeadListContainer from "./components/searchable-components/lead-list-container";
import LeadNotes from "./components/searchable-components/lead-notes";
import MeetingDetails from "./components/searchable-components/meeting-details";
import { MeetingsListSkeleton } from "./components/searchable-components/meetings-list";
import MeetingsListContainer from "./components/searchable-components/meetings-list-container";
import MessageDetails from "./components/searchable-components/message-details";
import { MessagesListSkeleton } from "./components/searchable-components/messages-list";
import MessagesListContainer from "./components/searchable-components/messages-list-container";
import { AddMessageFormSkeleton, EditMeetingFormSkeleton, FormSkeleton, LeadDetailsSkeleton, LeadNotesSkeleton, MeetingDetailsSkeleton, MeetingFormSkeleton, MessageDetailsSkeleton } from "./components/skeletons";
import { LeadFiltersSchema, LeadSchema, MeetingFiltersSchema, MeetingSchema, MessageFiltersSchema, MessageSchema } from "./schemas/lead";
import { getLeads } from "./services/leads-service";
import { getMessages } from "./services/messages-service";

const hydra = new HydraClient({
    hydraApiKey: process.env.NEXT_PUBLIC_HYDRA_API_KEY,
    hydraApiUrl: "https://api.usehydra.ai",
});

const getLeadsTool: ComponentContextTool = {
    getComponentContext: getLeads,
    definition: {
        name: "getLeads",
        description: "Get a list of all the leads, which includes meetings, notes, and messages",
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
    const leadFiltersSchemaString = JSON.stringify(LeadFiltersSchema.shape);
    const meetingFiltersSchemaString = JSON.stringify(MeetingFiltersSchema.shape);
    const messageFiltersSchemaString = JSON.stringify(MessageFiltersSchema.shape);

    try {
        await Promise.all([
            hydra.registerComponent({
                name: "add-lead-form",
                description: "A form for adding new leads",
                component: AddLeadForm,
                propsDefinition: { lead: leadSchemaString },
                loadingComponent: FormSkeleton
            }),
            hydra.registerComponent({
                name: "lead-list",
                description: "A list of leads with their statuses. Use this when the user wants to view all leads or filter them.",
                component: LeadListContainer,
                propsDefinition: {
                    filters: leadFiltersSchemaString
                },
                contextTools: [getLeadsTool],
                loadingComponent: LeadListSkeleton
            }),
            hydra.registerComponent({
                name: "lead-details",
                description: "A component for viewing details of a lead. These details include things like name, email, phone, status, and notes.",
                component: LeadDetails,
                propsDefinition: { leadId: "number" },
                contextTools: [getLeadsTool],
                loadingComponent: LeadDetailsSkeleton
            }),
            hydra.registerComponent({
                name: "edit-lead-form",
                description: "A form for editing existing leads",
                component: EditLeadForm,
                propsDefinition: { lead: leadSchemaString },
                contextTools: [getLeadsTool],
                loadingComponent: FormSkeleton
            }),
            hydra.registerComponent({
                name: "lead-notes",
                description: "A component for adding and viewing notes on a lead",
                component: LeadNotes,
                propsDefinition: { lead: leadSchemaString },
                contextTools: [getLeadsTool],
                loadingComponent: LeadNotesSkeleton
            }),
            hydra.registerComponent({
                name: "meetings-list",
                description: "A list of meetings with their details. Use this when the user wants to view all meetings, filter them by date, or search for specific meetings.",
                component: MeetingsListContainer,
                propsDefinition: {
                    filters: meetingFiltersSchemaString
                },
                contextTools: [getLeadsTool],
                loadingComponent: MeetingsListSkeleton
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
                contextTools: [getLeadsTool],
                loadingComponent: MeetingFormSkeleton
            }),
            hydra.registerComponent({
                name: "meeting-details",
                description: "A component for viewing details of a meeting",
                component: MeetingDetails,
                propsDefinition: { meeting: meetingSchemaString, leadId: "string" },
                contextTools: [getLeadsTool],
                loadingComponent: MeetingDetailsSkeleton
            }),
            hydra.registerComponent({
                name: "edit-meeting-form",
                description: "A component for editing details of a meeting",
                component: EditMeetingForm,
                propsDefinition: { meeting: meetingSchemaString, leadId: "string" },
                contextTools: [getLeadsTool],
                loadingComponent: EditMeetingFormSkeleton
            }),
            hydra.registerComponent({
                name: "add-message-form",
                description: "A component for creating messages or emails to send",
                component: AddMessageForm,
                propsDefinition: { initialEmail: "string", initialSubject: "string", initialContent: "string" },
                contextTools: [getMessagesTool],
                loadingComponent: AddMessageFormSkeleton
            }),
            hydra.registerComponent({
                name: "message-details",
                description: "A component for viewing details of a message",
                component: MessageDetails,
                propsDefinition: { message: messageSchemaString, leadId: "string" },
                contextTools: [getMessagesTool],
                loadingComponent: MessageDetailsSkeleton
            }),
            hydra.registerComponent({
                name: "messages-list",
                description: "A list of messages with their details",
                component: MessagesListContainer,
                propsDefinition: {
                    filters: messageFiltersSchemaString
                },
                contextTools: [getMessagesTool],
                loadingComponent: MessagesListSkeleton
            }),
        ]);
    } catch (error) {
        console.error("Error registering components:", error);
    }
};

export default hydra;
