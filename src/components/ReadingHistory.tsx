import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface ReadingHistoryProps {
  history?: Array<{
    date: string;
    post_id: string;
  }>;
  days?: number;
}

export function ReadingHistory({
  history = [],
  days = 7,
}: ReadingHistoryProps) {
  // Generate array of last n days in ascending order (oldest to newest)
  const getDaysArray = () => {
    // Get current date in Brazilian timezone
    const today = new Date();
    // Adjust for Brazilian timezone (UTC-3)
    const brazilianDate = new Date(today.getTime() - 3 * 60 * 60 * 1000);
    brazilianDate.setHours(0, 0, 0, 0);

    console.log("Today UTC:", today.toISOString());
    console.log("Brazilian today:", brazilianDate.toISOString());

    const daysArray = Array.from({ length: days }, (_, i) => {
      const date = new Date(brazilianDate);
      date.setDate(brazilianDate.getDate() - (days - 1) + i);
      const isoDate = date.toISOString().split("T")[0];
      console.log(`Day ${i + 1}:`, isoDate);
      return isoDate;
    });

    return daysArray;
  };

  const lastDays = getDaysArray();
  const readDays = new Set(
    history.map((item) => {
      console.log("Read day from history:", item.date);
      return item.date.split("T")[0];
    })
  );

  console.log("All read days:", Array.from(readDays));
  console.log("Days to display:", lastDays);

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
              {isRead ? (
                <CheckCircleIcon className="h-8 w-8 text-[#FFCE04]" />
              ) : (
                <XCircleIcon className="h-8 w-8 text-[#615A5A]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
