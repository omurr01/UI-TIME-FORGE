'use client';

import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/shared/loading-skeleton';

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
}

export function ChartCard({
  title,
  description,
  children,
  loading,
  className,
}: ChartCardProps) {
  return (
    <div className={cn('rounded-xl border border-border bg-card p-5', className)}>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>

      {loading ? (
        <div className="space-y-2" aria-label="Loading chart">
          <Skeleton className="h-40 w-full rounded-lg" />
          <div className="flex gap-3 justify-center">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
