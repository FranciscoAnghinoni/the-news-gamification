import { StatsCardProps } from "../types/components/stats";

export function StatsCard({
  title,
  icon,
  gradient = false,
  children,
}: StatsCardProps) {
  return (
    <div
      className={`${
        gradient ? "bg-gradient-to-br from-amarelo to-amarelo/90" : "bg-amarelo"
      } rounded-xl p-6 text-marrom shadow-lg hover:scale-105 transition-transform flex flex-col h-[200px]`}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="h-6 w-6 flex-shrink-0">{icon}</div>
        <h2 className="text-lg font-semibold truncate">{title}</h2>
      </div>
      {children}
    </div>
  );
}
