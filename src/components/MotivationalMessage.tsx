interface MotivationalMessageProps {
  streak: number;
}

export function MotivationalMessage({ streak }: MotivationalMessageProps) {
  const getMessage = () => {
    if (streak === 0) {
      return "Comece hoje sua jornada de leitura diária!";
    } else if (streak < 3) {
      return `Você está há ${streak} ${
        streak === 1 ? "dia" : "dias"
      } seguidos lendo. Continue assim!`;
    } else if (streak < 7) {
      return `Incrível! ${streak} dias seguidos. Você está criando um ótimo hábito!`;
    } else if (streak < 30) {
      return `Uau! ${streak} dias de streak! Você é uma inspiração!`;
    } else {
      return `${streak} dias! Você é uma lenda da leitura! Continue inspirando outros leitores!`;
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-6 mb-8">
      <div className="flex items-center gap-4">
        <div className="text-2xl">
          {streak >= 7 ? "🏆" : streak >= 3 ? "🔥" : "💪"}
        </div>
        <p className="text-blue-800 font-medium text-lg">{getMessage()}</p>
      </div>
    </div>
  );
}
