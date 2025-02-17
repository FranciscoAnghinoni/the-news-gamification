import { useState } from "react";
import { ReadingHistory } from "../components/ReadingHistory";
import { StreakCard } from "../components/StreakCard";
import { useNewsletterData } from "../hooks/useNewsletterData";

export function Dashboard() {
  const [period] = useState(7);
  const { data, isLoading, error } = useNewsletterData(period);

  // Teste de conexão ao montar o componente

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">Erro ao carregar dados</div>
      </div>
    );
  }

  const userStreak = data?.streaksByEmail.get("user@email.com") || 0; // Substituir pelo email do usuário logado
  const userOpenRate = 85; // Calcular baseado nos dados reais

  return (
    <div className="container mx-auto px-4 py-10">
      <div>
        <h1 className="text-3xl font-bold mb-6">Dashboard do Leitor</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <StreakCard currentStreak={userStreak} />
          <div className="p-5 shadow-md border rounded-lg">
            <h2 className="text-xl font-semibold">Suas Estatísticas</h2>
            <p className="mt-4">Taxa de Abertura: {userOpenRate}%</p>
          </div>
        </div>

        <ReadingHistory />
      </div>
    </div>
  );
}
