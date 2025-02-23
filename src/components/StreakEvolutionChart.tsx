import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data?: {
    dates: string[];
    streaks: number[];
  };
};

export function StreakEvolutionChart({ data }: Props) {
  if (!data) return null;

  const formatDate = (dateString: string) => {
    const [, month, day] = dateString.split("-");
    return `${day}/${month}`;
  };

  const chartData = data.dates.map((date, index) => ({
    date: date,
    formattedDate: formatDate(date),
    avgStreak: data.streaks[index],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
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
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E5E5",
            borderRadius: "8px",
          }}
          labelStyle={{ color: "#240E0B" }}
          itemStyle={{ color: "#615A5A" }}
          formatter={(value: number) => [value.toFixed(1), "Média de Streak"]}
          labelFormatter={(value) => {
            const index = chartData.findIndex(
              (item) => item.formattedDate === value
            );
            return index !== -1 ? formatDate(chartData[index].date) : value;
          }}
        />
        <Line
          type="monotone"
          dataKey="avgStreak"
          stroke="#FFCE04"
          strokeWidth={2}
          dot={{ fill: "#FFCE04", strokeWidth: 2 }}
          activeDot={{ r: 6, fill: "#FFCE04" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
