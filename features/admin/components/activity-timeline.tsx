import { formatDistanceToNow } from 'date-fns';
import {
  UserPlus, FileText, TrendingUp, DollarSign,
  MessageSquare, CheckCircle2, XCircle, Clock, AlertCircle,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { AdminActivity, ActivityType, ActivityStatus } from '@/features/admin/types';

const typeConfig: Record<ActivityType, { icon: React.ElementType; bg: string; iconColor: string }> = {
  employee_registered: { icon: UserPlus,      bg: 'bg-primary/10',    iconColor: 'text-primary'     },
  timesheet_submitted: { icon: FileText,      bg: 'bg-warning/10',    iconColor: 'text-warning'     },
  kpi_updated:         { icon: TrendingUp,    bg: 'bg-purple-500/10', iconColor: 'text-purple-500'  },
  payroll_generated:   { icon: DollarSign,    bg: 'bg-success/10',    iconColor: 'text-success'     },
  scrum_submitted:     { icon: MessageSquare, bg: 'bg-primary/10',    iconColor: 'text-primary'     },
};

const statusConfig: Record<ActivityStatus, { label: string; className: string; icon: React.ElementType }> = {
  success: { label: 'Success', className: 'bg-success/10 text-success border-success/20',       icon: CheckCircle2  },
  pending: { label: 'Pending', className: 'bg-warning/10 text-warning border-warning/20',       icon: Clock         },
  error:   { label: 'Failed',  className: 'bg-destructive/10 text-destructive border-destructive/20', icon: XCircle  },
  info:    { label: 'Info',    className: 'bg-primary/10 text-primary border-primary/20',       icon: CheckCircle2  },
  warning: { label: 'Warning', className: 'bg-warning/10 text-warning border-warning/20',       icon: AlertCircle   },
};

interface ActivityTimelineProps {
  activities: AdminActivity[];
  loading?: boolean;
}

export function ActivityTimeline({ activities, loading }: ActivityTimelineProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3 animate-pulse">
            <div className="h-8 w-8 rounded-full bg-muted shrink-0" />
            <div className="flex-1 space-y-2 pt-0.5">
              <div className="h-3.5 w-3/4 bg-muted rounded" />
              <div className="h-3 w-1/2 bg-muted rounded" />
            </div>
            <div className="h-5 w-14 bg-muted rounded-full shrink-0" />
          </div>
        ))}
      </div>
    );
  }

  if (!activities.length) {
    return (
      <p className="text-sm text-muted-foreground py-6 text-center">
        No recent activity.
      </p>
    );
  }

  return (
    <div className="space-y-0.5">
      {activities.map((activity, idx) => {
        const type   = typeConfig[activity.type];
        const status = statusConfig[activity.status];
        const TypeIcon   = type.icon;
        const isLast = idx === activities.length - 1;

        return (
          <div key={activity.id} className="flex items-start gap-3 py-3">
            {/* Timeline dot + line */}
            <div className="relative flex flex-col items-center shrink-0">
              <div className={cn('rounded-full p-1.5', type.bg)}>
                <TypeIcon size={13} className={type.iconColor} />
              </div>
              {!isLast && (
                <div className="w-px flex-1 bg-border mt-1 min-h-[16px]" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pb-1">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 min-w-0">
                  <Avatar className="h-6 w-6 shrink-0">
                    <AvatarFallback className="text-[9px] font-bold bg-secondary text-secondary-foreground">
                      {activity.actor.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm text-foreground leading-snug">
                      <span className="font-semibold">{activity.actor.name}</span>
                      <span className="text-muted-foreground"> — {activity.description}</span>
                    </p>
                    {activity.meta && (
                      <p className="text-xs text-muted-foreground mt-0.5">{activity.meta}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Badge
                    variant="outline"
                    className={cn('text-[10px] px-1.5 py-0 h-5 font-medium', status.className)}
                  >
                    {status.label}
                  </Badge>
                  <time
                    className="text-xs text-muted-foreground whitespace-nowrap"
                    dateTime={activity.timestamp}
                  >
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </time>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
