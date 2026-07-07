'use client';

import { format } from 'date-fns';
import { Palmtree, DollarSign, Users, AlertCircle, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UpcomingEvent, EventType } from '../../types/admin';

const EVENT_ICON: Record<EventType, LucideIcon> = {
  holiday: Palmtree,
  payroll: DollarSign,
  meeting: Users,
  deadline: AlertCircle,
};

const EVENT_ACCENT: Record<EventType, string> = {
  holiday: 'border-l-green-500',
  payroll: 'border-l-blue-500',
  meeting: 'border-l-purple-500',
  deadline: 'border-l-red-500',
};

const EVENT_ICON_COLOR: Record<EventType, string> = {
  holiday: 'text-green-600 dark:text-green-400',
  payroll: 'text-blue-600 dark:text-blue-400',
  meeting: 'text-purple-600 dark:text-purple-400',
  deadline: 'text-red-600 dark:text-red-400',
};

const EVENT_TYPE_LABEL: Record<EventType, string> = {
  holiday: 'Holiday',
  payroll: 'Payroll',
  meeting: 'Meeting',
  deadline: 'Deadline',
};

interface UpcomingEventCardProps {
  event: UpcomingEvent;
}

export function UpcomingEventCard({ event }: UpcomingEventCardProps) {
  const Icon = EVENT_ICON[event.type];
  const eventDate = new Date(event.date);

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border border-border bg-card p-3 border-l-4',
        EVENT_ACCENT[event.type]
      )}
      role="listitem"
      aria-label={`${event.title} on ${format(eventDate, 'MMM d')}`}
    >
      {/* Date block */}
      <div className="shrink-0 flex flex-col items-center w-9 text-center">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          {format(eventDate, 'MMM')}
        </span>
        <span className="text-lg font-bold text-foreground leading-none">
          {format(eventDate, 'd')}
        </span>
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <Icon
            size={13}
            className={cn(EVENT_ICON_COLOR[event.type])}
            aria-hidden="true"
          />
          <p className="text-sm font-semibold text-foreground truncate">{event.title}</p>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
          {event.description}
        </p>
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
          {EVENT_TYPE_LABEL[event.type]}
        </span>
      </div>
    </div>
  );
}
