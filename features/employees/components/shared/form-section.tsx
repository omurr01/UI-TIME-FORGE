import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  separator?: boolean;
}

export function FormSection({
  title,
  description,
  children,
  className,
  separator = true,
}: FormSectionProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {separator && <Separator />}
      <div>
        <h3 className="text-lg font-medium text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="pt-2">{children}</div>
    </div>
  );
}
