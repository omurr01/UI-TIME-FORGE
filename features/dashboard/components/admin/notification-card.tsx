'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AdminNotification, NotificationType } from '../../types/admin';

// ─── Type colour maps ─────────────────────────────────────────────────────────

const TYPE_BORDER: Record<NotificationType, string> = {
  success: 'border-l-green-500',
  warning: 'border-l-amber-500',
  error: 'border-l-red-500',
  info: 'border-l-blue-500',
  priority: 'border-l-purple-500',
};

const TYPE_TITLE_COLOR: Record<NotificationType, string> = {
  success: 'text-green-700 dark:text-green-400',
  warning: 'text-amber-700 dark:text-amber-400',
  error: 'text-red-700 dark:text-red-400',
  info: 'text-blue-700 dark:text-blue-400',
  priority: 'text-purple-700 dark:text-purple-400',
};

// ─── Component ────────────────────────────────────────────────────────────────

interface NotificationCardProps {
  notification: AdminNotification;
  onMarkRead?: (id: string) => void;
}

export function NotificationCard({ notification, onMarkRead }: NotificationCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-lg border border-border bg-card p-4 border-l-4 transition-colors',
        TYPE_BORDER[notification.type],
        !notification.isRead && 'bg-muted/30'
      )}
      role="article"
      aria-label={notification.title}
    >
      {/* Unread dot */}
      {!notification.isRead && (
        <span
          className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blue-500"
          aria-label="Unread notification"
        />
      )}

      <div className="pr-5">
        <div className="flex items-center gap-2 mb-1">
          <p
            className={cn(
              'text-sm font-semibold',
              TYPE_TITLE_COLOR[notification.type]
            )}
          >
            {notification.title}
          </p>
          {notification.type === 'priority' && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-400 uppercase tracking-wide">
              Priority
            </span>
          )}
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {notification.message}
        </p>

        <div className="flex items-center justify-between mt-3 gap-2">
          <span className="text-[11px] text-muted-foreground">
            {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
          </span>

          <div className="flex items-center gap-2">
            {notification.actionLabel && notification.actionHref && (
              <Link
                href={notification.actionHref}
                className="text-xs font-medium text-primary hover:underline"
                aria-label={`${notification.actionLabel} for notification: ${notification.title}`}
              >
                {notification.actionLabel}
              </Link>
            )}
            {!notification.isRead && onMarkRead && (
              <button
                onClick={() => onMarkRead(notification.id)}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                aria-label={`Mark "${notification.title}" as read`}
              >
                <CheckCheck size={12} />
                Mark read
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
