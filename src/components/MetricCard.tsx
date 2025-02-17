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
    <div className="p-6 bg-white rounded-lg border shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <p className="text-3xl font-bold mb-2">{value}</p>
      {trend && (
        <div className="flex items-center gap-1 mb-1">
          {trend.isPositive ? (
            <ArrowUpIcon className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDownIcon className="w-4 h-4 text-red-500" />
          )}
          <span
            className={`text-sm ${
              trend.isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {trend.value}%
          </span>
        </div>
      )}
      {description && <p className="text-gray-600 text-sm">{description}</p>}
    </div>
  );
}
