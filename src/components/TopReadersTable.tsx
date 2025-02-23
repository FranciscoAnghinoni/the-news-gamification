import { Icon } from "./Icons";
import { useState } from "react";
import { TopReadersTableProps } from "../types/components/readers";
import { format, parseISO, addHours } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TopReader } from "../types/api";

export function TopReadersTable({ readers }: TopReadersTableProps) {
  const [search, setSearch] = useState("");

  const filteredReaders = readers.filter((reader) =>
    reader.email.toLowerCase().includes(search.toLowerCase())
  );

  const formatLastRead = (dateString: string) => {
    const date = parseISO(dateString);
    const brDate = addHours(date, 3);
    return format(brDate, "dd/MM/yyyy", { locale: ptBR });
  };

  return (
    <div className="bg-branco rounded-lg border border-cinza/20 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-cinza/20">
        <h2 className="text-lg font-semibold text-marrom mb-4">Top Leitores</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-cinza/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-amarelo text-marrom placeholder-cinza"
          />
          <Icon
            name="MagnifyingGlass"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cinza"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-cinza/20">
          <thead className="bg-cinza/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-cinza uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-cinza uppercase tracking-wider">
                Streak
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-cinza uppercase tracking-wider">
                Taxa de Abertura
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-cinza uppercase tracking-wider">
                Última Leitura
              </th>
            </tr>
          </thead>
          <tbody className="bg-branco divide-y divide-cinza/20">
            {filteredReaders.map((reader) => (
              <tr key={reader.email} className="hover:bg-amarelo/5">
                <td className="px-6 py-4 whitespace-nowrap text-marrom">
                  {reader.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-marrom">
                      {reader.streak === 0 ? (
                        <span className="text-red-400">Inativo</span>
                      ) : (
                        reader.streak
                      )}
                    </span>
                    {reader.streak > 10 && (
                      <span className="ml-2 px-2 py-1 text-xs font-medium bg-verde/20 text-verde rounded-full">
                        Top
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-24 bg-cinza/20 rounded-full h-2">
                      <div
                        className="bg-amarelo h-2 rounded-full"
                        style={{ width: `${reader.opening_rate}%` }}
                      />
                    </div>
                    <span className="text-sm text-marrom ml-2">
                      {reader.opening_rate.toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-cinza">
                  {formatLastRead(reader.last_read)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
