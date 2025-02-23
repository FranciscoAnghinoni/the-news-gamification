import type { TopReader } from "../types/api";
import { format } from "date-fns";

const today = new Date();

export const mockTopReaders: TopReader[] = [
  {
    email: "maria.silva@example.com",
    opening_rate: 98.5,
    streak: 14,
    last_read: format(today, "yyyy-MM-dd"),
  },
  {
    email: "joao.santos@example.com",
    opening_rate: 95.2,
    streak: 12,
    last_read: format(today, "yyyy-MM-dd"),
  },
  {
    email: "ana.oliveira@example.com",
    opening_rate: 92.8,
    streak: 10,
    last_read: format(today, "yyyy-MM-dd"),
  },
  {
    email: "current.user@example.com",
    opening_rate: 88.5,
    streak: 8,
    last_read: format(today, "yyyy-MM-dd"),
  },
];
