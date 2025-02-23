import { MotivationalMessageProps } from "../types/components/stats";

export function MotivationalMessage({ streak }: MotivationalMessageProps) {
  const getMessage = () => {
    const currentStreak = streak ?? 0;

    if (currentStreak === 0) {
      return "Comece hoje sua jornada de leitura diária!";
    } else if (currentStreak < 3) {
      return `Você está há ${currentStreak} ${
        currentStreak === 1 ? "dia" : "dias"
      } seguidos lendo. Continue assim!`;
    } else if (currentStreak < 7) {
      return `Incrível! ${currentStreak} dias seguidos. Você está criando um ótimo hábito!`;
    } else if (currentStreak < 30) {
      return `Uau! ${currentStreak} dias de streak! Você é uma inspiração!`;
    } else {
      return `${currentStreak} dias! Você é uma lenda da leitura! Continue inspirando outros leitores!`;
    }
  };

  return (
    <div className="bg-gradient-to-r from-amarelo/10 to-amarelo/20 border border-amarelo/20 rounded-lg p-6 h-full w-full flex items-center justify-center">
      <div className="flex items-center gap-4 max-w-2xl">
        <div className="text-2xl flex-shrink-0">
          {(streak ?? 0) >= 7 ? "🏆" : (streak ?? 0) >= 3 ? "🔥" : "💪"}
        </div>
        <p className="text-marrom font-medium text-lg text-center">
          {getMessage()}
        </p>
      </div>
    </div>
  );
}
