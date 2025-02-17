import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  { date: "15/02", rate: 6 },
  { date: "16/02", rate: 70 },
  { date: "17/02", rate: 68 },
  { date: "18/02", rate: 72 },
  { date: "19/02", rate: 75 },
  { date: "20/02", rate: 68 },
  { date: "21/02", rate: 71 },
];

type Props = {
  period: number;
};

export function OpenRateChart({ period }: Props) {
  // Aqui podemos filtrar mockData baseado no período
  const filteredData = mockData.slice(-period);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={filteredData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(value) => [`${value}%`, "Taxa de Abertura"]} />
        <Bar dataKey="rate" fill="#FFCE04" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
