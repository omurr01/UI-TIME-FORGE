import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { TeamMember } from '../types';

const statusConfig: Record<
  TeamMember['status'],
  { label: string; dot: string }
> = {
  online: { label: 'Online', dot: 'bg-success' },
  away: { label: 'Away', dot: 'bg-warning' },
  offline: { label: 'Offline', dot: 'bg-muted-foreground' },
};

interface TeamStatusProps {
  members: TeamMember[];
  loading?: boolean;
}

export function TeamStatus({ members, loading }: TeamStatusProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 animate-pulse">
            <div className="h-8 w-8 rounded-full bg-muted shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3.5 w-28 bg-muted rounded" />
              <div className="h-3 w-20 bg-muted rounded" />
            </div>
            <div className="h-5 w-14 bg-muted rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {members.map((member) => {
        const status = statusConfig[member.status];
        return (
          <div
            key={member.id}
            className="flex items-center gap-3 py-2 rounded-lg px-2 hover:bg-muted/40 transition-colors"
          >
            <div className="relative shrink-0">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs font-semibold bg-secondary text-secondary-foreground">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              <span
                className={cn(
                  'absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card',
                  status.dot
                )}
                aria-label={status.label}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
              <p className="text-xs text-muted-foreground truncate">{member.role}</p>
            </div>
            <div className="shrink-0 text-right">
              {member.clockedIn ? (
                <span className="text-xs font-medium text-success">
                  {member.hoursToday}h
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">—</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
