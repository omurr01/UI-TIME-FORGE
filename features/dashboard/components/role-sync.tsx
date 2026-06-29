'use client';

import { useEffect } from 'react';
import { useShell } from '@/contexts/shell-context';
import type { UserRole } from '@/features/dashboard/types';

/**
 * Drop this at the top of any role-specific page.
 * On mount it syncs the ShellContext role to match the page,
 * so the sidebar filters its nav items correctly.
 */
export function RoleSync({ role }: { role: UserRole }) {
  const { setRole } = useShell();

  useEffect(() => {
    setRole(role);
  }, [role, setRole]);

  return null;
}
