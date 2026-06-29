'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, ArrowLeft, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthCard, AuthCardHeader } from '@/features/auth/components/auth-card';
import { AuthAlert } from '@/features/auth/components/auth-alert';
import { mockForgotPassword } from '@/features/auth/lib/mock-auth';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/features/auth/lib/validation';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    setServerError(null);

    const result = await mockForgotPassword(data);

    if (!result.success) {
      setServerError('Something went wrong. Please try again.');
      return;
    }

    setSubmittedEmail(data.email);
    setSent(true);
  }

  if (sent) {
    return (
      <AuthCard>
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Mail size={28} className="text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Check your inbox</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We&apos;ve sent a password reset link to{' '}
              <span className="font-medium text-foreground">{submittedEmail}</span>.
              The link expires in 30 minutes.
            </p>
          </div>
          <AuthAlert
            variant="info"
            message="If you don't see the email, check your spam folder."
          />
          <div className="space-y-3 pt-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setSent(false)}
            >
              Resend email
            </Button>
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
            >
              <ArrowLeft size={14} />
              Back to sign in
            </Link>
          </div>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <AuthCardHeader
        title="Reset your password"
        description="Enter your email address and we'll send you a link to reset your password."
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {serverError && <AuthAlert variant="error" message={serverError} />}

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

        <Button type="submit" className="w-full h-11" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Sending reset link...
            </>
          ) : (
            'Send reset link'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          Back to sign in
        </Link>
      </div>
    </AuthCard>
  );
}
