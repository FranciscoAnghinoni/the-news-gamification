import { useState } from "react";
import { MotivationalMessage } from "../components/MotivationalMessage";
import { ReadingHistory } from "../components/ReadingHistory";
import { TopReaders } from "../components/TopReaders";
import { useNewsletterData } from "../hooks/useNewsletterData";
import { mockTopReaders } from "../mocks/topReaders";
import {
  FireIcon,
  TrophyIcon,
  BookOpenIcon,
  ChartBarIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

export function Dashboard() {
  const [period] = useState(7);
  const { data: stats, isLoading, error } = useNewsletterData(period);

  // Function to get top 5 readers including current user
  const getTopReaders = () => {
    if (!stats) return mockTopReaders;

    const currentUserRate = stats.opening_rate;
    const allReaders = [
      ...mockTopReaders.filter((reader) => reader.name !== "Você"),
      {
        name: "Você",
        openRate: currentUserRate,
        streak: stats.current_streak,
      },
    ];

    // Sort by opening rate descending
    return allReaders.sort((a, b) => b.openRate - a.openRate);
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
        {/* Main Content Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Top Stats Row */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Current Streak Card */}
              <div className="bg-gradient-to-br from-amarelo to-amarelo/90 rounded-xl p-6 text-marrom shadow-lg hover:scale-105 transition-transform flex flex-col h-[200px]">
                <div className="flex items-center gap-2 mb-3">
                  <FireIcon className="h-6 w-6 flex-shrink-0" />
                  <h2 className="text-lg font-semibold truncate">
                    Sequência Atual
                  </h2>
                </div>
                <div className="text-3xl font-bold mb-2">
                  {stats?.current_streak || 0}{" "}
                  {stats?.current_streak === 1 ? "dia" : "dias"}
                </div>
                <div className="text-marrom/80 text-sm mt-auto">
                  Mantenha sua rotina!
                </div>
              </div>

              {/* Highest Streak Card */}
              <div className="bg-amarelo rounded-xl p-6 text-marrom  shadow-lg hover:scale-105 transition-transform flex flex-col h-[200px]">
                <div className="flex items-center gap-2 mb-3">
                  <TrophyIcon className="h-6 w-6 flex-shrink-0" />
                  <h2 className="text-lg font-semibold truncate">
                    Maior Sequência
                  </h2>
                </div>
                <div className="text-3xl font-bold mb-2">
                  {stats?.highest_streak || 0}{" "}
                  {stats?.highest_streak === 1 ? "dia" : "dias"}
                </div>
                <div className="text-sm mt-auto  text-marrom ">
                  Seu melhor recorde!
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-gradient-to-br from-amarelo to-amarelo/90 rounded-xl p-6 text-marrom shadow-lg hover:scale-105 transition-transform flex flex-col h-[200px]">
                <div className="flex items-center gap-2 mb-3">
                  <ChartBarIcon className="h-6 w-6 flex-shrink-0" />
                  <h2 className="text-lg font-semibold truncate">
                    Estatísticas
                  </h2>
                </div>
                <div className="space-y-3 flex-grow">
                  <div className="flex items-center gap-2">
                    <BookOpenIcon className="h-5 w-5 flex-shrink-0" />
                    <span className="truncate text-base">
                      <strong>{stats?.total_reads || 0}</strong> leituras
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChartBarIcon className="h-5 w-5 flex-shrink-0" />
                    <span className="truncate text-base">
                      <strong>{stats?.opening_rate?.toFixed(1) || "0"}%</strong>{" "}
                      taxa
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-auto text-sm text-marrom/80">
                  <CalendarIcon className="h-5 w-5 flex-shrink-0" />
                  <span className="truncate">
                    Última:{" "}
                    <strong>
                      {new Date(
                        stats?.last_read_date || ""
                      ).toLocaleDateString()}
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row - Motivational Message */}
          <div className="bg-branco rounded-xl shadow-lg border border-cinza/20 h-[140px] flex items-center w-full">
            <MotivationalMessage streak={stats?.current_streak || 0} />
          </div>

          {/* Reading History */}
          <div className="bg-branco rounded-xl shadow-lg border border-cinza/20">
            <ReadingHistory history={stats?.history} days={7} />
          </div>
        </div>

        {/* Right Column - Ranking */}
        <div className="lg:col-span-4 h-full">
          <div className="sticky top-4 h-[calc(100vh-10rem)]">
            <TopReaders readers={getTopReaders()} />
          </div>
        </div>
      </div>
    </div>
  );
}
