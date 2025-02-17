import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type Reader = {
  email: string;
  streak: number;
  totalReads: number;
  openRate: string;
  lastRead?: string;
  status: "active" | "inactive";
};

export function TopReadersTable() {
  const [search, setSearch] = useState("");

  const mockReaders: Reader[] = [
    {
      email: "leitor1@email.com",
      streak: 15,
      totalReads: 45,
      openRate: "95%",
      lastRead: "2024-02-20",
      status: "active",
    },
    {
      email: "leitor2@email.com",
      streak: 12,
      totalReads: 40,
      openRate: "88%",
      lastRead: "2024-02-19",
      status: "active",
    },
    {
      email: "leitor3@email.com",
      streak: 10,
      totalReads: 38,
      openRate: "85%",
      lastRead: "2024-02-15",
      status: "inactive",
    },
  ];

  const filteredReaders = mockReaders.filter((reader) =>
    reader.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Top Leitores</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por email..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Streak
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total Leituras
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Taxa de Abertura
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Última Leitura
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReaders.map((reader) => (
              <tr key={reader.email} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{reader.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{reader.streak}</span>
                    {reader.streak > 10 && (
                      <span className="ml-2 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Top
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {reader.totalReads}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: reader.openRate }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {reader.openRate}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {reader.lastRead}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full
                    ${
                      reader.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {reader.status === "active" ? "Ativo" : "Inativo"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
