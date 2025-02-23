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
import type { IconProps, IconName } from "../types/components/icons";

const Icons: Record<IconName, React.ComponentType<{ className: string }>> = {
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
};

export { Icons };
export function Icon({ name, className = "w-6 h-6" }: IconProps) {
  const IconComponent = Icons[name];
  return <IconComponent className={className} />;
}
