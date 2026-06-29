import {
  Clock,
  FileText,
  CalendarDays,
  CheckSquare,
  Users,
  AlertCircle,
  DollarSign,
  CheckCircle,
  UserPlus,
  Activity,
  Monitor,
  BarChart2,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DashboardStats } from '../types';

const iconMap: Record<string, React.ElementType> = {
  Clock,
  FileText,
  CalendarDays,
  CheckSquare,
  Users,
  AlertCircle,
  DollarSign,
  CheckCircle,
  UserPlus,
  Activity,
  Monitor,
  BarChart2,
  TrendingUp,
};

const colorConfig: Record<
  DashboardStats['color'],
  { bg: string; icon: string; badge: string }
> = {
  blue: {
    bg: 'bg-primary/10',
    icon: 'text-primary',
    badge: 'text-primary bg-primary/10',
  },
  green: {
    bg: 'bg-success/10',
    icon: 'text-success',
    badge: 'text-success bg-success/10',
  },
  amber: {
    bg: 'bg-warning/10',
    icon: 'text-warning',
    badge: 'text-warning bg-warning/10',
  },
  red: {
    bg: 'bg-destructive/10',
    icon: 'text-destructive',
    badge: 'text-destructive bg-destructive/10',
  },
  purple: {
    bg: 'bg-purple-500/10',
    icon: 'text-purple-500',
    badge: 'text-purple-500 bg-purple-500/10',
  },
};

interface StatCardProps {
  stat: DashboardStats;
  loading?: boolean;
}

export function StatCard({ stat, loading }: StatCardProps) {
  const Icon = iconMap[stat.icon] ?? Clock;
  const colors = colorConfig[stat.color];

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-card p-5 animate-pulse">
        <div className="flex items-start justify-between">
          <div className="h-4 w-28 bg-muted rounded" />
          <div className="h-10 w-10 bg-muted rounded-lg" />
        </div>
        <div className="mt-3 h-8 w-20 bg-muted rounded" />
        <div className="mt-2 h-3 w-24 bg-muted rounded" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow duration-200">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground leading-tight">
          {stat.label}
        </p>
        <div className={cn('rounded-lg p-2.5 shrink-0', colors.bg)}>
          <Icon size={18} className={colors.icon} />
        </div>
      </div>

      <p className="mt-3 text-2xl font-bold text-foreground tracking-tight">
        {stat.value}
      </p>

      {stat.change !== undefined && (
        <div className="mt-1.5 flex items-center gap-1.5">
          {stat.trend === 'up' && (
            <TrendingUp size={13} className="text-success shrink-0" />
          )}
          {stat.trend === 'down' && (
            <TrendingDown size={13} className="text-destructive shrink-0" />
          )}
          {stat.trend === 'neutral' && (
            <Minus size={13} className="text-muted-foreground shrink-0" />
          )}
          <span
            className={cn(
              'text-xs font-medium',
              stat.trend === 'up' && 'text-success',
              stat.trend === 'down' && 'text-destructive',
              stat.trend === 'neutral' && 'text-muted-foreground'
            )}
          >
            {stat.change > 0 ? '+' : ''}
            {stat.change}%
          </span>
          {stat.changeLabel && (
            <span className="text-xs text-muted-foreground">{stat.changeLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
