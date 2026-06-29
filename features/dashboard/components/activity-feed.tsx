import { formatDistanceToNow } from 'date-fns';
import {
  Clock,
  FileText,
  CheckCircle2,
  CalendarDays,
  MessageSquare,
  CheckSquare,
  LogIn,
  LogOut,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { ActivityItem } from '../types';

const activityConfig: Record<
  ActivityItem['type'],
  { icon: React.ElementType; color: string; bg: string }
> = {
  clock_in: { icon: LogIn, color: 'text-success', bg: 'bg-success/10' },
  clock_out: { icon: LogOut, color: 'text-muted-foreground', bg: 'bg-muted' },
  timesheet_submitted: { icon: FileText, color: 'text-warning', bg: 'bg-warning/10' },
  timesheet_approved: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' },
  leave_requested: { icon: CalendarDays, color: 'text-primary', bg: 'bg-primary/10' },
  leave_approved: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' },
  task_completed: { icon: CheckSquare, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  scrum_submitted: { icon: MessageSquare, color: 'text-primary', bg: 'bg-primary/10' },
};

interface ActivityFeedProps {
  items: ActivityItem[];
  loading?: boolean;
}

export function ActivityFeed({ items, loading }: ActivityFeedProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3 animate-pulse">
            <div className="h-8 w-8 rounded-full bg-muted shrink-0" />
            <div className="flex-1 space-y-1.5 pt-0.5">
              <div className="h-3.5 w-3/4 bg-muted rounded" />
              <div className="h-3 w-1/3 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      <p className="text-sm text-muted-foreground py-4 text-center">
        No recent activity.
      </p>
    );
  }

  return (
    <div className="space-y-1">
      {items.map((item, idx) => {
        const config = activityConfig[item.type];
        const Icon = config.icon;
        const isLast = idx === items.length - 1;

        return (
          <div key={item.id} className="flex items-start gap-3 py-2.5">
            {/* Timeline line */}
            <div className="relative flex flex-col items-center">
              <div className={cn('rounded-full p-1.5 shrink-0', config.bg)}>
                <Icon size={13} className={config.color} />
              </div>
              {!isLast && (
                <div className="w-px flex-1 bg-border mt-1 min-h-[16px]" />
              )}
            </div>

            <div className="flex-1 min-w-0 pb-1">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Avatar className="h-5 w-5 shrink-0">
                    <AvatarFallback className="text-[9px] font-semibold bg-secondary text-secondary-foreground">
                      {item.actor.initials}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm text-foreground truncate">
                    <span className="font-medium">{item.actor.name}</span>{' '}
                    <span className="text-muted-foreground">{item.description}</span>
                    {item.meta && (
                      <span className="text-foreground font-medium"> · {item.meta}</span>
                    )}
                  </p>
                </div>
                <time
                  className="text-xs text-muted-foreground shrink-0 pt-0.5"
                  dateTime={item.timestamp}
                  title={new Date(item.timestamp).toLocaleString()}
                >
                  {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                </time>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
