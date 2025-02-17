import { useQuery } from "@tanstack/react-query";
import { api, processReadsData } from "../services/api";

export function useNewsletterData(period: number) {
  return useQuery({
    queryKey: ["newsletter-reads", period],
    queryFn: async () => {
      const reads = await api.getReads(period);
      return processReadsData(reads);
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}
