import { CalendarDays, DollarSign, Users, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UpcomingEvent, EventType } from '@/features/admin/types';

const typeConfig: Record<
  EventType,
  { icon: React.ElementType; bg: string; iconColor: string; label: string }
> = {
  holiday:  { icon: CalendarDays, bg: 'bg-success/10',    iconColor: 'text-success',    label: 'Holiday'  },
  payroll:  { icon: DollarSign,   bg: 'bg-green/10',      iconColor: 'text-green-600',  label: 'Payroll'  },
  meeting:  { icon: Users,        bg: 'bg-primary/10',    iconColor: 'text-primary',    label: 'Meeting'  },
  deadline: { icon: AlertCircle,  bg: 'bg-destructive/10',iconColor: 'text-destructive',label: 'Deadline' },
};

function formatEventDate(dateStr: string, time?: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  const formatted = date.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  });
  return time ? `${formatted} · ${time}` : formatted;
}

function daysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + 'T00:00:00');
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

interface UpcomingEventCardProps {
  event: UpcomingEvent;
}

export function UpcomingEventCard({ event }: UpcomingEventCardProps) {
  const config = typeConfig[event.type];
  const Icon   = config.icon;
  const days   = daysUntil(event.date);
  const isToday = days === 0;
  const isSoon  = days >= 0 && days <= 3;

  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <div className={cn('rounded-lg p-2 shrink-0', config.bg)}>
        <Icon size={15} className={config.iconColor} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-foreground leading-tight truncate">
            {event.title}
          </p>
          <span className={cn(
            'shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full',
            isToday        ? 'bg-primary text-primary-foreground'       :
            isSoon         ? 'bg-warning/15 text-warning'               :
            days < 0       ? 'bg-muted text-muted-foreground'           :
                             'bg-muted text-muted-foreground',
          )}>
            {days < 0 ? 'Past' : isToday ? 'Today' : `${days}d`}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          {formatEventDate(event.date, event.time)}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
          {event.description}
        </p>
      </div>
    </div>
  );
}
