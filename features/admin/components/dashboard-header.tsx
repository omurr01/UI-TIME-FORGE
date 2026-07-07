'use client';

import { motion } from 'framer-motion';
import { Shield, Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RoleBadge } from '@/features/dashboard/components/role-badge';
import { useShell } from '@/contexts/shell-context';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

interface DashboardHeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function DashboardHeader({ onRefresh, isRefreshing }: DashboardHeaderProps) {
  const { user } = useShell();

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-border bg-card px-6 py-5"
    >
      {/* Left */}
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-red-500/10 p-3 shrink-0">
          <Shield size={22} className="text-red-500" />
        </div>
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              {getGreeting()}, {user.firstName} 👋
            </h1>
            <RoleBadge role="admin" size="sm" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Here's your platform overview for{' '}
            <span className="font-semibold text-foreground">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 border border-border px-4 py-2.5 rounded-xl">
          <Clock size={14} className="text-primary" />
          <span className="font-bold text-foreground">
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        {onRefresh && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="gap-2"
            aria-label="Refresh dashboard"
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        )}
      </div>
    </motion.div>
  );
}
