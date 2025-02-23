export interface UserStats {
  current_streak: number;
  highest_streak: number;
  total_reads: number;
  last_read_date: string;
  opening_rate: number;
  sources: string[];
  history: {
    date: string;
    read: boolean;
  }[];
}

export interface AdminStats {
  total_users: number;
  avg_streak: number;
  avg_opening_rate: number;
  active_users: number;
}

export interface AdminStatsFilters {
  startDate: string;
  endDate: string;
  newsletterDate: string;
  minStreak: number;
}

export interface TopReader {
  email: string;
  streak: number;
  opening_rate: number;
  last_read: string;
}

export interface DailyStats {
  date: string;
  avg_streak: number;
  opening_rate: number;
}

export interface HistoricalStats {
  daily_stats: DailyStats[];
}

export class ApiError extends Error {
  status: number;
  isAuthError: boolean;

  constructor(message: string, status: number, isAuthError = false) {
    super(message);
    this.status = status;
    this.isAuthError = isAuthError;
  }
}
