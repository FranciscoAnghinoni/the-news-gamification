import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

type TrendIndicator = {
  value: number;
  isPositive: boolean;
};

type MetricCardProps = {
  title: string;
  value: string | number;
  description?: string;
  trend?: TrendIndicator;
  icon?: React.ReactNode;
};

export function MetricCard({
  title,
  value,
  description,
  trend,
  icon,
}: MetricCardProps) {
  return (
    <div className="p-6 bg-branco rounded-lg border border-cinza/20 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-cinza text-sm font-medium">{title}</h3>
        {icon && <div className="text-amarelo">{icon}</div>}
      </div>
      <p className="text-3xl font-bold mb-2 text-marrom">{value}</p>
      {trend && (
        <div className="flex items-center gap-1 mb-1">
          {trend.isPositive ? (
            <ArrowUpIcon className="w-4 h-4 text-verde" />
          ) : (
            <ArrowDownIcon className="w-4 h-4 text-vermelho" />
          )}
          <span
            className={`text-sm ${
              trend.isPositive ? "text-verde" : "text-vermelho"
            }`}
          >
            {trend.value}%
          </span>
        </div>
      )}
      {description && <p className="text-cinza text-sm">{description}</p>}
    </div>
  );
}
