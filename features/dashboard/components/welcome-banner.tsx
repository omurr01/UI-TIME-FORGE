import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WelcomeBannerProps {
  name: string;
  role: string;
  className?: string;
}

const roleLabels: Record<string, string> = {
  employee: 'Employee',
  supervisor: 'Supervisor',
  hr_finance: 'HR & Finance',
  admin: 'Administrator',
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getFormattedDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function WelcomeBanner({ name, role, className }: WelcomeBannerProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card px-6 py-5 flex items-center justify-between gap-4',
        className
      )}
    >
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">
          {getGreeting()}, {name.split(' ')[0]} 👋
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {roleLabels[role] ?? role} &middot; {getFormattedDate()}
        </p>
      </div>
      <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2.5 rounded-lg border border-border">
        <Clock size={15} className="text-primary shrink-0" />
        <span className="font-medium text-foreground">
          {new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
}
