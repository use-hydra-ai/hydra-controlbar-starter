import { Lead } from '@/app/services/leads-service';
import { DateTime } from 'luxon';
import React, { useState } from 'react';

interface LeadNotesProps {
  lead: Lead ;
}

export default function LeadNotes({ lead }: LeadNotesProps) {
  const [newNote, setNewNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      setNewNote('');
    }
  };

  return (
    <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
      <h3 className="text-md font-semibold">Notes for {lead.name}</h3>
      <ul className="space-y-4">
        {lead.notes.map((note) => (
          <li key={note.id} className="bg-white p-4 rounded-lg shadow">
            <p className="mb-2">{note.content}</p>
            <p className="text-xs text-gray-500">
              {DateTime.fromISO(note.timestamp).toFormat('EEEE LLL d h:mma')}
            </p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Add a new note..."
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add Note
        </button>
      </form>
    </div>
  );
}
