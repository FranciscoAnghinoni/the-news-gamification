import { MetricCard } from "../components/MetricCard";
import { TopReadersTable } from "../components/TopReadersTable";
import { StreakEvolutionChart } from "../components/StreakEvolutionChart";
import { OpenRateChart } from "../components/OpenRateChart";
import {
  UsersIcon,
  FireIcon,
  EnvelopeOpenIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNewsletterData } from "../hooks/useNewsletterData";

export function Admin() {
  const [period, setPeriod] = useState("7");
  const { data, isLoading, error } = useNewsletterData(Number(period));

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

  const totalReaders = data?.streaksByEmail.size || 0;
  const avgStreak =
    Array.from(data?.streaksByEmail.values() || []).reduce(
      (acc, curr) => acc + curr,
      0
    ) / totalReaders;

  const openRates = Array.from(data?.openRateByDay.values() || []).map(
    ({ total, opened }) => (opened / total) * 100
  );
  const avgOpenRate =
    openRates.reduce((acc, curr) => acc + curr, 0) / openRates.length;

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(e.target.value);
    // Aqui podemos adicionar lógica para atualizar os dados baseado no período
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>

          <div className="flex gap-4">
            <select
              className="px-4 py-2 border rounded-lg"
              value={period}
              onChange={handlePeriodChange}
            >
              <option value="7">Últimos 7 dias</option>
              <option value="30">Últimos 30 dias</option>
              <option value="90">Últimos 90 dias</option>
            </select>
          </div>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total de Leitores"
            value={totalReaders}
            trend={{ value: 12, isPositive: true }}
            description="vs. mês anterior"
            icon={<UsersIcon className="w-6 h-6" />}
          />
          <MetricCard
            title="Média de Streak"
            value={avgStreak.toFixed(2) + " dias"}
            trend={{ value: 25, isPositive: true }}
            description="vs. último mês"
            icon={<FireIcon className="w-6 h-6" />}
          />
          <MetricCard
            title="Taxa de Abertura"
            value={avgOpenRate.toFixed(2) + "%"}
            trend={{ value: 5, isPositive: false }}
            description="Meta: 70%"
            icon={<EnvelopeOpenIcon className="w-6 h-6" />}
          />
          <MetricCard
            title="Leitores Ativos"
            value="892"
            trend={{ value: 8, isPositive: true }}
            description="Últimos 7 dias"
            icon={<UserGroupIcon className="w-6 h-6" />}
          />
        </div>

        {/* Tabela de Top Leitores */}
        <div className="mb-8">
          <TopReadersTable />
        </div>

        {/* Área de gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Evolução de Streaks</h2>
              <select
                className="px-3 py-1 border rounded-lg text-sm"
                value={period}
                onChange={handlePeriodChange}
              >
                <option value="7">7 dias</option>
                <option value="15">15 dias</option>
                <option value="30">30 dias</option>
              </select>
            </div>
            <StreakEvolutionChart period={Number(period)} />
          </div>
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">
                Taxa de Abertura por Dia
              </h2>
              <select
                className="px-3 py-1 border rounded-lg text-sm"
                value={period}
                onChange={handlePeriodChange}
              >
                <option value="7">7 dias</option>
                <option value="15">15 dias</option>
                <option value="30">30 dias</option>
              </select>
            </div>
            <OpenRateChart period={Number(period)} />
          </div>
        </div>
      </div>
    </div>
  );
}
