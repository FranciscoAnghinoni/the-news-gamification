import { useState } from "react";
import { MotivationalMessage } from "../components/MotivationalMessage";
import { ReadingHistory } from "../components/ReadingHistory";
import { TopReaders } from "../components/TopReaders";
import { useNewsletterData } from "../hooks/useNewsletterData";
import { mockTopReaders } from "../mocks/topReaders";
import { StatsCard } from "../components/StatsCard";
import { Icon } from "../components/Icons";
import { TopReader } from "../types/api";

export default function Dashboard() {
  const [period] = useState(7);
  const { data: stats, isLoading, error } = useNewsletterData(period);

  const getTopReaders = (): TopReader[] => {
    if (!stats) return mockTopReaders;

    const currentUserRate = stats.opening_rate;
    const allReaders = [
      ...mockTopReaders.filter(
        (reader) => reader.email !== "current.user@example.com"
      ),
      {
        email: "current.user@example.com",
        opening_rate: currentUserRate,
        streak: stats.current_streak,
        last_read: stats.last_read_date,
      },
    ];

    // Ordenar por taxa de abertura e retornar apenas os 10 primeiros
    return allReaders
      .sort((a, b) => b.opening_rate - a.opening_rate)
      .slice(0, 10);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-branco flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amarelo" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-branco flex items-center justify-center">
        <div className="text-marrom">Erro ao carregar dados</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl font-bold mb-6 text-marrom">
        Dashboard do Leitor
      </h1>

      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard
                title="Sequência Atual"
                icon={<Icon name="Fire" />}
                gradient
              >
                <div className="text-3xl font-bold mb-2">
                  {stats?.current_streak || 0}{" "}
                  {stats?.current_streak === 1 ? "dia" : "dias"}
                </div>
                <div className="text-marrom/80 text-sm mt-auto">
                  Mantenha sua rotina!
                </div>
              </StatsCard>

              <StatsCard title="Maior Sequência" icon={<Icon name="Trophy" />}>
                <div className="text-3xl font-bold mb-2">
                  {stats?.highest_streak || 0}{" "}
                  {stats?.highest_streak === 1 ? "dia" : "dias"}
                </div>
                <div className="text-sm mt-auto text-marrom">
                  Seu melhor recorde!
                </div>
              </StatsCard>

              <StatsCard
                title="Estatísticas"
                icon={<Icon name="ChartBar" />}
                gradient
              >
                <div className="space-y-3 flex-grow">
                  <div className="flex items-center gap-2">
                    <Icon name="BookOpen" className="h-5 w-5 flex-shrink-0" />
                    <span className="truncate text-base">
                      <strong>{stats?.total_reads || 0}</strong> leituras
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="ChartBar" className="h-5 w-5 flex-shrink-0" />
                    <span className="truncate text-base">
                      <strong>{stats?.opening_rate?.toFixed(1) || "0"}%</strong>{" "}
                      taxa
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-auto text-sm text-marrom/80">
                  <Icon name="Calendar" className="h-5 w-5 flex-shrink-0" />
                  <span className="truncate">
                    Última:{" "}
                    <strong>
                      {new Date(
                        stats?.last_read_date || ""
                      ).toLocaleDateString()}
                    </strong>
                  </span>
                </div>
              </StatsCard>
            </div>
          </div>

          <div className="bg-branco rounded-xl shadow-lg border border-cinza/20 h-[140px] flex items-center w-full">
            <MotivationalMessage streak={stats?.current_streak || 0} />
          </div>

          <div className="bg-branco rounded-xl shadow-lg border border-cinza/20">
            <ReadingHistory history={stats?.history} days={7} />
          </div>
        </div>

        <div className="lg:col-span-4 h-full">
          <div className="sticky top-4 h-[calc(100vh-10rem)]">
            <TopReaders readers={getTopReaders()} />
          </div>
        </div>
      </div>
    </div>
  );
}
