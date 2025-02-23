import { MetricCard } from "../components/MetricCard";
import { TopReadersTable } from "../components/TopReadersTable";
import { StreakEvolutionChart } from "../components/StreakEvolutionChart";
import { OpenRateChart } from "../components/OpenRateChart";
import { Icon } from "../components/Icons";
import { useState } from "react";
import { useAdminStats } from "../hooks/useAdminStats";
import { AdminStatsFilters, ApiError } from "../types/api";
import { useNavigate } from "react-router-dom";
import { format, subDays } from "date-fns";
import { FilterModal } from "../components/FilterModal";
import { Switch } from "@headlessui/react";
import { LocalFilters } from "../types/components/filters";

const getDefaultFilters = (): LocalFilters => ({
  startDate: format(subDays(new Date(), 7), "yyyy-MM-dd"),
  endDate: format(new Date(), "yyyy-MM-dd"),
  newsletterDate: "",
  minStreak: 0,
  useMockData: false,
});

export function Admin() {
  const navigate = useNavigate();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<LocalFilters>(getDefaultFilters());
  const [useMockData, setUseMockData] = useState(false);

  const { data, topReaders, historicalData, isLoading, error } = useAdminStats(
    {
      startDate: filters.startDate,
      endDate: filters.endDate,
      newsletterDate: filters.newsletterDate,
      minStreak: filters.minStreak,
    },
    useMockData
  );

  const handleResetFilters = () => {
    setFilters(getDefaultFilters());
    setIsFilterModalOpen(false);
  };

  const handleApplyFilters = (apiFilters: AdminStatsFilters) => {
    setFilters({
      ...filters,
      startDate: apiFilters.startDate,
      endDate: apiFilters.endDate,
      newsletterDate: apiFilters.newsletterDate,
      minStreak: apiFilters.minStreak,
    });
    setIsFilterModalOpen(false);
  };

  const handleToggleMockData = (enabled: boolean) => {
    setUseMockData(enabled);
    handleResetFilters();
  };

  if (error) {
    const apiError = error as ApiError;

    if (apiError.isAuthError) {
      navigate("/auth");
      return null;
    }

    return (
      <div className="min-h-screen bg-branco flex items-center justify-center">
        <div className="text-center">
          <Icon
            name="ExclamationTriangle"
            className="h-12 w-12 text-marrom mx-auto mb-4"
          />
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

  return (
    <div className="min-h-screen bg-branco">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-marrom">
            Painel Administrativo
          </h1>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Icon name="Filter" className="w-5 h-5" />
              <span>Filtros</span>
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
              <span className="text-sm font-medium text-marrom">
                Dados Mock
              </span>
              <Switch
                checked={useMockData}
                onChange={handleToggleMockData}
                className={`${
                  useMockData ? "bg-amarelo" : "bg-cinza/20"
                } relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amarelo focus:ring-offset-2`}
              >
                <span
                  className={`${
                    useMockData ? "translate-x-5" : "translate-x-1"
                  } inline-block h-3 w-3 transform rounded-full bg-branco transition-transform`}
                />
              </Switch>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="min-h-[500px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Icon
                name="ArrowCounterClockwise"
                className="w-12 h-12 text-amarelo animate-spin"
              />
              <span className="text-marrom">Carregando dados...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Total de Leitores"
                value={data?.total_users || 0}
                trend={{ value: 12, isPositive: true }}
                description="vs. mês anterior"
                icon={<Icon name="Users" />}
              />
              <MetricCard
                title="Média de Streak"
                value={`${data?.avg_streak?.toFixed(1) || "0"} dias`}
                trend={{ value: 25, isPositive: true }}
                description="vs. último mês"
                icon={<Icon name="Fire" />}
              />
              <MetricCard
                title="Taxa de Abertura"
                value={`${data?.avg_opening_rate?.toFixed(1) || "0"}%`}
                trend={{ value: 5, isPositive: false }}
                description="Meta: 70%"
                icon={<Icon name="EnvelopeOpen" />}
              />
              <MetricCard
                title="Leitores Ativos"
                value={data?.active_users || 0}
                trend={{ value: 8, isPositive: true }}
                description="Últimos 7 dias"
                icon={<Icon name="UserGroup" />}
              />
            </div>

            <div className="mb-8">
              <TopReadersTable readers={topReaders || []} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-branco p-6 rounded-lg border border-cinza/20 shadow-sm">
                <h2 className="text-lg font-semibold text-marrom mb-6">
                  Evolução de Streaks
                </h2>
                <StreakEvolutionChart
                  data={historicalData || []}
                  title="Evolução de Streaks"
                  dataKey="avg_streak"
                  yAxisLabel="Média de Streak"
                />
              </div>
              <div className="bg-branco p-6 rounded-lg border border-cinza/20 shadow-sm">
                <h2 className="text-lg font-semibold text-marrom mb-6">
                  Taxa de Abertura por Dia
                </h2>
                <OpenRateChart
                  data={historicalData || []}
                  title="Taxa de Abertura por Dia"
                  dataKey="opening_rate"
                  yAxisLabel="Taxa de Abertura (%)"
                  yAxisDomain={[0, 100]}
                />
              </div>
            </div>
          </>
        )}
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onApplyFilters={handleApplyFilters}
        onReset={handleResetFilters}
        loading={isLoading}
      />
    </div>
  );
}
