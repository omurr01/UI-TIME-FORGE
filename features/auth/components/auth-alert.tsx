import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type AlertVariant = 'error' | 'success' | 'info';

interface AuthAlertProps {
  variant: AlertVariant;
  message: string;
  className?: string;
}

const config = {
  error: {
    container: 'bg-destructive/10 border-destructive/30 text-destructive',
    icon: AlertCircle,
  },
  success: {
    container: 'bg-success/10 border-success/30 text-success',
    icon: CheckCircle2,
  },
  info: {
    container: 'bg-primary/10 border-primary/30 text-primary',
    icon: Info,
  },
};

export function AuthAlert({ variant, message, className }: AuthAlertProps) {
  const { container, icon: Icon } = config[variant];

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 rounded-lg border px-4 py-3 text-sm font-medium',
        container,
        className
      )}
    >
      <Icon size={16} className="mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
