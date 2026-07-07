'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  UserPlus, UserCheck, BarChart2, DollarSign,
  Bell, Settings, ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AdminQuickAction } from '@/features/admin/types';

const iconMap: Record<string, React.ElementType> = {
  UserPlus, UserCheck, BarChart2, DollarSign, Bell, Settings,
};

const colorConfig: Record<
  AdminQuickAction['color'],
  { bg: string; icon: string; hover: string }
> = {
  blue:   { bg: 'bg-primary/10',    icon: 'text-primary',     hover: 'hover:border-primary/30 hover:bg-primary/5' },
  green:  { bg: 'bg-success/10',    icon: 'text-success',     hover: 'hover:border-success/30 hover:bg-success/5' },
  amber:  { bg: 'bg-warning/10',    icon: 'text-warning',     hover: 'hover:border-warning/30 hover:bg-warning/5' },
  purple: { bg: 'bg-purple-500/10', icon: 'text-purple-500',  hover: 'hover:border-purple-500/30 hover:bg-purple-500/5' },
  red:    { bg: 'bg-destructive/10',icon: 'text-destructive', hover: 'hover:border-destructive/30 hover:bg-destructive/5' },
};

export const ADMIN_QUICK_ACTIONS: AdminQuickAction[] = [
  { id: 'add-employee',         label: 'Add Employee',          description: 'Register a new team member',      href: '/employees',            icon: 'UserPlus',   color: 'blue'   },
  { id: 'approve-registrations',label: 'Approve Registrations', description: '4 pending approvals',             href: '/employees?tab=pending',icon: 'UserCheck',  color: 'amber'  },
  { id: 'view-reports',         label: 'View Reports',          description: 'Analytics & export data',         href: '/reports',              icon: 'BarChart2',  color: 'purple' },
  { id: 'payroll',              label: 'Payroll',               description: 'Process this month\'s payroll',   href: '/payroll',              icon: 'DollarSign', color: 'green'  },
  { id: 'notifications',        label: 'Notifications',         description: 'Manage system alerts',            href: '/notifications',        icon: 'Bell',       color: 'red'    },
  { id: 'settings',             label: 'Company Settings',      description: 'Configure platform settings',     href: '/settings',             icon: 'Settings',   color: 'blue'   },
];

interface QuickActionCardProps {
  action: AdminQuickAction;
}

export function QuickActionCard({ action }: QuickActionCardProps) {
  const Icon = iconMap[action.icon] ?? Settings;
  const colors = colorConfig[action.color];

  return (
    <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.15 }}>
      <Link
        href={action.href}
        className={cn(
          'group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-150',
          colors.hover
        )}
      >
        <div className={cn('rounded-lg p-2.5 shrink-0 transition-colors', colors.bg)}>
          <Icon size={17} className={colors.icon} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
            {action.label}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {action.description}
          </p>
        </div>
        <ArrowRight
          size={14}
          className="text-muted-foreground group-hover:text-primary transition-colors mt-0.5 shrink-0"
        />
      </Link>
    </motion.div>
  );
}
