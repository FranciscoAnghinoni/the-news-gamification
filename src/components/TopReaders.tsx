import { TrophyIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { mockTopReaders } from "../mocks/topReaders";

interface Reader {
  name: string;
  openRate: number;
  streak: number;
}

interface TopReadersProps {
  readers?: Reader[];
}

export function TopReaders({ readers = mockTopReaders }: TopReadersProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-[#615A5A]/20 overflow-hidden h-full flex flex-col max-h-[584px] p-6">
      <h2 className="text-base font-bold  text-[#240E0B] border-b border-[#615A5A]/10 flex items-center gap-2 flex-shrink-0 pb-2">
        <TrophyIcon className="h-5 w-5  text-[#FFCE04]" />
        Top Leitores da Semana
      </h2>
      <div className="divide-y divide-[#615A5A]/10 overflow-y-auto">
        {readers.map((reader, index) => (
          <div
            key={reader.name}
            className={`p-4 hover:bg-[#FFCE04]/5 transition-colors ${
              reader.name === "Você" ? "bg-[#FFCE04]/10" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center">
                {index === 0 ? (
                  <span className="text-xl">🏆</span>
                ) : index === 1 ? (
                  <span className="text-xl">🥈</span>
                ) : index === 2 ? (
                  <span className="text-xl">🥉</span>
                ) : (
                  <span className="text-[#615A5A] font-bold text-sm">
                    {index + 1}º
                  </span>
                )}
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2">
                  <UserCircleIcon className="h-5 w-5 text-[#FFCE04] flex-shrink-0" />
                  <span className="font-medium text-[#240E0B] truncate text-sm">
                    {reader.name}
                  </span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xs text-[#615A5A]">Taxa de Abertura</div>
                <div className="font-bold text-[#240E0B] text-sm">
                  {reader.openRate.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
