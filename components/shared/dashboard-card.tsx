import { cn } from '@/lib/utils';

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
  /** Removes default padding — use when you need custom internal spacing */
  noPadding?: boolean;
  /** Hover shadow effect */
  hoverable?: boolean;
}

export function DashboardCard({
  children,
  className,
  noPadding,
  hoverable,
}: DashboardCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card',
        !noPadding && 'p-5',
        hoverable && 'transition-shadow duration-200 hover:shadow-sm',
        className
      )}
    >
      {children}
    </div>
  );
}

interface DashboardCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardCardHeader({ children, className }: DashboardCardHeaderProps) {
  return <div className={cn('mb-4', className)}>{children}</div>;
}

interface DashboardCardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardCardBody({ children, className }: DashboardCardBodyProps) {
  return <div className={cn('', className)}>{children}</div>;
}
