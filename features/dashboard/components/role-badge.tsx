import { cn } from '@/lib/utils';
import { ROLE_LABELS, ROLE_COLORS } from '@/lib/nav-config';
import type { UserRole } from '@/features/dashboard/types';
import { Shield, User, Users, DollarSign } from 'lucide-react';

const ROLE_ICONS: Record<UserRole, React.ElementType> = {
  employee: User,
  supervisor: Users,
  hr_finance: DollarSign,
  admin: Shield,
};

interface RoleBadgeProps {
  role: UserRole;
  size?: 'sm' | 'md';
  showIcon?: boolean;
  className?: string;
}

export function RoleBadge({ role, size = 'md', showIcon = true, className }: RoleBadgeProps) {
  const Icon = ROLE_ICONS[role];
  const iconSize = size === 'sm' ? 11 : 13;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-semibold',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs',
        ROLE_COLORS[role],
        className
      )}
    >
      {showIcon && <Icon size={iconSize} className="shrink-0" aria-hidden="true" />}
      {ROLE_LABELS[role]}
    </span>
  );
}
