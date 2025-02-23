import { DailyStats } from "../api/index";

export interface ChartProps {
  data: DailyStats[];
  title: string;
  dataKey: keyof DailyStats;
  yAxisLabel: string;
  yAxisDomain?: [number, number];
}
