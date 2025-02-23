import React from "react";
import {
  UsersIcon,
  FireIcon,
  EnvelopeOpenIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  TrophyIcon,
  BookOpenIcon,
  ChartBarIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  FunnelIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const Icons = {
  Users: UsersIcon,
  Fire: FireIcon,
  EnvelopeOpen: EnvelopeOpenIcon,
  UserGroup: UserGroupIcon,
  ExclamationTriangle: ExclamationTriangleIcon,
  Trophy: TrophyIcon,
  BookOpen: BookOpenIcon,
  ChartBar: ChartBarIcon,
  Calendar: CalendarIcon,
  CheckCircle: CheckCircleIcon,
  XCircle: XCircleIcon,
  UserCircle: UserCircleIcon,
  MagnifyingGlass: MagnifyingGlassIcon,
  ArrowUp: ArrowUpIcon,
  ArrowDown: ArrowDownIcon,
  Filter: FunnelIcon,
  ArrowCounterClockwise: ArrowPathIcon,
} as const;

export { Icons };

type IconName = keyof typeof Icons;

interface IconProps {
  name: IconName;
  className?: string;
}

export function Icon({ name, className = "w-6 h-6" }: IconProps) {
  const IconComponent = Icons[name];
  return <IconComponent className={className} />;
}
