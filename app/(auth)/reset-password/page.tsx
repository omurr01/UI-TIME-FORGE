'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, ShieldCheck, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { AuthCard, AuthCardHeader } from '@/features/auth/components/auth-card';
import { AuthAlert } from '@/features/auth/components/auth-alert';
import { PasswordInput } from '@/features/auth/components/password-input';
import { mockResetPassword } from '@/features/auth/lib/mock-auth';
import { resetPasswordSchema, type ResetPasswordFormData } from '@/features/auth/lib/validation';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  async function onSubmit(data: ResetPasswordFormData) {
    setServerError(null);

    const result = await mockResetPassword({ ...data, token });

    if (!result.success) {
      setServerError(result.error.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push('/login'), 3000);
  }

  if (!token) {
    return (
      <AuthCard>
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center">
            <AlertCircle size={28} className="text-destructive" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Invalid link</h1>
            <p className="text-sm text-muted-foreground">
              This password reset link is invalid or missing required information.
            </p>
          </div>
          <Button asChild className="w-full">
            <Link href="/forgot-password">Request a new link</Link>
          </Button>
        </div>
      </AuthCard>
    );
  }

  if (success) {
    return (
      <AuthCard>
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center">
            <ShieldCheck size={28} className="text-success" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Password updated</h1>
            <p className="text-sm text-muted-foreground">
              Your password has been reset successfully. You&apos;ll be redirected
              to sign in shortly.
            </p>
          </div>
          <AuthAlert variant="success" message="Redirecting you to the sign in page..." />
          <Button asChild className="w-full">
            <Link href="/login">Sign in now</Link>
          </Button>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <AuthCardHeader
        title="Set new password"
        description="Choose a strong password for your TimeForge account."
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {serverError && (
          <div className="space-y-3">
            <AuthAlert variant="error" message={serverError} />
            <Button variant="outline" size="sm" asChild>
              <Link href="/forgot-password">Request a new reset link</Link>
            </Button>
          </div>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="password">New password</Label>
          <PasswordInput
            id="password"
            placeholder="Enter your new password"
            autoComplete="new-password"
            showStrength
            aria-invalid={!!errors.password}
            value={password ?? ''}
            {...register('password')}
          />
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm new password</Label>
          <PasswordInput
            id="confirmPassword"
            placeholder="Repeat your new password"
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword}
            value={confirmPassword ?? ''}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="rounded-lg bg-muted/50 border border-border p-3 space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Password requirements:</p>
          <ul className="text-xs text-muted-foreground space-y-0.5">
            <PasswordRequirement met={password?.length >= 8} label="At least 8 characters" />
            <PasswordRequirement met={/[A-Z]/.test(password ?? '')} label="One uppercase letter" />
            <PasswordRequirement met={/[a-z]/.test(password ?? '')} label="One lowercase letter" />
            <PasswordRequirement met={/[0-9]/.test(password ?? '')} label="One number" />
            <PasswordRequirement met={/[^A-Za-z0-9]/.test(password ?? '')} label="One special character" />
          </ul>
        </div>

        <Button type="submit" className="w-full h-11" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Updating password...
            </>
          ) : (
            'Update password'
          )}
        </Button>
      </form>
    </AuthCard>
  );
}

function PasswordRequirement({ met, label }: { met: boolean; label: string }) {
  return (
    <li className={`flex items-center gap-1.5 transition-colors ${met ? 'text-success' : ''}`}>
      <span className={`inline-block w-1 h-1 rounded-full ${met ? 'bg-success' : 'bg-muted-foreground'}`} />
      {label}
    </li>
  );
}
