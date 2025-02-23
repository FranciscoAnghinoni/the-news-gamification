import { Icon } from "./Icons";
import { mockTopReaders } from "../mocks/topReaders";
import { TopReadersProps } from "../types/components/readers";

function getNameFromEmail(email: string): string {
  if (email === "current.user@example.com") return "Você";
  const [name] = email.split("@");
  return name
    .split(".")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function TopReaders({ readers = mockTopReaders }: TopReadersProps) {
  return (
    <div className="bg-branco rounded-xl shadow-lg border border-cinza/20 overflow-hidden h-full flex flex-col max-h-[600px] lg:max-h-[584px] p-6">
      <h2 className="text-base font-bold text-marrom border-b border-cinza/10 flex items-center gap-2 flex-shrink-0 pb-2">
        <Icon name="Trophy" className="h-5 w-5 text-amarelo" />
        Top Leitores da Semana
      </h2>
      <div className="divide-y divide-cinza/10 overflow-y-auto">
        {readers.map((reader, index) => (
          <div
            key={reader.email}
            className={`p-4 hover:bg-amarelo/5 transition-colors ${
              reader.email === "current.user@example.com" ? "bg-amarelo/10" : ""
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
                  <span className="text-cinza font-bold text-sm">
                    {index + 1}º
                  </span>
                )}
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2">
                  <Icon
                    name="UserCircle"
                    className="h-5 w-5 text-amarelo flex-shrink-0"
                  />
                  <span className="font-medium text-marrom truncate text-sm">
                    {getNameFromEmail(reader.email)}
                  </span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xs text-cinza">Taxa de Abertura</div>
                <div className="font-bold text-marrom text-sm">
                  {reader.opening_rate.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
