import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";

export function useNewsletterData(period: number) {
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["newsletter-data", period, user?.email],
    queryFn: async () => {
      if (!user?.email) {
        throw new Error("User not authenticated");
      }

      const stats = await api.getUserStats(user.email);
      return stats;
    },
    retry: false,
    enabled: !!user?.email,
  });

  return { data, isLoading, error };
}
