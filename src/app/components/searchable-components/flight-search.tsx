'use client';
import React from 'react';

interface FlightSearchProps {
  initialFrom: string;
  initialTo: string;
  initialDate: string;
}

export default function FlightSearch({ initialFrom, initialTo, initialDate }: FlightSearchProps) {
  const [from, setFrom] = React.useState(initialFrom);
  const [to, setTo] = React.useState(initialTo);
  const [date, setDate] = React.useState(initialDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform search logic here
    console.log('Searching for flights:', { from, to, date });
    // You can add API calls or other search logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Search Flights
      </button>
    </form>
  );
}
