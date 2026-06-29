import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Remove the default max-width constraint */
  fluid?: boolean;
}

export function Container({ children, className, fluid }: ContainerProps) {
  return (
    <div
      className={cn(
        'w-full px-4 md:px-6 lg:px-8 py-6 md:py-8',
        !fluid && 'max-w-7xl mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
}
