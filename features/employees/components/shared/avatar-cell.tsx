import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { Employee } from '../../types';

interface AvatarCellProps {
  employee: Employee;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showEmail?: boolean;
}

export function AvatarCell({
  employee,
  className,
  size = 'md',
  showEmail = true,
}: AvatarCellProps) {
  const initials = [employee.firstName, employee.lastName]
    .map((n) => n?.[0])
    .filter(Boolean)
    .join('')
    .toUpperCase();

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Avatar className={sizeClasses[size]}>
        {employee.avatarUrl && (
          <AvatarImage src={employee.avatarUrl} alt={employee.fullName} />
        )}
        <AvatarFallback className="bg-primary/10 text-primary font-medium">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col overflow-hidden">
        <span className="font-medium truncate text-foreground leading-tight">
          {employee.fullName}
        </span>
        {showEmail && (
          <span className="text-xs text-muted-foreground truncate leading-tight mt-0.5">
            {employee.email}
          </span>
        )}
      </div>
    </div>
  );
}
