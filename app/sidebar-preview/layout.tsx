import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sidebar Preview — TimeForge',
  description: 'Interactive sidebar design preview for all user roles',
};

export default function SidebarPreviewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
