import React, { useState } from 'react';

interface LeadStatusUpdateProps {
  leadId: number;
  currentStatus: string;
}

export default function LeadStatusUpdate({ leadId, currentStatus }: LeadStatusUpdateProps) {
  const [status, setStatus] = useState(currentStatus);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
  };

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="status" className="text-sm font-medium text-gray-700">Status:</label>
      <select
        id="status"
        value={status}
        onChange={handleStatusChange}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Lost">Lost</option>
        <option value="Won">Won</option>
      </select>
    </div>
  );
}
