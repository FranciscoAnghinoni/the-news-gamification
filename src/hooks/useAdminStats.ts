import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export function useAdminStats(period: number) {
  const getDateRange = (days: number) => {
    // Get the date in Brazilian timezone
    const now = new Date();
    const brazilianDate = new Date(
      now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
    );

    // Set to start of day
    const endDate = new Date(brazilianDate);
    endDate.setHours(0, 0, 0, 0);

    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - (days - 1));

    // Format dates in YYYY-MM-DD
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const range = {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    };

    const dates = [];
    const current = new Date(startDate);
    while (current <= endDate) {
      dates.push(formatDate(current));
      current.setDate(current.getDate() + 1);
    }


    return range;
  };

  const { startDate, endDate } = getDateRange(period);

  const statsQuery = useQuery({
    queryKey: ["admin-stats", period],
    queryFn: () => api.getAdminStats(startDate, endDate),
  });

  const topReadersQuery = useQuery({
    queryKey: ["top-readers", period],
    queryFn: () => api.getTopReaders(startDate, endDate),
  });

  const historicalDataQuery = useQuery({
    queryKey: ["historical-data", period],
    queryFn: async () => {
      const data = await api.getHistoricalStats(startDate, endDate);

      // Sort the data chronologically once
      const sortedStats = [...data.daily_stats].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      // Use dates directly from API response
      const transformedData = {
        dates: sortedStats.map((stat) => stat.date),
        streaks: sortedStats.map((stat) => stat.avg_streak),
        openRates: sortedStats.map((stat) => stat.opening_rate),
      };

      return transformedData;
    },
  });

  return {
    data: statsQuery.data,
    topReaders: topReadersQuery.data,
    historicalData: historicalDataQuery.data,
    isLoading:
      statsQuery.isLoading ||
      topReadersQuery.isLoading ||
      historicalDataQuery.isLoading,
    error:
      statsQuery.error || topReadersQuery.error || historicalDataQuery.error,
  };
}
