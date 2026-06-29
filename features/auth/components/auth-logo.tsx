import { Clock4 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AuthLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
}

const sizeConfig = {
  sm: { icon: 18, text: 'text-lg', gap: 'gap-1.5', padding: 'p-1.5' },
  md: { icon: 22, text: 'text-xl', gap: 'gap-2', padding: 'p-2' },
  lg: { icon: 28, text: 'text-2xl', gap: 'gap-2.5', padding: 'p-2.5' },
};

export function AuthLogo({ size = 'md', className, href = '/' }: AuthLogoProps) {
  const { icon, text, gap, padding } = sizeConfig[size];

  const content = (
    <div className={cn('flex items-center', gap, className)}>
      <div className={cn('rounded-xl bg-primary text-primary-foreground flex items-center justify-center', padding)}>
        <Clock4 size={icon} strokeWidth={2.5} />
      </div>
      <span className={cn('font-bold tracking-tight text-foreground', text)}>
        Time<span className="text-primary">Forge</span>
      </span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="hover:opacity-90 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}
