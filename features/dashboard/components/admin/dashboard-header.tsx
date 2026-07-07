'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MockUser } from '@/contexts/shell-context';

function getGreeting(hour: number): string {
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

interface DashboardHeaderProps {
  user: MockUser;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const greeting = getGreeting(now.getHours());

  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      {/* Greeting side */}
      <div>
        <h1 className="text-xl font-bold text-foreground">
          {greeting}, {user.firstName} 👋
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {format(now, 'EEEE, MMMM d, yyyy')}
        </p>
        {user.lastLogin && (
          <p className="text-xs text-muted-foreground mt-0.5">
            Last login: {user.lastLogin}
          </p>
        )}
      </div>

      {/* Right side — badge + clock */}
      <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-1">
        <div
          className={cn(
            'inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full',
            'bg-red-500/10 text-red-600 dark:text-red-400'
          )}
        >
          <Shield size={12} aria-hidden="true" />
          Administrator
        </div>

        <time
          dateTime={now.toISOString()}
          className="text-sm font-semibold text-foreground tabular-nums"
          aria-label={`Current time: ${format(now, 'h:mm a')}`}
        >
          {format(now, 'h:mm a')}
        </time>
      </div>
    </header>
  );
}
