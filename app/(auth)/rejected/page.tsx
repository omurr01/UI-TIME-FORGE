import Link from 'next/link';
import { XCircle, Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthCard } from '@/features/auth/components/auth-card';

export default function RejectedPage() {
  return (
    <AuthCard>
      <div className="text-center space-y-6">
        <div className="mx-auto w-20 h-20 rounded-2xl bg-destructive/10 flex items-center justify-center">
          <XCircle size={36} className="text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Registration declined</h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            Your registration request was not approved at this time. This may be due to
            incomplete information or access restrictions.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm text-left space-y-3">
          <p className="font-medium text-foreground">Common reasons for rejection:</p>
          <ul className="space-y-2 text-muted-foreground text-xs">
            <li className="flex items-start gap-2">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-muted-foreground flex-shrink-0" />
              The email domain is not associated with a registered organization
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-muted-foreground flex-shrink-0" />
              A duplicate account already exists for this email
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-muted-foreground flex-shrink-0" />
              Required department information was missing or invalid
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-muted-foreground flex-shrink-0" />
              Your organization does not have an active TimeForge subscription
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-left">
          <p className="font-medium text-primary mb-1">Need help?</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            If you believe this is a mistake, please contact your organization&apos;s
            TimeForge administrator or reach out to our support team with your
            registration details.
          </p>
        </div>

        <div className="space-y-3">
          <Button className="w-full gap-2" asChild>
            <a href="mailto:support@timeforge.com">
              <Mail size={15} />
              Contact support team
            </a>
          </Button>
          <Button variant="outline" className="w-full gap-2" asChild>
            <Link href="/register">
              <FileText size={15} />
              Submit a new registration
            </Link>
          </Button>
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
