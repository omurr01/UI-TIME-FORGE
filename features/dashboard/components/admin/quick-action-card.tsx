'use client';

import Link from 'next/link';
import {
  UserPlus,
  UserCheck,
  BarChart2,
  DollarSign,
  Bell,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { QuickAction } from '../../types/admin';

const ICON_MAP: Record<string, LucideIcon> = {
  UserPlus,
  UserCheck,
  BarChart2,
  DollarSign,
  Bell,
  Settings,
};

const COLOR_HOVER_BORDER: Record<string, string> = {
  blue: 'hover:border-blue-400 dark:hover:border-blue-500',
  green: 'hover:border-green-400 dark:hover:border-green-500',
  amber: 'hover:border-amber-400 dark:hover:border-amber-500',
  red: 'hover:border-red-400 dark:hover:border-red-500',
  purple: 'hover:border-purple-400 dark:hover:border-purple-500',
};

const COLOR_HOVER_BG: Record<string, string> = {
  blue: 'hover:bg-blue-500/5',
  green: 'hover:bg-green-500/5',
  amber: 'hover:bg-amber-500/5',
  red: 'hover:bg-red-500/5',
  purple: 'hover:bg-purple-500/5',
};

const COLOR_ICON_BG: Record<string, string> = {
  blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  green: 'bg-green-500/10 text-green-600 dark:text-green-400',
  amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  red: 'bg-red-500/10 text-red-600 dark:text-red-400',
  purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
};

interface QuickActionCardProps {
  action: QuickAction;
  loading?: boolean;
}

export function QuickActionCard({ action, loading }: QuickActionCardProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-card p-4 animate-pulse space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-muted" />
          <div className="h-4 w-28 bg-muted rounded" />
        </div>
        <div className="h-3 w-full bg-muted rounded" />
      </div>
    );
  }

  const Icon = ICON_MAP[action.icon] ?? Bell;

  return (
    <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
      <Link
        href={action.href}
        className={cn(
          'flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors duration-200',
          COLOR_HOVER_BORDER[action.color],
          COLOR_HOVER_BG[action.color]
        )}
        aria-label={`${action.label}: ${action.description}`}
      >
        <div
          className={cn(
            'shrink-0 p-2.5 rounded-lg',
            COLOR_ICON_BG[action.color]
          )}
          aria-hidden="true"
        >
          <Icon size={18} strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{action.label}</p>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
            {action.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
