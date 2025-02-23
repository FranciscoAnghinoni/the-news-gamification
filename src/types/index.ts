export * from "./api/index";
export * from "./auth";
export * from "./components/metrics";
export * from "./components/readers";

export interface TopReader {
  name: string;
  openRate: number;
  position: number;
  email?: string;
  streak?: number;
  last_read?: string;
}

export interface IconProps {
  name:
    | "Users"
    | "Fire"
    | "EnvelopeOpen"
    | "UserGroup"
    | "ExclamationTriangle"
    | "Trophy"
    | "BookOpen"
    | "ChartBar"
    | "Calendar"
    | "CheckCircle"
    | "XCircle"
    | "UserCircle"
    | "MagnifyingGlass"
    | "ArrowUp"
    | "ArrowDown"
    | "Filter"
    | "ArrowCounterClockwise";
  className?: string;
}
