import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data?: {
    dates: string[];
    openRates: number[];
  };
};

export function OpenRateChart({ data }: Props) {
  if (!data) return null;

  const chartData = data.dates.map((date, index) => ({
    date: new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    }),
    rate: Math.min(100, Math.max(0, data.openRates[index])),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
        <XAxis dataKey="date" stroke="#615A5A" fontSize={12} tickLine={false} />
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
