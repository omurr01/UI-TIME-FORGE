'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { BREADCRUMB_LABELS } from '@/lib/nav-config';
import { cn } from '@/lib/utils';

function buildCrumbs(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  const crumbs: Array<{ label: string; href: string; isLast: boolean }> = [];

  let currentPath = '';
  segments.forEach((segment, idx) => {
    currentPath += `/${segment}`;
    const label = BREADCRUMB_LABELS[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1);
    crumbs.push({
      label,
      href: currentPath,
      isLast: idx === segments.length - 1,
    });
  });

  return crumbs;
}

interface BreadcrumbsProps {
  className?: string;
}

export function Breadcrumbs({ className }: BreadcrumbsProps) {
  const pathname = usePathname();
  const crumbs = buildCrumbs(pathname);

  if (crumbs.length <= 1) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-1 text-xs text-muted-foreground', className)}
    >
      <Link
        href="/dashboard"
        className="flex items-center hover:text-foreground transition-colors p-0.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Dashboard home"
      >
        <Home size={12} />
      </Link>
      {crumbs.map((crumb, idx) => (
        <span key={crumb.href} className="flex items-center gap-1">
          <ChevronRight size={11} className="text-border" aria-hidden="true" />
          {crumb.isLast ? (
            <span
              className="font-medium text-foreground truncate max-w-[140px]"
              aria-current="page"
            >
              {crumb.label}
            </span>
          ) : (
            <Link
              href={crumb.href}
              className="hover:text-foreground transition-colors truncate max-w-[120px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
