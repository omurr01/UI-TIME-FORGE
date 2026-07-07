import { cn } from '@/lib/utils';
import { formatDistanceToNow, format } from 'date-fns';
import { Circle, UserPlus, UserMinus, RefreshCcw, LogIn, Edit, Archive } from 'lucide-react';
import type { EmployeeActivity } from '../../types';

interface TimelineProps {
  activities: EmployeeActivity[];
  className?: string;
}

export function Timeline({ activities, className }: TimelineProps) {
  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        No activity recorded.
      </div>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'created':
        return <UserPlus className="h-4 w-4" />;
      case 'updated':
      case 'role_changed':
      case 'department_changed':
        return <Edit className="h-4 w-4" />;
      case 'status_changed':
        return <RefreshCcw className="h-4 w-4" />;
      case 'archived':
        return <Archive className="h-4 w-4" />;
      case 'restored':
        return <UserMinus className="h-4 w-4" />;
      case 'login':
        return <LogIn className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'created':
        return 'bg-success/20 text-success';
      case 'updated':
      case 'role_changed':
      case 'department_changed':
        return 'bg-primary/20 text-primary';
      case 'status_changed':
        return 'bg-warning/20 text-warning';
      case 'archived':
        return 'bg-destructive/20 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className={cn('relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent', className)}>
      {activities.map((activity, index) => {
        const date = new Date(activity.timestamp);
        
        return (
          <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Icon */}
            <div
              className={cn(
                'flex items-center justify-center w-10 h-10 rounded-full border-4 border-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10',
                getColor(activity.type)
              )}
            >
              {getIcon(activity.type)}
            </div>
            
            {/* Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm text-foreground capitalize">
                  {activity.type.replace('_', ' ')}
                </span>
                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full" title={format(date, 'PPpp')}>
                  {formatDistanceToNow(date, { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {activity.description}
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground border-t border-border/50 pt-2">
                <span className="font-medium">By:</span>
                <span>{activity.performedBy}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
