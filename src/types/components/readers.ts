export interface Reader {
  name: string;
  openRate: number;
  streak: number;
}

export interface TopReadersProps {
  readers?: Reader[];
}

export interface TopReadersTableProps {
  readers: Array<{
    email: string;
    streak: number;
    opening_rate: number;
    last_read: string;
  }>;
}

export interface ReadingHistoryProps {
  history?: Array<{
    date: string;
    post_id: string;
  }>;
  days?: number;
}
