import { useState } from "react";
import { Icon } from "./Icons";
import { FilterModalProps, LocalFilters } from "../types/components/filters";

export function FilterModal({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onReset,
  loading = false,
}: FilterModalProps) {
  const [localFilters, setLocalFilters] = useState<LocalFilters>(filters);

  if (!isOpen) return null;

  const handleApply = () => {
    // Validar se a data da newsletter está dentro do intervalo
    if (localFilters.newsletterDate) {
      if (
        localFilters.newsletterDate < localFilters.startDate ||
        localFilters.newsletterDate > localFilters.endDate
      ) {
        alert(
          "A data da newsletter precisa estar dentro do intervalo de tempo selecionado"
        );
        return;
      }
    }

    onApplyFilters({
      startDate: localFilters.startDate,
      endDate: localFilters.endDate,
      newsletterDate: localFilters.newsletterDate,
      minStreak: localFilters.minStreak,
    });
  };

  const handleReset = () => {
    onReset();
    setLocalFilters({
      ...filters,
      newsletterDate: "",
      minStreak: 0,
      useMockData: filters.useMockData,
    });
  };

  return (
    <div
      className="fixed inset-0 bg-marrom/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-branco rounded-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-marrom">Filtros</h2>
          <button
            onClick={onClose}
            className="text-cinza hover:text-marrom transition-colors"
            disabled={loading}
          >
            <Icon name="XCircle" className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <label className="text-sm font-medium text-marrom">
                Intervalo de Tempo
              </label>
              <span className="text-xs px-2 py-0.5 bg-amarelo/20 text-marrom rounded-full">
                Principal
              </span>
            </div>
            <p className="text-xs text-cinza mb-2">
              Define o período geral para análise dos dados
            </p>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-cinza/20 rounded-lg bg-branco text-marrom focus:outline-none focus:ring-2 focus:ring-amarelo text-sm disabled:bg-cinza/10 disabled:cursor-not-allowed"
                  value={localFilters.startDate}
                  onChange={(e) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                  disabled={loading}
                />
                <Icon
                  name="Calendar"
                  className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-cinza"
                />
              </div>
              <div className="flex-1 relative">
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-cinza/20 rounded-lg bg-branco text-marrom focus:outline-none focus:ring-2 focus:ring-amarelo text-sm disabled:bg-cinza/10 disabled:cursor-not-allowed"
                  value={localFilters.endDate}
                  onChange={(e) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                  disabled={loading}
                />
                <Icon
                  name="Calendar"
                  className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-cinza"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <label className="text-sm font-medium text-marrom">
                Data da Newsletter
              </label>
              <span className="text-xs px-2 py-0.5 bg-cinza/20 text-marrom rounded-full">
                Opcional
              </span>
            </div>
            <p className="text-xs text-cinza mb-2">
              Filtra uma newsletter específica dentro do intervalo selecionado
            </p>
            <div className="relative">
              <input
                type="date"
                placeholder="Selecione uma data específica"
                className="w-full px-3 py-2 border border-cinza/20 rounded-lg bg-branco text-marrom focus:outline-none focus:ring-2 focus:ring-amarelo text-sm disabled:bg-cinza/10 disabled:cursor-not-allowed"
                value={localFilters.newsletterDate}
                min={localFilters.startDate}
                max={localFilters.endDate}
                onChange={(e) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    newsletterDate: e.target.value,
                  }))
                }
                disabled={loading}
              />
              <Icon
                name="Calendar"
                className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-cinza"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <label className="text-sm font-medium text-marrom">
                Status do Streak
              </label>
              <span className="text-xs px-2 py-0.5 bg-cinza/20 text-marrom rounded-full">
                Opcional
              </span>
            </div>
            <p className="text-xs text-cinza mb-2">
              Filtra usuários com base no streak mínimo
            </p>
            <select
              className="w-full px-3 py-2 border border-cinza/20 rounded-lg bg-branco text-marrom focus:outline-none focus:ring-2 focus:ring-amarelo text-sm disabled:bg-cinza/10 disabled:cursor-not-allowed"
              value={localFilters.minStreak}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  minStreak: parseInt(e.target.value),
                }))
              }
              disabled={loading}
            >
              <option value={0}>Todos os usuários</option>
              <option value={1}>Streak ativo (≥ 1)</option>
              <option value={3}>Streak ≥ 3 dias</option>
              <option value={7}>Streak ≥ 7 dias</option>
              <option value={30}>Streak ≥ 30 dias</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-marrom hover:bg-vermelho/10 transition-colors text-sm flex items-center gap-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            <Icon name="ArrowCounterClockwise" className="w-4 h-4" />
            Resetar Filtros
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-marrom hover:bg-cinza/10 rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-amarelo text-marrom rounded-lg hover:bg-amarelo/90 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[120px] justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Icon
                    name="ArrowCounterClockwise"
                    className="w-4 h-4 animate-spin"
                  />
                  <span>Aplicando...</span>
                </>
              ) : (
                "Aplicar Filtros"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
