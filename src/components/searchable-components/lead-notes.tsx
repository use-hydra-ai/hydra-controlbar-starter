import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Lead } from '@/services/leads-service';
import { Loader2 } from "lucide-react";
import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { useLeadStore } from '../../store/lead-store';

interface LeadNotesProps {
  lead: Lead;
}

export default function LeadNotes({ lead }: LeadNotesProps) {
  const [newNote, setNewNote] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success'>('idle');
  const { updateExistingLead } = useLeadStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      setSubmitState('loading');
      
      const updatedNotes = [
        ...lead.notes,
        {
          id: lead.notes.length + 1,
          leadId: lead.id,
          content: newNote.trim(),
          timestamp: new Date().toISOString(),
        }
      ];

      await updateExistingLead(lead.id, { ...lead, notes: updatedNotes });
      
      setSubmitState('success');
      setTimeout(() => {
        setSubmitState('idle');
        setNewNote('');
      }, 500);
    }
  };

  return (
    <Card className="w-full max-w-[500px]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Notes for {lead.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-4">
          {lead.notes.map((note) => (
            <li key={note.id} className="bg-secondary p-4 rounded-lg">
              <p className="mb-2">{note.content}</p>
              <p className="text-xs text-muted-foreground">
                {DateTime.fromISO(note.timestamp).toFormat('EEEE LLL d h:mma')}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="space-y-2 w-full">
          <Textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a new note..."
            className="w-full"
          />
          <Button 
            type="submit" 
            className={`w-full transition-all duration-300 ease-in-out ${
              submitState === 'loading' ? 'w-12 p-0' : 
              submitState === 'success' ? 'w-24 bg-green-500 hover:bg-green-600' : ''
            }`}
            disabled={submitState !== 'idle'}
          >
            {submitState === 'idle' && 'Add Note'}
            {submitState === 'loading' && <Loader2 className="h-5 w-5 animate-spin" />}
            {submitState === 'success' && 'Added!'}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
