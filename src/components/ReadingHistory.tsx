export function ReadingHistory() {
  const mockHistory = [
    { date: "2024-02-20", title: "Newsletter #123", opened: true },
    { date: "2024-02-19", title: "Newsletter #122", opened: true },
    { date: "2024-02-18", title: "Newsletter #121", opened: false },
  ];

  return (
    <div className="p-5 shadow-md border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Histórico de Leituras</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Newsletter
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockHistory.map((entry) => (
              <tr key={entry.date}>
                <td className="px-6 py-4 whitespace-nowrap">{entry.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {entry.opened ? "✅ Lida" : "❌ Não lida"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
