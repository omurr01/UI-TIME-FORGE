import Link from 'next/link';
import {
  Clock,
  FileText,
  MessageSquare,
  CalendarDays,
  Users,
  DollarSign,
  BarChart2,
  Bell,
  UserPlus,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { QuickAction } from '../types';

const iconMap: Record<string, React.ElementType> = {
  Clock,
  FileText,
  MessageSquare,
  CalendarDays,
  Users,
  DollarSign,
  BarChart2,
  Bell,
  UserPlus,
  TrendingUp,
};

const colorConfig: Record<
  QuickAction['color'],
  { bg: string; icon: string; hover: string }
> = {
  blue: {
    bg: 'bg-primary/10',
    icon: 'text-primary',
    hover: 'hover:bg-primary/15 hover:border-primary/30',
  },
  green: {
    bg: 'bg-success/10',
    icon: 'text-success',
    hover: 'hover:bg-success/15 hover:border-success/30',
  },
  amber: {
    bg: 'bg-warning/10',
    icon: 'text-warning',
    hover: 'hover:bg-warning/15 hover:border-warning/30',
  },
  purple: {
    bg: 'bg-purple-500/10',
    icon: 'text-purple-500',
    hover: 'hover:bg-purple-500/15 hover:border-purple-500/30',
  },
};

interface QuickActionsProps {
  actions: QuickAction[];
  loading?: boolean;
}

export function QuickActions({ actions, loading }: QuickActionsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border p-4 animate-pulse h-20 bg-muted/40"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map((action) => {
        const Icon = iconMap[action.icon] ?? Clock;
        const colors = colorConfig[action.color];

        return (
          <Link
            key={action.href}
            href={action.href}
            className={cn(
              'group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-150',
              colors.hover
            )}
          >
            <div className={cn('rounded-lg p-2 shrink-0 transition-colors', colors.bg)}>
              <Icon size={16} className={colors.icon} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {action.label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {action.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
