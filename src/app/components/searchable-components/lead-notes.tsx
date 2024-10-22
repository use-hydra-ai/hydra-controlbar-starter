import React, { useState } from 'react';

interface Note {
  id: number;
  content: string;
  timestamp: string;
}

interface LeadNotesProps {
  leadId: number;
  notes: Note[];
}

export default function LeadNotes({ leadId, notes }: LeadNotesProps) {
  const [newNote, setNewNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      setNewNote('');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Notes</h3>
      <ul className="space-y-2">
        {notes.map((note) => (
          <li key={note.id} className="bg-gray-100 p-2 rounded">
            <p>{note.content}</p>
            <p className="text-xs text-gray-500">{note.timestamp}</p>
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
