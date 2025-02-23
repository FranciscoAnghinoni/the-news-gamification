import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DailyStats } from "../types/api";

type Props = {
  data?: DailyStats[];
};

export function OpenRateChart({ data }: Props) {
  if (!data) return null;

  const formatDate = (dateString: string) => {
    const [, month, day] = dateString.split("-");
    return `${day}/${month}`;
  };

  const chartData = data.map((stat) => ({
    date: stat.date,
    formattedDate: formatDate(stat.date),
    rate: Math.min(100, Math.max(0, stat.opening_rate)),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
        <XAxis
          dataKey="formattedDate"
          stroke="#615A5A"
          fontSize={12}
          tickLine={false}
        />
        <YAxis
          stroke="#615A5A"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E5E5",
            borderRadius: "8px",
          }}
          labelStyle={{ color: "#240E0B" }}
          itemStyle={{ color: "#615A5A" }}
          formatter={(value: number) => [
            `${value.toFixed(1)}%`,
            "Taxa de Abertura",
          ]}
          labelFormatter={(value) => {
            const index = chartData.findIndex(
              (item) => item.formattedDate === value
            );
            return index !== -1 ? formatDate(chartData[index].date) : value;
          }}
        />
        <Bar
          dataKey="rate"
          fill="#FFCE04"
          radius={[4, 4, 0, 0]}
          name="Taxa de Abertura"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
