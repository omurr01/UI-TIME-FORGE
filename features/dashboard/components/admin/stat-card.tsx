'use client';

import {
  Users,
  UserCheck,
  UserPlus,
  Timer,
  FileText,
  ClipboardList,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Minus,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { StatCardSkeleton } from '@/components/shared/loading-skeleton';
import type { AdminStat } from '../../types/admin';

// ─── Icon Map ──────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  Users,
  UserCheck,
  UserPlus,
  Timer,
  FileText,
  ClipboardList,
  MessageSquare,
  TrendingUp,
};

// ─── Color Maps ───────────────────────────────────────────────────────────────

const COLOR_BG: Record<string, string> = {
  blue: 'bg-blue-500/10 dark:bg-blue-500/15',
  green: 'bg-green-500/10 dark:bg-green-500/15',
  amber: 'bg-amber-500/10 dark:bg-amber-500/15',
  red: 'bg-red-500/10 dark:bg-red-500/15',
  purple: 'bg-purple-500/10 dark:bg-purple-500/15',
};

const COLOR_ICON: Record<string, string> = {
  blue: 'text-blue-600 dark:text-blue-400',
  green: 'text-green-600 dark:text-green-400',
  amber: 'text-amber-600 dark:text-amber-400',
  red: 'text-red-600 dark:text-red-400',
  purple: 'text-purple-600 dark:text-purple-400',
};

// ─── Component ────────────────────────────────────────────────────────────────

interface StatCardProps {
  stat: AdminStat;
  loading?: boolean;
}

export function StatCard({ stat, loading }: StatCardProps) {
  if (loading) return <StatCardSkeleton />;

  const Icon = ICON_MAP[stat.icon] ?? Users;

  const trendIcon =
    stat.trend === 'up' ? (
      <TrendingUp size={12} className="text-green-500" />
    ) : stat.trend === 'down' ? (
      <TrendingDown size={12} className="text-red-500" />
    ) : (
      <Minus size={12} className="text-muted-foreground" />
    );

  const trendText =
    stat.change != null
      ? `${stat.change > 0 ? '+' : ''}${stat.change}% ${stat.changeLabel ?? ''}`
      : stat.changeLabel ?? 'No change';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="rounded-xl border border-border bg-card p-5 space-y-3 relative overflow-hidden"
    >
      {stat.badge === 'important' && (
        <span className="absolute top-3 right-3 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
          Action needed
        </span>
      )}

      <div className="flex items-start justify-between">
        <p className="text-sm text-muted-foreground font-medium leading-tight pr-2">
          {stat.title}
        </p>
        <div
          className={cn(
            'shrink-0 p-2 rounded-lg',
            COLOR_BG[stat.color] ?? COLOR_BG.blue
          )}
          aria-hidden="true"
        >
          <Icon
            size={18}
            className={cn(COLOR_ICON[stat.color] ?? COLOR_ICON.blue)}
            strokeWidth={2}
          />
        </div>
      </div>

      <p className="text-2xl font-bold text-foreground tabular-nums">{stat.value}</p>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {trendIcon}
        <span>{trendText}</span>
      </div>
    </motion.div>
  );
}
