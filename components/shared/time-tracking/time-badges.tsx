import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { TimeStatus, ShiftType } from '../../../features/time-tracking/types';
import { TIME_STATUS_LABELS, SHIFT_LABELS } from '../../../features/time-tracking/types';

interface WorkingStatusBadgeProps {
  status: TimeStatus;
  className?: string;
}

export function WorkingStatusBadge({ status, className }: WorkingStatusBadgeProps) {
  const label = TIME_STATUS_LABELS[status];
  let variant = 'default';

  switch (status) {
    case 'working':
      variant = 'success';
      break;
    case 'on_break':
      variant = 'warning';
      break;
    case 'completed':
      variant = 'secondary';
      break;
    case 'pending_approval':
      variant = 'outline';
      break;
    case 'rejected':
      variant = 'destructive';
      break;
  }

  const customStyles: Record<string, string> = {
    success: 'bg-success/15 text-success border-success/30',
    warning: 'bg-warning/15 text-warning border-warning/30',
  };

  const styleClass = customStyles[variant] || '';

  return (
    <Badge
      variant={customStyles[variant] ? 'outline' : (variant as any)}
      className={cn('font-medium shadow-sm transition-colors', styleClass, className)}
    >
      {label}
    </Badge>
  );
}

interface ShiftBadgeProps {
  shift: ShiftType;
  className?: string;
}

export function ShiftBadge({ shift, className }: ShiftBadgeProps) {
  const label = SHIFT_LABELS[shift];
  
  const colors: Record<ShiftType, string> = {
    morning: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    afternoon: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    night: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
    flexible: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  };

  return (
    <Badge variant="outline" className={cn('font-medium', colors[shift], className)}>
      {label}
    </Badge>
  );
}

export function OvertimeBadge({ minutes, className }: { minutes: number, className?: string }) {
  if (minutes <= 0) return null;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const text = `${hours}h ${mins}m OT`;

  return (
    <Badge variant="outline" className={cn('bg-purple-500/10 text-purple-600 border-purple-500/20 font-bold', className)}>
      {text}
    </Badge>
  );
}
