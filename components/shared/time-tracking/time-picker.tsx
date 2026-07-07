'use client';

import * as React from 'react';
import { Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface TimePickerProps {
  value?: string; // HH:mm format
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export function TimePicker({ value, onChange, className, disabled }: TimePickerProps) {
  return (
    <div className={cn('relative', className)}>
      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="time"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="pl-9"
      />
    </div>
  );
}
