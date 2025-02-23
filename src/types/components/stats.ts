import { ReactNode } from "react";

export interface StatsCardProps {
  title: string;
  icon: ReactNode;
  gradient?: boolean;
  children: ReactNode;
}

export interface MotivationalMessageProps {
  streak: number | undefined;
}

export interface StreakCardProps {
  currentStreak: number | undefined;
}
