'use client';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import type { WeeklyProductivityData } from '@/features/admin/types';

interface Props { data: WeeklyProductivityData[]; loading?: boolean }

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-popover shadow-md px-3 py-2">
      <p className="text-xs font-semibold text-foreground mb-1">{label}</p>
      <p className="text-xs text-muted-foreground">
        Productivity: <span className="text-foreground font-medium">{payload[0]?.value}%</span>
      </p>
    </div>
  );
}

export function WeeklyProductivityChart({ data, loading }: Props) {
  if (loading) {
    return <div className="h-48 bg-muted/40 animate-pulse rounded-lg" />;
  }
  return (
    <ResponsiveContainer width="100%" height={192}>
      <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
        <defs>
          <linearGradient id="prodGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="hsl(var(--primary))" stopOpacity={0.2} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}   />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
        <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} domain={[0, 100]} tickCount={6} unit="%" />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1 }} />
        <ReferenceLine y={80} stroke="hsl(var(--primary))" strokeDasharray="4 4" strokeOpacity={0.5} />
        <Area type="monotone" dataKey="productivity" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#prodGradient)" dot={false} activeDot={{ r: 4, fill: 'hsl(var(--primary))' }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
