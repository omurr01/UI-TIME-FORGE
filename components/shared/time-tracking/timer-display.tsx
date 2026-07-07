'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TimerDisplayProps {
  hours: string;
  minutes: string;
  seconds: string;
  isRunning: boolean;
  isBreak?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function TimerDisplay({
  hours,
  minutes,
  seconds,
  isRunning,
  isBreak = false,
  className,
  size = 'lg',
}: TimerDisplayProps) {
  const sizeClasses = {
    sm: 'text-2xl font-semibold space-x-1',
    md: 'text-4xl font-bold space-x-1.5',
    lg: 'text-6xl font-extrabold tracking-tight space-x-2',
    xl: 'text-7xl md:text-8xl font-black tracking-tighter space-x-2 md:space-x-4',
  };

  const separatorClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
    xl: 'text-6xl md:text-7xl',
  };

  // Color logic
  let colorClass = 'text-muted-foreground';
  if (isRunning) {
    if (isBreak) colorClass = 'text-warning';
    else colorClass = 'text-success';
  }

  const Digit = ({ value }: { value: string }) => (
    <span className="tabular-nums font-mono bg-card/50 shadow-inner rounded-md px-1 py-0.5">
      {value}
    </span>
  );

  return (
    <div className={cn('flex items-center justify-center', colorClass, sizeClasses[size], className)}>
      <Digit value={hours} />
      <motion.span 
        animate={{ opacity: isRunning ? [1, 0.5, 1] : 1 }}
        transition={{ repeat: isRunning ? Infinity : 0, duration: 1, ease: 'linear' }}
        className={cn('font-sans -translate-y-[5%]', separatorClasses[size])}
      >
        :
      </motion.span>
      <Digit value={minutes} />
      <motion.span 
        animate={{ opacity: isRunning ? [1, 0.5, 1] : 1 }}
        transition={{ repeat: isRunning ? Infinity : 0, duration: 1, ease: 'linear' }}
        className={cn('font-sans -translate-y-[5%]', separatorClasses[size])}
      >
        :
      </motion.span>
      <Digit value={seconds} />
    </div>
  );
}
