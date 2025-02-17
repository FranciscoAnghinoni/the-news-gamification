import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  { date: "15/02", avgStreak: 4 },
  { date: "16/02", avgStreak: 4.5 },
  { date: "17/02", avgStreak: 5 },
  { date: "18/02", avgStreak: 5.5 },
  { date: "19/02", avgStreak: 6 },
  { date: "20/02", avgStreak: 7.5 },
  { date: "21/02", avgStreak: 7 },
];

type Props = {
  period: number;
};

export function StreakEvolutionChart({ period }: Props) {
  // Aqui podemos filtrar mockData baseado no período
  const filteredData = mockData.slice(-period);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={filteredData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="avgStreak"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={{ fill: "#3B82F6", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
