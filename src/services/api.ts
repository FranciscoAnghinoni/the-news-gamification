import axios, { AxiosError } from "axios";

export interface UserStats {
  current_streak: number;
  highest_streak: number;
  total_reads: number;
  last_read_date: string;
  opening_rate: number;
  sources: string[] | null;
  history: Array<{
    date: string;
    post_id: string;
  }>;
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
  newsletterDate?: string;
  minStreak?: number;
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
  constructor(
    message: string,
    public status: number,
    public isAuthError: boolean = false
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// API client setup
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const handleApiError = (error: AxiosError) => {
  if (error.response) {
    const status = error.response.status;
    if (status === 401) {
      throw new ApiError(
        "Não autenticado. Por favor, faça login novamente.",
        status,
        true
      );
    }
    if (status === 403) {
      throw new ApiError(
        "Você não tem permissão para acessar este recurso.",
        status,
        true
      );
    }
    if (status === 500) {
      throw new ApiError(
        "Erro interno do servidor. Tente novamente mais tarde.",
        status
      );
    }
  }
  throw new ApiError("Erro ao conectar com o servidor.", 500);
};

// API service
export const api = {
  async createUser(username: string): Promise<{ userId: number }> {
    try {
      const response = await apiClient.post("/api/users", { username });
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },

  async getUserStats(email: string): Promise<UserStats> {
    try {
      const response = await apiClient.get(`/api/stats?email=${email}`);
      if (!response.data) {
        throw new ApiError("Dados não encontrados", 404);
      }
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },

  async getAdminStats(filters: AdminStatsFilters): Promise<AdminStats> {
    try {
      const response = await apiClient.get(`/api/stats/admin`, {
        params: filters,
      });
      if (!response.data) {
        throw new ApiError("Dados não encontrados", 404);
      }
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },

  async getTopReaders(filters: AdminStatsFilters): Promise<TopReader[]> {
    try {
      const response = await apiClient.get(`/api/stats/admin/top-readers`, {
        params: filters,
      });
      console.log(response.data);
      if (!response.data) {
        throw new ApiError("Dados não encontrados", 404);
      }
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },

  async getHistoricalStats(
    filters: AdminStatsFilters
  ): Promise<HistoricalStats> {
    try {
      const response = await apiClient.get(`/api/stats/admin/historical`, {
        params: filters,
      });

      if (!response.data) {
        throw new ApiError("Dados não encontrados", 404);
      }
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },
};
