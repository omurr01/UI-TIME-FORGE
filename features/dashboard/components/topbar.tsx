'use client';

import { Bell, Search, Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/features/auth/components/theme-toggle';
import { Breadcrumbs } from './breadcrumbs';
import { useShell } from '@/contexts/shell-context';
import { ROLE_LABELS, ROLE_COLORS, ROLE_REDIRECT } from '@/lib/nav-config';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/features/dashboard/types';

const ALL_ROLES: UserRole[] = ['employee', 'supervisor', 'hr_finance', 'admin'];

export function Topbar() {
  const { user, setRole, setMobileSidebarOpen, notificationCount } = useShell();
  const router = useRouter();

  function handleRoleChange(role: UserRole) {
    setRole(role);
    router.push(ROLE_REDIRECT[role]);
  }

  return (
    <header
      className="h-16 shrink-0 bg-card border-b border-border flex items-center gap-3 px-4 md:px-5"
      role="banner"
    >
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 md:hidden text-muted-foreground shrink-0"
        onClick={() => setMobileSidebarOpen(true)}
        aria-label="Open navigation menu"
      >
        <Menu size={18} />
      </Button>

      {/* Breadcrumbs — hidden on mobile */}
      <div className="hidden md:flex items-center min-w-0 flex-1">
        <Breadcrumbs />
      </div>

      {/* Search — grows on mobile, constrained on desktop */}
      <div className="flex-1 md:flex-none md:w-56 lg:w-72">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            aria-hidden="true"
          />
          <Input
            placeholder="Search…"
            className="pl-8 h-9 bg-background text-sm"
            aria-label="Search TimeForge"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {/* Theme toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 relative text-muted-foreground hover:text-foreground"
          aria-label={`Notifications, ${notificationCount} unread`}
          asChild
        >
          <Link href="/notifications">
            <Bell size={17} />
            {notificationCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[9px] font-bold"
              >
                {notificationCount > 9 ? '9+' : notificationCount}
              </Badge>
            )}
          </Link>
        </Button>

        {/* User / Role menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 pl-1.5 pr-2.5 h-9 rounded-lg hover:bg-accent"
              aria-label="Open user menu"
            >
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-[11px] font-bold bg-primary text-primary-foreground">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-foreground leading-none">{user.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full px-1.5 py-0 text-[10px] font-semibold',
                      ROLE_COLORS[user.role]
                    )}
                  >
                    {ROLE_LABELS[user.role]}
                  </span>
                </div>
              </div>
              <ChevronDown size={13} className="hidden md:block text-muted-foreground ml-0.5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56" sideOffset={6}>
            {/* User info */}
            <DropdownMenuLabel className="font-normal pb-2">
              <div className="flex items-center gap-2.5">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs font-bold bg-primary text-primary-foreground">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* Navigation */}
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  Account settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/notifications" className="cursor-pointer">
                  Notifications
                  {notificationCount > 0 && (
                    <Badge variant="destructive" className="ml-auto h-4 px-1.5 text-[10px]">
                      {notificationCount}
                    </Badge>
                  )}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* Role switcher (dev / demo) */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-xs text-muted-foreground">
                <span>Switch role (demo)</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={user.role}
                  onValueChange={(v) => handleRoleChange(v as UserRole)}
                >
                  {ALL_ROLES.map((role) => (
                    <DropdownMenuRadioItem key={role} value={role}>
                      {ROLE_LABELS[role]}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild className="text-destructive focus:text-destructive">
              <Link href="/login" className="cursor-pointer">
                Sign out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
