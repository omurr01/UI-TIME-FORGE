'use client';

import { motion } from 'framer-motion';
import {
  Users, UserCheck, UserPlus, Timer, FileText,
  ClipboardCheck, MessageSquare, TrendingUp,
  TrendingDown, Minus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AdminStatCard } from '@/features/admin/types';

const iconMap: Record<string, React.ElementType> = {
  Users, UserCheck, UserPlus, Timer, FileText,
  ClipboardCheck, MessageSquare, TrendingUp,
};

const colorConfig: Record<
  AdminStatCard['color'],
  { bg: string; icon: string }
> = {
  blue:   { bg: 'bg-primary/10',       icon: 'text-primary' },
  green:  { bg: 'bg-success/10',        icon: 'text-success' },
  amber:  { bg: 'bg-warning/10',        icon: 'text-warning' },
  red:    { bg: 'bg-destructive/10',    icon: 'text-destructive' },
  purple: { bg: 'bg-purple-500/10',     icon: 'text-purple-500' },
};

interface StatCardProps {
  stat: AdminStatCard;
  loading?: boolean;
}

export function StatCard({ stat, loading }: StatCardProps) {
  const Icon = iconMap[stat.icon] ?? TrendingUp;
  const colors = colorConfig[stat.color];

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-card p-5 animate-pulse">
        <div className="flex items-start justify-between">
          <div className="h-4 w-28 bg-muted rounded" />
          <div className="h-10 w-10 bg-muted rounded-lg" />
        </div>
        <div className="mt-3 h-8 w-20 bg-muted rounded" />
        <div className="mt-2 h-3 w-32 bg-muted rounded" />
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="rounded-xl border border-border bg-card p-5 cursor-default"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground leading-tight">
          {stat.title}
        </p>
        <div className={cn('rounded-lg p-2.5 shrink-0', colors.bg)}>
          <Icon size={18} className={colors.icon} />
        </div>
      </div>

      <p className="mt-3 text-2xl font-bold text-foreground tracking-tight">
        {stat.value}{stat.suffix}
      </p>

      {stat.change !== undefined && (
        <div className="mt-1.5 flex items-center gap-1.5">
          {stat.trend === 'up'      && <TrendingUp   size={13} className="text-success shrink-0" />}
          {stat.trend === 'down'    && <TrendingDown  size={13} className="text-destructive shrink-0" />}
          {stat.trend === 'neutral' && <Minus         size={13} className="text-muted-foreground shrink-0" />}
          <span className={cn(
            'text-xs font-medium',
            stat.trend === 'up'      && 'text-success',
            stat.trend === 'down'    && 'text-destructive',
            stat.trend === 'neutral' && 'text-muted-foreground',
          )}>
            {stat.change > 0 ? '+' : ''}{stat.change}%
          </span>
          {stat.changeLabel && (
            <span className="text-xs text-muted-foreground">{stat.changeLabel}</span>
          )}
        </div>
      )}
    </motion.div>
  );
}
