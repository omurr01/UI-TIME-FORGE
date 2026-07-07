'use client';

import * as React from 'react';
import { Timer } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface DurationSelectorProps {
  minutes: number;
  onChange: (minutes: number) => void;
  className?: string;
  disabled?: boolean;
}

export function DurationSelector({ minutes, onChange, className, disabled }: DurationSelectorProps) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0;
    onChange(val * 60 + mins);
  };

  const handleMinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value) || 0;
    if (val > 59) val = 59;
    onChange(hours * 60 + val);
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative w-24">
        <Input
          type="number"
          min="0"
          value={hours}
          onChange={handleHoursChange}
          disabled={disabled}
          className="pl-8 text-right pr-6"
        />
        <Timer className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium">h</span>
      </div>
      <span className="text-muted-foreground font-bold">:</span>
      <div className="relative w-20">
        <Input
          type="number"
          min="0"
          max="59"
          value={mins}
          onChange={handleMinsChange}
          disabled={disabled}
          className="text-right pr-6"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium">m</span>
      </div>
    </div>
  );
}
