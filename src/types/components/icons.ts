export interface IconProps {
  name: IconName;
  className?: string;
}

// @ts-expect-error: Suppress unused type error
export type IconName =
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
