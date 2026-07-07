import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { EmployeeRole } from '../../types';
import { EMPLOYEE_ROLE_LABELS } from '../../types';
import { ROLE_COLORS } from '@/lib/nav-config';

interface RoleBadgeProps {
  role: EmployeeRole;
  className?: string;
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const label = EMPLOYEE_ROLE_LABELS[role];
  const colorClass = ROLE_COLORS[role];

  return (
    <Badge
      variant="outline"
      className={cn('font-medium border-transparent', colorClass, className)}
    >
      {label}
    </Badge>
  );
}
