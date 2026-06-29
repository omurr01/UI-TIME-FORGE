import { cn } from '@/lib/utils';

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className={cn(
        'w-full bg-card text-card-foreground rounded-2xl border shadow-sm p-8',
        className
      )}
    >
      {children}
    </div>
  );
}

interface AuthCardHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function AuthCardHeader({ title, description, children }: AuthCardHeaderProps) {
  return (
    <div className="mb-6 space-y-1.5">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
      {description && (
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      )}
      {children}
    </div>
  );
}
