'use client';

import { Bell, Search, Menu } from 'lucide-react';
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/features/auth/components/theme-toggle';
import Link from 'next/link';

interface TopbarProps {
  userName: string;
  userRole: string;
  userInitials: string;
  onMenuClick?: () => void;
  notificationCount?: number;
}

const roleLabels: Record<string, string> = {
  employee: 'Employee',
  supervisor: 'Supervisor',
  hr_finance: 'HR & Finance',
  admin: 'Administrator',
};

export function Topbar({
  userName,
  userRole,
  userInitials,
  onMenuClick,
  notificationCount = 0,
}: TopbarProps) {
  return (
    <header className="h-16 shrink-0 bg-card border-b border-border flex items-center gap-4 px-4 md:px-6">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 md:hidden text-muted-foreground"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={18} />
      </Button>

      {/* Search */}
      <div className="flex-1 max-w-md hidden sm:block">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <Input
            placeholder="Search…"
            className="pl-9 h-9 bg-background border-border text-sm"
            aria-label="Search"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Theme toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 relative text-muted-foreground hover:text-foreground"
          aria-label={`Notifications${notificationCount > 0 ? `, ${notificationCount} unread` : ''}`}
          asChild
        >
          <Link href="/notifications">
            <Bell size={18} />
            {notificationCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
              >
                {notificationCount > 9 ? '9+' : notificationCount}
              </Badge>
            )}
          </Link>
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2.5 pl-2 pr-3 h-9 rounded-lg hover:bg-accent"
              aria-label="User menu"
            >
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-xs font-semibold bg-primary text-primary-foreground">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-foreground leading-none">{userName}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {roleLabels[userRole] ?? userRole}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="font-normal">
              <p className="font-medium text-foreground text-sm">{userName}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {roleLabels[userRole] ?? userRole}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/notifications">Notifications</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="text-destructive focus:text-destructive">
              <Link href="/login">Sign out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
