import { useQuery } from "@tanstack/react-query";
import { api, processReadsData } from "../services/api";
import { useAuth } from "../hooks/useAuth";

export function useNewsletterData(period: number) {
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["newsletter-data", period, user?.email],
    queryFn: async () => {
      try {
        const stats = await api.getUserStats(user?.id.toString() || "1");
        return {
          streaksByEmail: new Map([
            [user?.email || "user@email.com", stats.currentStreak],
          ]),
          openRateByDay: new Map([
            ["current", { total: stats.totalReads, opened: stats.totalReads }],
          ]),
        };
      } catch (error) {
        // During development, return mock data if the API endpoint isn't ready
        console.log("Using mock data while API is in development");
        return {
          streaksByEmail: new Map([[user?.email || "user@email.com", 5]]),
          openRateByDay: new Map([["2024-03-01", { total: 100, opened: 85 }]]),
        };
      }
    },
    retry: false, // Don't retry failed requests during development
  });

  return { data, isLoading, error };
}
