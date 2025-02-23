import { TopReader } from "../api";

export interface TopReadersProps {
  readers: TopReader[];
}

export interface TopReadersTableProps {
  readers: TopReader[];
}

export interface ReadingHistoryProps {
  history?: Array<{
    date: string;
    read: boolean;
  }>;
  days?: number;
}
