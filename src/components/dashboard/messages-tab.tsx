import EmailComposer from "../searchable-components/email-composer";

export default function MessagesTab() {
  return (
    <div className="flex">
        <EmailComposer email={'email@example.com'} initialSubject="Hello" initialMessage="Hello, how are you?" />
    </div>
  );
} 