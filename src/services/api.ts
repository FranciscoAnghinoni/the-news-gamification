import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://backend.testeswaffle.org/webhooks/case",
});

export type NewsletterRead = {
  email: string;
  id: string; // post_{{resource_id}}
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_channel?: string;
  read_at: string;
};

export const api = {
  async getReads(period: number = 7): Promise<NewsletterRead[]> {
    const response = await apiClient.get("/fetch");
    return response.data;
  },

  async getPost(postId: string) {
    const response = await apiClient.get(`/publication/teste/post/${postId}`);
    return response.data;
  },

  async registerRead(email: string) {
    const response = await apiClient.get(`/fetch?=${email}`);
    return response.data;
  },
};

// Funções utilitárias para processar dados
export const processReadsData = (reads: NewsletterRead[]) => {
  const streaksByEmail = new Map<string, number>();
  const openRateByDay = new Map<string, { total: number; opened: number }>();

  reads.forEach((read) => {
    // Processa streaks
    const currentStreak = streaksByEmail.get(read.email) || 0;
    streaksByEmail.set(read.email, currentStreak + 1);

    // Processa taxa de abertura
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
