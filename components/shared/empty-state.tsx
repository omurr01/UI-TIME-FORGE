import { type LucideIcon, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  secondaryAction,
  className,
  size = 'md',
}: EmptyStateProps) {
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 48 : 36;
  const containerPy = size === 'sm' ? 'py-8' : size === 'lg' ? 'py-20' : 'py-12';
  const titleSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base';

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        containerPy,
        className
      )}
      role="status"
      aria-label={title}
    >
      <div className="rounded-xl bg-muted p-4 mb-4">
        <Icon size={iconSize} className="text-muted-foreground" strokeWidth={1.5} />
      </div>
      <h3 className={cn('font-semibold text-foreground', titleSize)}>{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-1.5 max-w-xs leading-relaxed">
          {description}
        </p>
      )}
      {(action || secondaryAction) && (
        <div className="flex items-center gap-3 mt-5">
          {action && (
            <Button size="sm" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button size="sm" variant="outline" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
