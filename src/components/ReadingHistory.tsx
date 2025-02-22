import { Icon } from "./Icons";
import { ReadingHistoryProps } from "../types/components/readers";

export function ReadingHistory({
  history = [],
  days = 7,
}: ReadingHistoryProps) {
  const getDaysArray = () => {
    const today = new Date();
    const brazilianDate = new Date(today.getTime() - 3 * 60 * 60 * 1000);
    brazilianDate.setHours(0, 0, 0, 0);

    const daysArray = Array.from({ length: days }, (_, i) => {
      const date = new Date(brazilianDate);
      date.setDate(brazilianDate.getDate() - (days - 1) + i);
      const isoDate = date.toISOString().split("T")[0];
      return isoDate;
    });

    return daysArray;
  };

  const lastDays = getDaysArray();
  const readDays = new Set(
    history.map((item) => {
      return item.date.split("T")[0];
    })
  );

  return (
    <div className="bg-white rounded-xl p-6 border border-[#615A5A]/20">
      <h2 className="text-lg font-semibold mb-6 text-[#240E0B]">
        Histórico de Leituras
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {lastDays.map((date) => {
          const isRead = readDays.has(date);
          const formattedDate = new Date(date + "T00:00:00").toLocaleDateString(
            "pt-BR",
            {
              weekday: "short",
              day: "numeric",
            }
          );

          return (
            <div
              key={date}
              className={`flex flex-col items-center p-4 rounded-lg ${
                isRead ? "bg-[#FFCE04]/10" : "bg-[#615A5A]/10"
              }`}
            >
              <div className="text-sm text-[#615A5A] mb-2">{formattedDate}</div>
              <Icon
                name={isRead ? "CheckCircle" : "XCircle"}
                className={`h-8 w-8 ${
                  isRead ? "text-[#FFCE04]" : "text-[#615A5A]"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
