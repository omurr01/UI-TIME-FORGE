import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthLogo } from '@/features/auth/components/auth-logo';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal header */}
      <header className="flex items-center px-6 py-4 border-b border-border/40">
        <AuthLogo size="sm" />
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md w-full">
          {/* Large 404 */}
          <div className="relative mb-8">
            <p
              className="text-[10rem] font-black text-muted/40 leading-none select-none"
              aria-hidden="true"
            >
              404
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-2xl bg-card border border-border shadow-sm p-5">
                <Search size={36} className="text-muted-foreground" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Page not found
          </h1>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist, was moved, or you may have
            followed a broken link.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            <Button asChild>
              <Link href="/dashboard">
                <Home size={15} className="mr-1.5" />
                Go to Dashboard
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="javascript:history.back()">
                <ArrowLeft size={15} className="mr-1.5" />
                Go back
              </Link>
            </Button>
          </div>

          <div className="mt-10 pt-8 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              Need help?{' '}
              <Link href="/settings" className="text-primary hover:underline">
                Contact support
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
