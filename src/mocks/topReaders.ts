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
  {
    email: "pedro.costa@example.com",
    opening_rate: 87.3,
    streak: 7,
    last_read: format(today, "yyyy-MM-dd"),
  },
  {
    email: "lucia.ferreira@example.com",
    opening_rate: 85.9,
    streak: 6,
    last_read: format(today, "yyyy-MM-dd"),
  },
  {
    email: "carlos.rodrigues@example.com",
    opening_rate: 83.4,
    streak: 5,
    last_read: format(today, "yyyy-MM-dd"),
  },
  {
    email: "beatriz.almeida@example.com",
    opening_rate: 81.2,
    streak: 4,
    last_read: format(today, "yyyy-MM-dd"),
  },
  {
    email: "rafael.martins@example.com",
    opening_rate: 79.8,
    streak: 3,
    last_read: format(today, "yyyy-MM-dd"),
  },
  {
    email: "isabela.lima@example.com",
    opening_rate: 77.5,
    streak: 2,
    last_read: format(today, "yyyy-MM-dd"),
  },
  {
    email: "gustavo.pereira@example.com",
    opening_rate: 75.2,
    streak: 1,
    last_read: format(today, "yyyy-MM-dd"),
  },
  {
    email: "camila.souza@example.com",
    opening_rate: 73.8,
    streak: 1,
    last_read: format(today, "yyyy-MM-dd"),
  },
];
