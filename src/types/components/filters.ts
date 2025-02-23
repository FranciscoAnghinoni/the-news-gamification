import { AdminStatsFilters } from "../api/index";

export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: AdminStatsFilters) => void;
  onReset: () => void;
  filters: LocalFilters;
  loading?: boolean;
}

export interface LocalFilters extends AdminStatsFilters {
  useMockData: boolean;
}
