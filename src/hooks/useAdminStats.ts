import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export function useAdminStats(period: number) {
  const getDateRange = (days: number) => {
    // End date is today at the start of the day (00:00:00)
    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0);

    // Start date is (days - 1) days before end date
    // For 7 days: today and 6 days before = 7 days total
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - (days - 1));

    const range = {
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    };

    // Verificar datas no intervalo
    const dates = [];
    const current = new Date(startDate);
    while (current <= endDate) {
      dates.push(current.toISOString().split("T")[0]);
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

      const transformedData = {
        dates: data.daily_stats.map((stat) => stat.date),
        streaks: data.daily_stats.map((stat) => stat.avg_streak),
        openRates: data.daily_stats.map((stat) => stat.opening_rate),
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
