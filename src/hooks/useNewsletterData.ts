import { useQuery } from "@tanstack/react-query";
import { api, processReadsData } from "../services/api";

export function useNewsletterData(period: number) {
  return useQuery({
    queryKey: ["newsletter-reads", period],
    queryFn: async () => {
      try {
        const reads = await api.getReads(period);
        console.log("Dados recebidos (tipo):", typeof reads);
        console.log(
          "Dados recebidos (estrutura):",
          JSON.stringify(reads, null, 2)
        );
        const processed = processReadsData(reads);
        console.log("Dados processados:", processed); // Log após processamento
        return processed;
      } catch (error) {
        console.error("Erro detalhado:", error); // Log detalhado do erro
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}
