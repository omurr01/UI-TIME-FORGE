'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { AuthCard, AuthCardHeader } from '@/features/auth/components/auth-card';
import { AuthAlert } from '@/features/auth/components/auth-alert';
import { PasswordInput } from '@/features/auth/components/password-input';
import { mockLogin } from '@/features/auth/lib/mock-auth';
import { loginSchema, type LoginFormData } from '@/features/auth/lib/validation';

const DEMO_CREDENTIALS = [
  { role: 'Employee', email: 'employee@timeforge.com' },
  { role: 'Supervisor', email: 'supervisor@timeforge.com' },
  { role: 'HR/Finance', email: 'hr@timeforge.com' },
  { role: 'Admin', email: 'admin@timeforge.com' },
];

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverErrorCode, setServerErrorCode] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false },
  });

  const password = watch('password');

  async function onSubmit(data: LoginFormData) {
    setServerError(null);
    setServerErrorCode(null);

    const result = await mockLogin(data);

    if (!result.success) {
      setServerError(result.error.message);
      setServerErrorCode(result.error.code);
      return;
    }

    router.push(result.data.redirectPath);
  }

  const errorRedirectMap: Record<string, { href: string; label: string }> = {
    REGISTRATION_PENDING: { href: '/pending-approval', label: 'View approval status' },
    REGISTRATION_REJECTED: { href: '/rejected', label: 'Learn more' },
    EMAIL_NOT_VERIFIED: { href: '/verify-email', label: 'Resend verification email' },
  };

  return (
    <AuthCard>
      <AuthCardHeader
        title="Welcome back"
        description="Sign in to your TimeForge account to continue."
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {serverError && (
          <div className="space-y-2">
            <AuthAlert variant="error" message={serverError} />
            {serverErrorCode && errorRedirectMap[serverErrorCode] && (
              <Link
                href={errorRedirectMap[serverErrorCode].href}
                className="text-sm text-primary hover:underline font-medium"
              >
                {errorRedirectMap[serverErrorCode].label} &rarr;
              </Link>
            )}
          </div>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            value={password ?? ''}
            {...register('password')}
          />
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="rememberMe"
            onCheckedChange={(checked) => setValue('rememberMe', !!checked)}
          />
          <Label htmlFor="rememberMe" className="text-sm font-normal cursor-pointer">
            Keep me signed in for 30 days
          </Label>
        </div>

        <Button type="submit" className="w-full h-11" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-primary hover:underline font-medium">
          Request access
        </Link>
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">
          Demo accounts (password: Password1!)
        </p>
        <div className="grid grid-cols-2 gap-2">
          {DEMO_CREDENTIALS.map(({ role, email }) => (
            <button
              key={role}
              type="button"
              onClick={() => {
                setValue('email', email);
                setValue('password', 'Password1!');
              }}
              className="text-left px-3 py-2 rounded-lg border border-border bg-muted/40 hover:bg-muted hover:border-primary/40 transition-all duration-150 group"
            >
              <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                {role}
              </div>
              <div className="text-xs text-muted-foreground truncate">{email}</div>
            </button>
          ))}
        </div>
      </div>
    </AuthCard>
  );
}
