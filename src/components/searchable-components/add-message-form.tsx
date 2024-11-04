import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMessageStore } from "@/store/message-store";
import { Loader2, XIcon } from "lucide-react";
import { useState } from 'react';

interface AddMessageFormProps {
  onClose?: () => void;
}

export default function AddMessageForm({ onClose }: AddMessageFormProps) {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success'>('idle');

  const { addNewMessage } = useMessageStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState('loading');

    await addNewMessage({
      email,
      subject,
      content,
      status: 'draft',
      timestamp: new Date().toISOString(),
    });

    setSubmitState('success');
    setTimeout(() => {
      setSubmitState('idle');
      onClose?.();
    }, 500);
  };

  return (
    <Card className="w-full relative">
      <button
        onClick={onClose}
        className="absolute top-6 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
      >
        <XIcon className="w-5 h-5" />
      </button>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">New Message</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">To</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="recipient@example.com"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Message subject"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="content">Message</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your message here..."
              rows={5}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className={`w-full transition-all duration-300 ease-in-out ${
              submitState === 'loading' ? 'w-12 p-0' : 
              submitState === 'success' ? 'w-24 bg-green-500 hover:bg-green-600' : ''
            }`}
            disabled={submitState !== 'idle'}
          >
            {submitState === 'idle' && 'Save Draft'}
            {submitState === 'loading' && <Loader2 className="h-5 w-5 animate-spin" />}
            {submitState === 'success' && 'Saved!'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 