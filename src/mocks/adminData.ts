import { subDays, format, addDays } from "date-fns";
import { AdminStats, TopReader, HistoricalStats } from "../services/api";

const generateMockData = () => {
  const endDate = new Date();
  const startDate = subDays(endDate, 90);
  const dailyStats = [];
  let currentDate = startDate;

  // Gerar dados diários para 90 dias
  while (currentDate <= endDate) {
    const formattedDate = format(currentDate, "yyyy-MM-dd");

    // Gerar valores com alguma variação mas mantendo uma tendência
    const baseStreak = 5;
    const baseOpenRate = 75;
    const randomVariation = () => (Math.random() - 0.5) * 10;

    dailyStats.push({
      date: formattedDate,
      avg_streak: Math.max(0, baseStreak + randomVariation()),
      opening_rate: Math.min(
        100,
        Math.max(0, baseOpenRate + randomVariation())
      ),
    });

    currentDate = addDays(currentDate, 1);
  }

  const mockTopReaders: TopReader[] = [
    {
      email: "maria@example.com",
      streak: 45,
      opening_rate: 98.5,
      last_read: format(endDate, "yyyy-MM-dd"),
    },
    {
      email: "joao@example.com",
      streak: 30,
      opening_rate: 95.2,
      last_read: format(endDate, "yyyy-MM-dd"),
    },
    {
      email: "ana@example.com",
      streak: 28,
      opening_rate: 92.8,
      last_read: format(subDays(endDate, 1), "yyyy-MM-dd"),
    },
    {
      email: "pedro@example.com",
      streak: 21,
      opening_rate: 88.5,
      last_read: format(subDays(endDate, 1), "yyyy-MM-dd"),
    },
    {
      email: "lucia@example.com",
      streak: 15,
      opening_rate: 85.0,
      last_read: format(subDays(endDate, 2), "yyyy-MM-dd"),
    },
    {
      email: "carlos@example.com",
      streak: 10,
      opening_rate: 82.3,
      last_read: format(subDays(endDate, 2), "yyyy-MM-dd"),
    },
    {
      email: "patricia@example.com",
      streak: 7,
      opening_rate: 78.9,
      last_read: format(subDays(endDate, 3), "yyyy-MM-dd"),
    },
    {
      email: "roberto@example.com",
      streak: 5,
      opening_rate: 75.4,
      last_read: format(subDays(endDate, 3), "yyyy-MM-dd"),
    },
    {
      email: "fernanda@example.com",
      streak: 3,
      opening_rate: 70.2,
      last_read: format(subDays(endDate, 4), "yyyy-MM-dd"),
    },
    {
      email: "ricardo@example.com",
      streak: 1,
      opening_rate: 65.8,
      last_read: format(subDays(endDate, 4), "yyyy-MM-dd"),
    },
  ];

  const mockAdminStats: AdminStats = {
    total_users: 1250,
    avg_streak: 8.5,
    avg_opening_rate: 82.3,
    active_users: 875,
  };

  const mockHistoricalStats: HistoricalStats = {
    daily_stats: dailyStats,
  };

  return {
    adminStats: mockAdminStats,
    topReaders: mockTopReaders,
    historicalStats: mockHistoricalStats,
  };
};

export const mockData = generateMockData();
