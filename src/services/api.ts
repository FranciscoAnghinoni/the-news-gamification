import axios from "axios";

// Types
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
  totalUsers: number;
  averageStreak: number;
  maxStreak: number;
  totalReads: number;
  topReaders: {
    email: string;
    currentStreak: number;
    totalReads: number;
  }[];
}

// API client setup
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // Don't use withCredentials for local development
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// API service
export const api = {
  async createUser(username: string): Promise<{ userId: number }> {
    const response = await apiClient.post("/api/users", { username });
    console.log("response", response);
    return response.data;
  },

  async getUserStats(email: string): Promise<UserStats> {
    console.log(email);
    const response = await apiClient.get(`/api/stats?email=${email}`);
    if (!response.data) {
      throw new Error("Failed to get user stats");
    }
    return response.data;
  },

  async getAdminStats(): Promise<AdminStats> {
    const response = await apiClient.get("/api/admin/stats");
    if (!response.data) {
      throw new Error("Failed to get admin stats");
    }
    console.log("response", response);
    return response.data;
  },
};
