'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AuthLogo } from '@/features/auth/components/auth-logo';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { getNavGroups } from '@/lib/nav-config';
import { useShell } from '@/contexts/shell-context';

// ─── Sidebar Item ─────────────────────────────────────────────────────────────

interface SidebarItemProps {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  active: boolean;
  collapsed: boolean;
}

function SidebarItem({ label, href, icon: Icon, badge, active, collapsed }: SidebarItemProps) {
  const base = cn(
    'relative flex items-center rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    active
      ? 'bg-primary text-primary-foreground'
      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
    collapsed ? 'h-10 w-10 justify-center mx-auto' : 'gap-3 px-3 h-10 w-full'
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href} className={base} aria-label={label}>
            <Icon size={18} className="shrink-0" />
            {badge ? (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
            ) : null}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-2">
          {label}
          {badge ? (
            <Badge variant="destructive" className="h-4 px-1 text-[10px]">
              {badge}
            </Badge>
          ) : null}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Link href={href} className={base}>
      <Icon size={17} className="shrink-0" />
      <motion.span
        className="flex-1 text-sm font-medium truncate"
        initial={false}
        animate={{ opacity: 1 }}
      >
        {label}
      </motion.span>
      {badge ? (
        <Badge
          variant={active ? 'secondary' : 'destructive'}
          className="h-5 px-1.5 text-xs ml-auto"
        >
          {badge}
        </Badge>
      ) : null}
    </Link>
  );
}

// ─── Nav Group ────────────────────────────────────────────────────────────────

interface NavGroupProps {
  label: string;
  collapsed: boolean;
  children: React.ReactNode;
}

function NavGroup({ label, collapsed, children }: NavGroupProps) {
  return (
    <div className="space-y-0.5">
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.p
            key="group-label"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70 select-none overflow-hidden"
          >
            {label}
          </motion.p>
        )}
      </AnimatePresence>
      <div className={cn('space-y-0.5', collapsed && 'flex flex-col items-center')}>
        {children}
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export function Sidebar() {
  const pathname = usePathname();
  const { user, sidebarCollapsed: collapsed, toggleSidebar } = useShell();

  const groups = getNavGroups(user.role);

  function isActive(href: string) {
    if (href === '/dashboard') return pathname.startsWith('/dashboard');
    // strip query strings for comparison
    return pathname.startsWith(href.split('?')[0]);
  }

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="flex flex-col h-full bg-card border-r border-border overflow-hidden shrink-0"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div
          className={cn(
            'flex items-center border-b border-border h-16 shrink-0 px-4 overflow-hidden',
            collapsed ? 'justify-center px-0' : 'justify-between'
          )}
        >
          <AnimatePresence initial={false} mode="wait">
            {collapsed ? (
              <motion.div
                key="logo-icon"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
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
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="logo-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <AuthLogo size="sm" href="/dashboard" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-4" role="navigation">
          {groups.map((group) => (
            <NavGroup key={group.id} label={group.label} collapsed={collapsed}>
              {group.items.map((item) => (
                <SidebarItem
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  icon={item.icon}
                  badge={item.badge}
                  active={isActive(item.href)}
                  collapsed={collapsed}
                />
              ))}
            </NavGroup>
          ))}
        </nav>

        {/* Bottom controls */}
        <div
          className={cn(
            'shrink-0 border-t border-border px-2 py-3 space-y-0.5',
            collapsed && 'flex flex-col items-center'
          )}
        >
          {/* Sign out */}
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/login"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
              className="flex items-center gap-3 px-3 h-10 w-full rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <LogOut size={17} className="shrink-0" />
              <span>Sign out</span>
            </Link>
          )}

          {/* Collapse toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className={cn(
              'text-muted-foreground hover:text-foreground h-8 text-xs',
              collapsed ? 'w-10 px-0 justify-center' : 'w-full justify-between px-3'
            )}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <AnimatePresence initial={false} mode="wait">
              {collapsed ? (
                <motion.span
                  key="expand"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <ChevronRight size={15} />
                </motion.span>
              ) : (
                <motion.span
                  key="collapse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="flex items-center justify-between w-full"
                >
                  <span>Collapse</span>
                  <ChevronLeft size={15} />
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}
