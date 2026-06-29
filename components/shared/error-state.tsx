'use client';

import { AlertTriangle, RefreshCw, WifiOff, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type ErrorVariant = 'generic' | 'network' | 'unauthorized' | 'notFound';

interface ErrorStateProps {
  variant?: ErrorVariant;
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

const variantConfig: Record<
  ErrorVariant,
  { icon: React.ElementType; title: string; description: string; iconColor: string }
> = {
  generic: {
    icon: AlertTriangle,
    title: 'Something went wrong',
    description: 'An unexpected error occurred. Please try again.',
    iconColor: 'text-destructive',
  },
  network: {
    icon: WifiOff,
    title: 'Connection failed',
    description: 'Unable to reach the server. Check your connection and try again.',
    iconColor: 'text-warning',
  },
  unauthorized: {
    icon: ShieldAlert,
    title: 'Access restricted',
    description: "You don't have permission to view this content.",
    iconColor: 'text-warning',
  },
  notFound: {
    icon: AlertTriangle,
    title: 'Content not found',
    description: "The item you're looking for doesn't exist or has been removed.",
    iconColor: 'text-muted-foreground',
  },
};

export function ErrorState({
  variant = 'generic',
  title,
  description,
  onRetry,
  className,
}: ErrorStateProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn('flex flex-col items-center justify-center text-center py-12', className)}
      role="alert"
    >
      <div className="rounded-xl bg-muted p-4 mb-4">
        <Icon size={36} className={cn(config.iconColor)} strokeWidth={1.5} />
      </div>
      <h3 className="font-semibold text-foreground text-base">{title ?? config.title}</h3>
      <p className="text-sm text-muted-foreground mt-1.5 max-w-xs leading-relaxed">
        {description ?? config.description}
      </p>
      {onRetry && (
        <Button
          size="sm"
          variant="outline"
          className="mt-5 gap-2"
          onClick={onRetry}
        >
          <RefreshCw size={14} />
          Try again
        </Button>
      )}
    </div>
  );
}
