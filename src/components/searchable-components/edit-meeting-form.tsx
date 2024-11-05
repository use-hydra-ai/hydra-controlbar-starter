import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Meeting } from "@/services/leads-service";
import { useLeadStore } from "@/store/lead-store";
import { Loader2, XIcon } from "lucide-react";
import React, { useEffect, useState } from 'react';

interface EditMeetingFormProps {
  meeting: Meeting;
  leadId: number;
  onClose?: () => void;
}

export default function EditMeetingForm({ meeting, leadId, onClose }: EditMeetingFormProps) {
  const [date, setDate] = useState(meeting.date);
  const [time, setTime] = useState(meeting.time);
  const [description, setDescription] = useState(meeting.description);
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    setDate(meeting.date);
    setTime(meeting.time);
    setDescription(meeting.description);
  }, [meeting]);

  const { updateExistingLead, leads } = useLeadStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState('loading');

    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    const updatedMeetings = lead.meetings.map(m => 
      m.id === meeting.id 
        ? { ...m, date, time, description }
        : m
    );

    await updateExistingLead(leadId, { ...lead, meetings: updatedMeetings });
    
    setSubmitState('success');
    setTimeout(() => {
      setSubmitState('idle');
      onClose?.();
    }, 500);
  };

  return (
    <Card className="w-[400px] relative">
      {onClose && (
        <button
          onClick={onClose}
        className="absolute top-6 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
      >
          <XIcon className="w-5 h-5" />
        </button>
      )}
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Edit meeting</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="date">Date</Label>
            <Input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="time">Time</Label>
            <Input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
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
            {submitState === 'idle' && 'Update'}
            {submitState === 'loading' && <Loader2 className="h-5 w-5 animate-spin" />}
            {submitState === 'success' && 'Updated!'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 