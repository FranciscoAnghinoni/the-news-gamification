import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { AdminStatsFilters } from "../types/api";
import { getMockData } from "../mocks/adminData";

export function useAdminStats(
  filters: AdminStatsFilters,
  useMockData: boolean = false
) {
  const {
    data: adminStats,
    isLoading: isLoadingStats,
    error: statsError,
  } = useQuery({
    queryKey: ["admin-stats", filters],
    queryFn: () =>
      useMockData
        ? Promise.resolve(getMockData(filters).adminStats)
        : api.getAdminStats(filters),
    enabled: !useMockData,
  });

  const { data: topReaders, isLoading: isLoadingReaders } = useQuery({
    queryKey: ["top-readers", filters],
    queryFn: () =>
      useMockData
        ? Promise.resolve(getMockData(filters).topReaders)
        : api.getTopReaders(filters),
    enabled: !useMockData,
  });

  const { data: historicalStats, isLoading: isLoadingHistorical } = useQuery({
    queryKey: ["historical-stats", filters],
    queryFn: () =>
      useMockData
        ? Promise.resolve(getMockData(filters).historicalStats)
        : api.getHistoricalStats(filters),
    enabled: !useMockData,
  });

  if (useMockData) {
    const mockData = getMockData(filters);
    return {
      data: mockData.adminStats,
      topReaders: mockData.topReaders,
      historicalData: mockData.historicalStats.daily_stats,
      isLoading: false,
      error: null,
    };
  }

  return {
    data: adminStats,
    topReaders,
    historicalData: historicalStats?.daily_stats,
    isLoading: isLoadingStats || isLoadingReaders || isLoadingHistorical,
    error: statsError,
  };
}
