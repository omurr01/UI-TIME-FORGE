'use client';

import { cn } from '@/lib/utils';
import type { StatusLevel } from '../../types/admin';

const STATUS_DOT: Record<StatusLevel, string> = {
  operational: 'bg-green-500',
  degraded: 'bg-amber-500',
  outage: 'bg-red-500',
  maintenance: 'bg-blue-500',
};

const STATUS_LABEL: Record<StatusLevel, string> = {
  operational: 'Operational',
  degraded: 'Degraded',
  outage: 'Outage',
  maintenance: 'Maintenance',
};

const STATUS_TEXT: Record<StatusLevel, string> = {
  operational: 'text-green-700 dark:text-green-400',
  degraded: 'text-amber-700 dark:text-amber-400',
  outage: 'text-red-700 dark:text-red-400',
  maintenance: 'text-blue-700 dark:text-blue-400',
};

interface StatusCardProps {
  name: string;
  status: StatusLevel;
  description?: string;
  uptime?: string;
}

export function StatusCard({ name, status, description, uptime }: StatusCardProps) {
  const isPulsing = status !== 'operational';

  return (
    <div
      className="flex items-center justify-between py-2.5 border-b border-border last:border-0"
      role="status"
      aria-label={`${name}: ${STATUS_LABEL[status]}`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Animated dot */}
        <div className="relative shrink-0 w-2.5 h-2.5" aria-hidden="true">
          {isPulsing && (
            <span
              className={cn(
                'absolute inset-0 rounded-full opacity-60 animate-ping',
                STATUS_DOT[status]
              )}
            />
          )}
          <span
            className={cn('relative block w-2.5 h-2.5 rounded-full', STATUS_DOT[status])}
          />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{name}</p>
          {description && (
            <p className="text-xs text-muted-foreground truncate">{description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0 ml-2">
        {uptime && (
          <span className="text-xs text-muted-foreground">{uptime}</span>
        )}
        <span className={cn('text-xs font-semibold', STATUS_TEXT[status])}>
          {STATUS_LABEL[status]}
        </span>
      </div>
    </div>
  );
}
