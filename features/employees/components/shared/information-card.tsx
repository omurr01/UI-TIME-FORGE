import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface InfoItem {
  label: string;
  value: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}

interface InformationCardProps {
  items: InfoItem[];
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

export function InformationCard({ items, className, columns = 2 }: InformationCardProps) {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-6', colClasses[columns], className)}>
      {items.map((item, i) => (
        <div key={i} className={cn('flex flex-col space-y-1', item.className)}>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            {item.icon && <item.icon className="h-3.5 w-3.5" />}
            <span>{item.label}</span>
          </div>
          <div className="text-sm font-medium text-foreground">
            {item.value || <span className="text-muted-foreground/50">—</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
