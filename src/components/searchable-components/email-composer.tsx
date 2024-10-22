import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import React, { useState } from 'react';

interface EmailComposerProps {
  email: string;
  initialSubject?: string;
  initialMessage?: string;
}

export default function EmailComposer({ email, initialSubject = '', initialMessage = '' }: EmailComposerProps) {
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialMessage);
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (subject && body) {
      setSubmitState('loading');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitState('success');
      setTimeout(() => {
        setSubmitState('idle');
        setSubject('');
        setBody('');
      }, 2000);
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Compose Email</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="to">To</Label>
            <Input
              type="email"
              id="to"
              value={email}
              className="bg-muted"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="body">Message</Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
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
            {submitState === 'idle' && 'Send Email'}
            {submitState === 'loading' && <Loader2 className="h-5 w-5 animate-spin" />}
            {submitState === 'success' && 'Sent!'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
