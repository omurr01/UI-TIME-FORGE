import { AuthLogo } from '@/features/auth/components/auth-logo';
import { ThemeToggle } from '@/features/auth/components/theme-toggle';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border/40">
        <AuthLogo size="md" />
        <ThemeToggle />
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">{children}</div>
      </main>

      <footer className="py-4 text-center text-xs text-muted-foreground border-t border-border/40">
        &copy; {new Date().getFullYear()} TimeForge. All rights reserved.
      </footer>
    </div>
  );
}
