import { Lead, LeadStatus } from '@/app/services/leads-service';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from 'react';

interface LeadFormProps {
  lead?: Lead;
}

export default function LeadForm({lead}: LeadFormProps) {
  const [name, setName] = useState(lead?.name || '');
  const [email, setEmail] = useState(lead?.email || '');
  const [company, setCompany] = useState(lead?.company || '');
  const [phone, setPhone] = useState(lead?.phone || '');
  const [status, setStatus] = useState<LeadStatus>(lead?.status || 'New');

  useEffect(() => {
    setName(lead?.name || '');
    setEmail(lead?.email || '');
    setCompany(lead?.company || '');
    setPhone(lead?.phone || '');
    setStatus(lead?.status || 'New');
  }, [lead]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setName('');
    setEmail('');
    setCompany('');
    setPhone('');
    setStatus('New');
  };

  const getStatusColor = (status: LeadStatus): string => {
    switch (status) {
      case 'New': return '#e5f6fd';
      case 'Contacted': return '#fff4e5';
      case 'Qualified': return '#e5ffe5';
      case 'Closed': return '#ffe5e5';
      default: return 'transparent';
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Add a lead</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              placeholder="Lead Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              placeholder="Lead Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={company}
              placeholder="Lead Company"
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="tel"
              id="phone"
              value={phone}
              placeholder="Lead Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value) => setStatus(value as LeadStatus)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a status">
                  <span style={{ backgroundColor: getStatusColor(status), padding: '2px 8px', borderRadius: '4px', display: 'inline-block' }}>
                    {status}
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {["New", "Contacted", "Qualified", "Closed"].map((statusOption) => (
                  <SelectItem 
                    key={statusOption} 
                    value={statusOption}
                  >
                    <span style={{ backgroundColor: getStatusColor(statusOption as LeadStatus), padding: '2px 8px', borderRadius: '4px', display: 'inline-block' }}>
                      {statusOption}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Create
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
