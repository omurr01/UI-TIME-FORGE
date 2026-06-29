'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { UserRole } from '@/features/dashboard/types';
import { ROLE_REDIRECT } from '@/lib/nav-config';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MockUser {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  email: string;
  role: UserRole;
  department: string;
  jobTitle: string;
  avatarUrl?: string;
}

interface ShellContextValue {
  user: MockUser;
  setRole: (role: UserRole) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  toggleSidebar: () => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (v: boolean) => void;
  notificationCount: number;
}

// ─── Mock users ───────────────────────────────────────────────────────────────

const MOCK_USERS: Record<UserRole, MockUser> = {
  employee: {
    id: '1',
    name: 'Alex Johnson',
    firstName: 'Alex',
    lastName: 'Johnson',
    initials: 'AJ',
    email: 'employee@timeforge.com',
    role: 'employee',
    department: 'Engineering',
    jobTitle: 'Software Engineer',
  },
  supervisor: {
    id: '2',
    name: 'Morgan Chen',
    firstName: 'Morgan',
    lastName: 'Chen',
    initials: 'MC',
    email: 'supervisor@timeforge.com',
    role: 'supervisor',
    department: 'Engineering',
    jobTitle: 'Engineering Manager',
  },
  hr_finance: {
    id: '3',
    name: 'Jordan Martinez',
    firstName: 'Jordan',
    lastName: 'Martinez',
    initials: 'JM',
    email: 'hr@timeforge.com',
    role: 'hr_finance',
    department: 'Human Resources',
    jobTitle: 'HR Manager',
  },
  admin: {
    id: '4',
    name: 'Riley Thompson',
    firstName: 'Riley',
    lastName: 'Thompson',
    initials: 'RT',
    email: 'admin@timeforge.com',
    role: 'admin',
    department: 'IT',
    jobTitle: 'System Administrator',
  },
};

// ─── Context ──────────────────────────────────────────────────────────────────

const ShellContext = createContext<ShellContextValue | null>(null);

export function ShellProvider({
  children,
  initialRole = 'employee',
}: {
  children: React.ReactNode;
  initialRole?: UserRole;
}) {
  const [currentRole, setCurrentRole] = useState<UserRole>(initialRole);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const user = MOCK_USERS[currentRole];

  const setRole = useCallback((role: UserRole) => {
    setCurrentRole(role);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((v) => !v);
  }, []);

  return (
    <ShellContext.Provider
      value={{
        user,
        setRole,
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        mobileSidebarOpen,
        setMobileSidebarOpen,
        notificationCount: 5,
      }}
    >
      {children}
    </ShellContext.Provider>
  );
}

export function useShell(): ShellContextValue {
  const ctx = useContext(ShellContext);
  if (!ctx) throw new Error('useShell must be used inside ShellProvider');
  return ctx;
}

export { MOCK_USERS, ROLE_REDIRECT };
