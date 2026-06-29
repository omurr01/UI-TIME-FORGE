'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MailOpen, Loader2, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { AuthCard } from '@/features/auth/components/auth-card';
import { AuthAlert } from '@/features/auth/components/auth-alert';
import { mockResendVerification } from '@/features/auth/lib/mock-auth';

const DEMO_EMAIL = 'new.user@company.com';

export default function VerifyEmailPage() {
  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [resendCount, setResendCount] = useState(0);

  async function handleResend() {
    if (resendCount >= 3) return;
    setResending(true);
    setResendStatus('idle');

    const result = await mockResendVerification(DEMO_EMAIL);

    setResending(false);
    if (result.success) {
      setResendStatus('success');
      setResendCount((c) => c + 1);
    } else {
      setResendStatus('error');
    }
  }

  return (
    <AuthCard>
      <div className="text-center space-y-5">
        <div className="mx-auto w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
          <MailOpen size={36} className="text-primary" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Verify your email</h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            We&apos;ve sent a verification link to{' '}
            <span className="font-semibold text-foreground">{DEMO_EMAIL}</span>.
            Click the link in the email to activate your account.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm space-y-2 text-left">
          <p className="font-medium text-foreground">What happens next?</p>
          <ol className="space-y-1.5 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center font-semibold">1</span>
              Verify your email address
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center font-semibold">2</span>
              An admin will review your registration
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center font-semibold">3</span>
              You&apos;ll receive an invitation email with your role and access details
            </li>
          </ol>
        </div>

        {resendStatus === 'success' && (
          <AuthAlert variant="success" message="Verification email resent successfully!" />
        )}
        {resendStatus === 'error' && (
          <AuthAlert variant="error" message="Failed to resend email. Please try again." />
        )}

        <div className="space-y-3 pt-2">
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={handleResend}
            disabled={resending || resendCount >= 3}
          >
            {resending ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <RefreshCw size={15} />
            )}
            {resendCount >= 3 ? 'Resend limit reached' : 'Resend verification email'}
          </Button>

          {resendCount >= 3 && (
            <p className="text-xs text-muted-foreground">
              Please contact{' '}
              <a href="mailto:support@timeforge.com" className="text-primary hover:underline">
                support@timeforge.com
              </a>{' '}
              if you continue to have issues.
            </p>
          )}

          <Link
            href="/login"
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
