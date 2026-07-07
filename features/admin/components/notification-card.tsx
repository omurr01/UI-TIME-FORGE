import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2, AlertTriangle, XCircle, Info, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AdminNotification, NotificationType } from '@/features/admin/types';

const typeConfig: Record<
  NotificationType,
  { icon: React.ElementType; iconColor: string; border: string; dot: string }
> = {
  success: { icon: CheckCircle2,  iconColor: 'text-success',     border: 'border-l-success',     dot: 'bg-success'     },
  warning: { icon: AlertTriangle, iconColor: 'text-warning',     border: 'border-l-warning',     dot: 'bg-warning'     },
  error:   { icon: XCircle,       iconColor: 'text-destructive', border: 'border-l-destructive', dot: 'bg-destructive' },
  info:    { icon: Info,           iconColor: 'text-primary',    border: 'border-l-primary',     dot: 'bg-primary'     },
};

interface NotificationCardProps {
  notification: AdminNotification;
}

export function NotificationCard({ notification }: NotificationCardProps) {
  const config = typeConfig[notification.type];
  const Icon   = config.icon;

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border-l-2 bg-card px-4 py-3 transition-colors',
        config.border,
        !notification.read && 'bg-muted/30',
      )}
    >
      {/* Icon */}
      <Icon size={16} className={cn('shrink-0 mt-0.5', config.iconColor)} />

      {/* Body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={cn('text-sm font-semibold text-foreground leading-tight', !notification.read && 'font-bold')}>
            {notification.title}
            {!notification.read && (
              <span className={cn('ml-2 inline-block h-1.5 w-1.5 rounded-full align-middle', config.dot)} />
            )}
          </p>
          <time className="text-[10px] text-muted-foreground shrink-0 whitespace-nowrap pt-0.5">
            {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
          </time>
        </div>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
          {notification.message}
        </p>
        {notification.actionLabel && notification.actionHref && (
          <Link
            href={notification.actionHref}
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            {notification.actionLabel}
            <ArrowRight size={11} />
          </Link>
        )}
      </div>
    </div>
  );
}
