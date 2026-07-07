import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { EmploymentStatus, AccountStatus } from '../../types';
import { EMPLOYMENT_STATUS_LABELS, ACCOUNT_STATUS_LABELS } from '../../types';

interface StatusBadgeProps {
  status: EmploymentStatus | AccountStatus;
  type: 'employment' | 'account';
  className?: string;
}

export function StatusBadge({ status, type, className }: StatusBadgeProps) {
  let label = '';
  let variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' = 'default';

  if (type === 'employment') {
    const empStatus = status as EmploymentStatus;
    label = EMPLOYMENT_STATUS_LABELS[empStatus];
    switch (empStatus) {
      case 'active':
        variant = 'success';
        break;
      case 'inactive':
      case 'terminated':
        variant = 'destructive';
        break;
      case 'on_leave':
        variant = 'warning';
        break;
    }
  } else {
    const accStatus = status as AccountStatus;
    label = ACCOUNT_STATUS_LABELS[accStatus];
    switch (accStatus) {
      case 'active':
        variant = 'success';
        break;
      case 'inactive':
      case 'suspended':
        variant = 'destructive';
        break;
      case 'pending':
        variant = 'warning';
        break;
    }
  }

  // Extend shadcn badge variants if they don't exist
  const customStyles = {
    success: 'bg-success/10 text-success border-success/20 hover:bg-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20 hover:bg-warning/20',
  };

  const styleClass = ['success', 'warning'].includes(variant)
    ? customStyles[variant as keyof typeof customStyles]
    : '';

  return (
    <Badge
      variant={['success', 'warning'].includes(variant) ? 'outline' : (variant as any)}
      className={cn('font-medium', styleClass, className)}
    >
      {label}
    </Badge>
  );
}
