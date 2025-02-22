import { ReactNode } from "react";

export type TrendIndicator = {
  value: number;
  isPositive: boolean;
};

export interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: TrendIndicator;
  icon?: ReactNode;
}
