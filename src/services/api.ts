import axios from "axios";

// Types
export interface NewsletterRead {
  email: string;
  id: string; // post_{{resource_id}}
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_channel?: string;
  read_at: string;
}

export interface ReadingStats {
  userId: number;
  pagesRead: number;
}

export interface UserStats {
  currentStreak: number;
  highestStreak: number;
  totalReads: number;
  lastReadDate: string;
  readingSources: string[];
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
  async recordRead(
    email: string,
    postId: string,
    utmParams?: {
      source?: string;
      medium?: string;
      campaign?: string;
      channel?: string;
    }
  ): Promise<boolean> {
    const params = new URLSearchParams({
      email,
      id: postId,
      ...(utmParams?.source && { utm_source: utmParams.source }),
      ...(utmParams?.medium && { utm_medium: utmParams.medium }),
      ...(utmParams?.campaign && { utm_campaign: utmParams.campaign }),
      ...(utmParams?.channel && { utm_channel: utmParams.channel }),
    });

    const response = await apiClient.get(`/?${params}`);
    return response.status === 200;
  },

  // async recordReading(
  //   userId: number,
  //   pagesRead: number
  // ): Promise<{ id: number }> {
  //   const response = await apiClient.post("/api/reading", {
  //     userId,
  //     pagesRead,
  //   });
  //   return response.data;
  // },

  async createUser(username: string): Promise<{ userId: number }> {
    const response = await apiClient.post("/api/users", { username });
    console.log("response", response);
    return response.data;
  },

  async getUserStats(userId: string): Promise<UserStats> {
    const response = await apiClient.get(`/api/stats?userId=${userId}`);
    if (!response.data) {
      throw new Error("Failed to get user stats");
    }
    console.log("response", response);
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



  async testSpecificEndpoint(): Promise<void> {
    try {
      // Test read recording
      const readResult = await this.recordRead(
        "test@example.com",
        "test_post_1",
        {
          source: "test",
          medium: "email",
        }
      );
      console.log("Read registration test:", readResult);

      // Test user stats
      const statsResult = await this.getUserStats("1");
      console.log("User stats test:", statsResult);

      // Test admin stats
      const adminResult = await this.getAdminStats();
      console.log("Admin stats test:", adminResult);
    } catch (error) {
      console.error("Test failed:", error);
      throw error;
    }
  },
};

// Utility functions for processing data
export const processReadsData = (reads: NewsletterRead[]) => {
  const streaksByEmail = new Map<string, number>();
  const openRateByDay = new Map<string, { total: number; opened: number }>();

  reads.forEach((read) => {
    // Process streaks
    const currentStreak = streaksByEmail.get(read.email) || 0;
    streaksByEmail.set(read.email, currentStreak + 1);

    // Process open rate
    const date = new Date(read.read_at).toLocaleDateString();
    const dayStats = openRateByDay.get(date) || { total: 0, opened: 0 };
    openRateByDay.set(date, {
      total: dayStats.total + 1,
      opened: dayStats.opened + 1,
    });
  });

  return {
    streaksByEmail,
    openRateByDay,
  };
};
