'use client';

import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { ActivitySkeleton } from '@/components/shared/loading-skeleton';
import type { AdminActivity, ActivityStatus } from '../../types/admin';

// ─── Status badge colours ─────────────────────────────────────────────────────

const STATUS_BADGE: Record<ActivityStatus, string> = {
  success: 'bg-green-500/10 text-green-700 dark:text-green-400',
  warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  error: 'bg-red-500/10 text-red-700 dark:text-red-400',
  info: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
};

const STATUS_LABEL: Record<ActivityStatus, string> = {
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
  info: 'Info',
};

const STATUS_DOT: Record<ActivityStatus, string> = {
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
};

// ─── Component ────────────────────────────────────────────────────────────────

interface ActivityTimelineProps {
  items: AdminActivity[];
  loading?: boolean;
}

export function ActivityTimeline({ items, loading }: ActivityTimelineProps) {
  if (loading) return <ActivitySkeleton rows={4} />;

  return (
    <ol className="space-y-0" aria-label="Activity timeline">
      {items.map((item, idx) => (
        <li key={item.id} className="flex gap-3 relative">
          {/* Connector line */}
          {idx < items.length - 1 && (
            <div
              className="absolute left-[14px] top-7 bottom-0 w-px bg-border"
              aria-hidden="true"
            />
          )}

          {/* Avatar */}
          <div
            className={cn(
              'shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white z-10',
              item.actor.avatarColor
            )}
            aria-hidden="true"
          >
            {item.actor.initials}
          </div>

          {/* Content */}
          <div className="flex-1 pb-5 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm text-foreground leading-snug">
                  <span className="font-semibold">{item.actor.name}</span>{' '}
                  {item.description}
                  {item.meta && (
                    <span className="text-muted-foreground"> — {item.meta}</span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                </p>
              </div>

              {/* Status badge */}
              <span
                className={cn(
                  'shrink-0 inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full',
                  STATUS_BADGE[item.status]
                )}
                aria-label={`Status: ${STATUS_LABEL[item.status]}`}
              >
                <span
                  className={cn('w-1.5 h-1.5 rounded-full', STATUS_DOT[item.status])}
                  aria-hidden="true"
                />
                {STATUS_LABEL[item.status]}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
