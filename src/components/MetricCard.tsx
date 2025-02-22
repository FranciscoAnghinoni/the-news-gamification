import { Icon } from "./Icons";
import { MetricCardProps } from "../types/components/metrics";

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
          <Icon
            name={trend.isPositive ? "ArrowUp" : "ArrowDown"}
            className={`w-4 h-4 ${
              trend.isPositive ? "text-verde" : "text-vermelho"
            }`}
          />
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
