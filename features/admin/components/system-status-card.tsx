import { cn } from '@/lib/utils';
import type { SystemStatusItem, SystemStatusState } from '@/features/admin/types';

const stateConfig: Record<
  SystemStatusState,
  { dot: string; label: string; labelClass: string }
> = {
  operational: { dot: 'bg-success',     label: 'Operational', labelClass: 'text-success'     },
  degraded:    { dot: 'bg-warning',     label: 'Degraded',    labelClass: 'text-warning'     },
  outage:      { dot: 'bg-destructive', label: 'Outage',      labelClass: 'text-destructive' },
};

interface SystemStatusCardProps {
  items: SystemStatusItem[];
  loading?: boolean;
}

export function SystemStatusCard({ items, loading }: SystemStatusCardProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 animate-pulse">
            <div className="h-2 w-2 rounded-full bg-muted shrink-0" />
            <div className="h-3.5 flex-1 bg-muted rounded" />
            <div className="h-3.5 w-20 bg-muted rounded" />
          </div>
        ))}
      </div>
    );
  }

  const allOperational = items.every((i) => i.status === 'operational');

  return (
    <div className="space-y-0.5">
      {/* Overall banner */}
      <div className={cn(
        'flex items-center gap-2 rounded-lg px-3 py-2 mb-3',
        allOperational ? 'bg-success/10' : 'bg-warning/10',
      )}>
        <span className={cn(
          'h-2 w-2 rounded-full shrink-0',
          allOperational ? 'bg-success' : 'bg-warning',
        )} />
        <p className={cn(
          'text-xs font-semibold',
          allOperational ? 'text-success' : 'text-warning',
        )}>
          {allOperational ? 'All systems operational' : 'Some systems degraded'}
        </p>
      </div>

      {items.map((item) => {
        const cfg = stateConfig[item.status];
        return (
          <div
            key={item.id}
            className="flex items-center gap-3 px-1 py-2.5 rounded-lg hover:bg-muted/40 transition-colors"
          >
            {/* Animated dot */}
            <span className="relative shrink-0 flex h-2 w-2">
              {item.status === 'operational' && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-50" />
              )}
              <span className={cn('relative inline-flex rounded-full h-2 w-2', cfg.dot)} />
            </span>

            <span className="flex-1 text-sm font-medium text-foreground truncate">
              {item.name}
            </span>

            <div className="flex items-center gap-3 shrink-0">
              {item.latency && (
                <span className="text-xs text-muted-foreground">{item.latency}</span>
              )}
              <span className={cn('text-xs font-semibold', cfg.labelClass)}>
                {cfg.label}
              </span>
              <span className="text-xs text-muted-foreground">{item.uptime}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
