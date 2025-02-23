import { StreakCardProps } from "../types/components/stats";

export function StreakCard({ currentStreak }: StreakCardProps) {
  return (
    <div className="p-5 shadow-md border rounded-lg">
      <div className="text-center">
        <h3 className="text-xl text-gray-600">Seu Streak Atual</h3>
        <p className="text-4xl font-bold my-2">{currentStreak} dias</p>
        <p className="text-gray-500">
          Mantenha seu streak abrindo a newsletter diariamente!
        </p>
      </div>
    </div>
  );
}
