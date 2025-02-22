import { MetricCard } from "../components/MetricCard";
import { TopReadersTable } from "../components/TopReadersTable";
import { StreakEvolutionChart } from "../components/StreakEvolutionChart";
import { OpenRateChart } from "../components/OpenRateChart";
import {
  UsersIcon,
  FireIcon,
  EnvelopeOpenIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAdminStats } from "../hooks/useAdminStats";
import { ApiError } from "../services/api";
import { useNavigate } from "react-router-dom";

export function Admin() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState("7");
  const { data, topReaders, historicalData, isLoading, error } = useAdminStats(
    Number(period)
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-branco flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amarelo" />
      </div>
    );
  }

  if (error) {
    const apiError = error as ApiError;

    if (apiError.isAuthError) {
      navigate("/auth");
      return null;
    }

    return (
      <div className="min-h-screen bg-branco flex items-center justify-center">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-marrom mx-auto mb-4" />
          <div className="text-marrom text-lg font-medium">
            {apiError.message}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-amarelo text-marrom rounded-lg hover:bg-amarelo/90 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(e.target.value);
  };

  return (
    <div className="min-h-screen bg-branco">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-marrom">
            Painel Administrativo
          </h1>

          <select
            className="px-4 py-2 border border-cinza/20 rounded-lg bg-branco text-marrom focus:outline-none focus:ring-2 focus:ring-amarelo"
            value={period}
            onChange={handlePeriodChange}
          >
            <option value="7">Últimos 7 dias</option>
            <option value="30">Últimos 30 dias</option>
            <option value="90">Últimos 90 dias</option>
          </select>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total de Leitores"
            value={data?.total_users || 0}
            trend={{ value: 12, isPositive: true }}
            description="vs. mês anterior"
            icon={<UsersIcon className="w-6 h-6" />}
          />
          <MetricCard
            title="Média de Streak"
            value={`${data?.avg_streak?.toFixed(1) || "0"} dias`}
            trend={{ value: 25, isPositive: true }}
            description="vs. último mês"
            icon={<FireIcon className="w-6 h-6" />}
          />
          <MetricCard
            title="Taxa de Abertura"
            value={`${data?.avg_opening_rate?.toFixed(1) || "0"}%`}
            trend={{ value: 5, isPositive: false }}
            description="Meta: 70%"
            icon={<EnvelopeOpenIcon className="w-6 h-6" />}
          />
          <MetricCard
            title="Leitores Ativos"
            value={data?.active_users || 0}
            trend={{ value: 8, isPositive: true }}
            description={`Últimos ${period} dias`}
            icon={<UserGroupIcon className="w-6 h-6" />}
          />
        </div>

        {/* Tabela de Top Leitores */}
        <div className="mb-8">
          <TopReadersTable readers={topReaders || []} />
        </div>

        {/* Área de gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-branco p-6 rounded-lg border border-cinza/20 shadow-sm">
            <h2 className="text-lg font-semibold text-marrom mb-6">
              Evolução de Streaks
            </h2>
            <StreakEvolutionChart data={historicalData} />
          </div>
          <div className="bg-branco p-6 rounded-lg border border-cinza/20 shadow-sm">
            <h2 className="text-lg font-semibold text-marrom mb-6">
              Taxa de Abertura por Dia
            </h2>
            <OpenRateChart data={historicalData} />
          </div>
        </div>
      </div>
    </div>
  );
}
