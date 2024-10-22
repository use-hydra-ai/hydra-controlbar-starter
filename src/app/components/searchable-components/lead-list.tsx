
interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  status: string;
}

interface LeadListProps {
  leads: Lead[];
}

export default function LeadList({ leads }: LeadListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td className="px-6 py-4 whitespace-nowrap">{lead.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{lead.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{lead.company}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={lead.status}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Lost">Lost</option>
                  <option value="Won">Won</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
