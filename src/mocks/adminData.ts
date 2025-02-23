import {
  subDays,
  format,
  addDays,
  parseISO,
  isWithinInterval,
  addHours,
} from "date-fns";
import {
  AdminStats,
  TopReader,
  HistoricalStats,
  AdminStatsFilters,
  DailyStats,
} from "../types/api/index";

const generateMockData = () => {
  const endDate = addHours(new Date(), 3);
  const startDate = subDays(endDate, 90);
  const dailyStats: DailyStats[] = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    const formattedDate = format(currentDate, "yyyy-MM-dd");

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

const rawMockData = generateMockData();

export function getMockData(filters: AdminStatsFilters) {
  const { startDate, endDate, newsletterDate, minStreak } = filters;
  const dateInterval = {
    start: parseISO(startDate),
    end: parseISO(endDate),
  };

  // Filtrar dados históricos
  const filteredDailyStats = rawMockData.historicalStats.daily_stats.filter(
    (stat) => {
      const statDate = parseISO(stat.date);
      return isWithinInterval(statDate, dateInterval);
    }
  );

  // Se houver uma data específica de newsletter, filtrar apenas aquele dia
  const finalDailyStats = newsletterDate
    ? filteredDailyStats.filter((stat) => stat.date === newsletterDate)
    : filteredDailyStats;

  // Filtrar top readers
  const filteredTopReaders = rawMockData.topReaders
    .filter((reader) => {
      const readerDate = parseISO(reader.last_read);
      return isWithinInterval(readerDate, dateInterval);
    })
    .filter((reader) => reader.streak >= (minStreak || 0));

  // Calcular médias para o período filtrado
  const avgStreak =
    finalDailyStats.reduce((sum, stat) => sum + stat.avg_streak, 0) /
    finalDailyStats.length;

  const avgOpeningRate =
    finalDailyStats.reduce((sum, stat) => sum + stat.opening_rate, 0) /
    finalDailyStats.length;

  const filteredAdminStats: AdminStats = {
    ...rawMockData.adminStats,
    avg_streak: avgStreak,
    avg_opening_rate: avgOpeningRate,
    active_users: Math.floor(
      rawMockData.adminStats.active_users * (finalDailyStats.length / 90)
    ),
  };

  return {
    adminStats: filteredAdminStats,
    topReaders: filteredTopReaders,
    historicalStats: {
      daily_stats: finalDailyStats,
    },
  };
}
