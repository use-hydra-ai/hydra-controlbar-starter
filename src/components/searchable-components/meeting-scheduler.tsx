import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from 'react';

interface MeetingSchedulerProps {
  initialDateTimeISO?: string;
  initialDescription?: string;
}

export default function MeetingScheduler({ 
  initialDateTimeISO: initialDateTime = '', 
  initialDescription = '' 
}: MeetingSchedulerProps) {
  const [dateTime, setDateTime] = useState(initialDateTime);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState(initialDescription);
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    if (initialDateTime) {
      const dateObj = new Date(initialDateTime);
      setDate(dateObj.toISOString().split('T')[0]);
      setTime(dateObj.toTimeString().slice(0, 5));
    }
  }, [initialDateTime]);

  const handleDateTimeChange = (newDate: string, newTime: string) => {
    if (newDate && newTime) {
      const isoString = `${newDate}T${newTime}:00`;
      setDateTime(isoString);
    } else {
      setDateTime('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (dateTime && description) {
      setSubmitState('loading');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitState('success');
      setTimeout(() => {
        setSubmitState('idle');
        setDateTime('');
        setDate('');
        setTime('');
        setDescription('');
      }, 2000);
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Schedule Meeting</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="date">Date</Label>
            <Input
              type="date"
              id="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                handleDateTimeChange(e.target.value, time);
              }}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="time">Time</Label>
            <Input
              type="time"
              id="time"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
                handleDateTimeChange(date, e.target.value);
              }}
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
            {submitState === 'idle' && 'Schedule Meeting'}
            {submitState === 'loading' && <Loader2 className="h-5 w-5 animate-spin" />}
            {submitState === 'success' && 'Scheduled!'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
