'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Clock,
  FileText,
  MessageSquare,
  BarChart2,
  TrendingUp,
  Bell,
  DollarSign,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AuthLogo } from '@/features/auth/components/auth-logo';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import type { UserRole } from '@/features/dashboard/types';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  roles: UserRole[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['employee', 'supervisor', 'hr_finance', 'admin'],
  },
  {
    label: 'Employees',
    href: '/employees',
    icon: Users,
    roles: ['supervisor', 'hr_finance', 'admin'],
  },
  {
    label: 'Time Tracking',
    href: '/time-tracking',
    icon: Clock,
    roles: ['employee', 'supervisor', 'hr_finance', 'admin'],
  },
  {
    label: 'Timesheets',
    href: '/timesheets',
    icon: FileText,
    badge: 3,
    roles: ['employee', 'supervisor', 'hr_finance', 'admin'],
  },
  {
    label: 'Daily Scrum',
    href: '/scrum',
    icon: MessageSquare,
    roles: ['employee', 'supervisor', 'admin'],
  },
  {
    label: 'KPI',
    href: '/kpi',
    icon: TrendingUp,
    roles: ['employee', 'supervisor', 'hr_finance', 'admin'],
  },
  {
    label: 'Reports',
    href: '/reports',
    icon: BarChart2,
    roles: ['supervisor', 'hr_finance', 'admin'],
  },
  {
    label: 'Notifications',
    href: '/notifications',
    icon: Bell,
    badge: 5,
    roles: ['employee', 'supervisor', 'hr_finance', 'admin'],
  },
  {
    label: 'Payroll',
    href: '/payroll',
    icon: DollarSign,
    roles: ['hr_finance', 'admin'],
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['employee', 'supervisor', 'hr_finance', 'admin'],
  },
];

interface SidebarProps {
  role: UserRole;
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ role, collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const visibleItems = NAV_ITEMS.filter((item) => item.roles.includes(role));

  function isActive(href: string) {
    if (href === '/dashboard') {
      return pathname.startsWith('/dashboard');
    }
    return pathname.startsWith(href);
  }

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'flex flex-col h-full bg-card border-r border-border transition-all duration-300 ease-in-out',
          collapsed ? 'w-16' : 'w-60'
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            'flex items-center border-b border-border h-16 shrink-0 px-4',
            collapsed ? 'justify-center' : 'justify-between'
          )}
        >
          {!collapsed && <AuthLogo size="sm" href="/dashboard" />}
          {collapsed && (
            <div className="rounded-lg bg-primary text-primary-foreground flex items-center justify-center p-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            if (collapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center justify-center w-full h-10 rounded-lg transition-all duration-150 relative',
                        active
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                      )}
                      aria-label={item.label}
                    >
                      <Icon size={18} />
                      {item.badge && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
                      )}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge variant="destructive" className="ml-2 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 h-10 rounded-lg text-sm font-medium transition-all duration-150',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <Icon size={17} className="shrink-0" />
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge && (
                  <Badge
                    variant={active ? 'secondary' : 'destructive'}
                    className="text-xs h-5 px-1.5"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: logout + collapse toggle */}
        <div className="shrink-0 border-t border-border px-2 py-3 space-y-0.5">
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/login"
                  className="flex items-center justify-center w-full h-10 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-150"
                  aria-label="Sign out"
                >
                  <LogOut size={17} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Sign out</TooltipContent>
            </Tooltip>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-3 px-3 h-10 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-150"
            >
              <LogOut size={17} className="shrink-0" />
              <span>Sign out</span>
            </Link>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className={cn(
              'w-full text-muted-foreground hover:text-foreground h-8 text-xs',
              collapsed ? 'px-0 justify-center' : 'justify-between px-3'
            )}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {!collapsed && <span>Collapse</span>}
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  );
}
