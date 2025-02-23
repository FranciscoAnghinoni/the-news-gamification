import { TopReader } from "../types/api";
import { format, subDays } from "date-fns";

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
    opening_rate: 89.4,
    streak: 8,
    last_read: format(subDays(today, 1), "yyyy-MM-dd"),
  },
  {
    email: "pedro.costa@example.com",
    opening_rate: 85.7,
    streak: 7,
    last_read: format(subDays(today, 1), "yyyy-MM-dd"),
  },
  {
    email: "carla.souza@example.com",
    opening_rate: 78.3,
    streak: 5,
    last_read: format(subDays(today, 2), "yyyy-MM-dd"),
  },
  {
    email: "roberto.lima@example.com",
    opening_rate: 65.9,
    streak: 4,
    last_read: format(subDays(today, 2), "yyyy-MM-dd"),
  },
  {
    email: "lucia.ferreira@example.com",
    opening_rate: 52.4,
    streak: 3,
    last_read: format(subDays(today, 3), "yyyy-MM-dd"),
  },
  {
    email: "bruno.santos@example.com",
    opening_rate: 45.8,
    streak: 2,
    last_read: format(subDays(today, 3), "yyyy-MM-dd"),
  },
  {
    email: "patricia.mendes@example.com",
    opening_rate: 32.1,
    streak: 1,
    last_read: format(subDays(today, 4), "yyyy-MM-dd"),
  },
];
