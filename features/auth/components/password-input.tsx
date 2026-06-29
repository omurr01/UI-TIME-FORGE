'use client';

import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showStrength?: boolean;
}

function getStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { score, label: 'Weak', color: 'bg-destructive' };
  if (score === 3) return { score, label: 'Fair', color: 'bg-warning' };
  if (score === 4) return { score, label: 'Good', color: 'bg-blue-500' };
  return { score, label: 'Strong', color: 'bg-success' };
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showStrength, value, ...props }, ref) => {
    const [show, setShow] = React.useState(false);
    const strength = showStrength ? getStrength(String(value ?? '')) : null;

    return (
      <div className="space-y-2">
        <div className="relative">
          <Input
            ref={ref}
            type={show ? 'text' : 'password'}
            className={cn('pr-10', className)}
            value={value}
            {...props}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full w-10 text-muted-foreground hover:text-foreground hover:bg-transparent"
            onClick={() => setShow((v) => !v)}
            tabIndex={-1}
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        </div>
        {showStrength && strength && strength.score > 0 && (
          <div className="space-y-1">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'h-1 flex-1 rounded-full transition-all duration-300',
                    i < strength.score ? strength.color : 'bg-muted'
                  )}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Password strength:{' '}
              <span
                className={cn(
                  'font-medium',
                  strength.score <= 2 ? 'text-destructive' : '',
                  strength.score === 3 ? 'text-warning' : '',
                  strength.score === 4 ? 'text-blue-500' : '',
                  strength.score === 5 ? 'text-success' : ''
                )}
              >
                {strength.label}
              </span>
            </p>
          </div>
        )}
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';
