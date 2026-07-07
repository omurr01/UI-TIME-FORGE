'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import type { EmployeeGrowthData } from '@/features/admin/types';

interface Props { data: EmployeeGrowthData[]; loading?: boolean }

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-popover shadow-md px-3 py-2 space-y-1">
      <p className="text-xs font-semibold text-foreground">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="text-xs text-muted-foreground">
          {p.name}: <span className="font-medium text-foreground">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

export function EmployeeGrowthChart({ data, loading }: Props) {
  if (loading) {
    return <div className="h-48 bg-muted/40 animate-pulse rounded-lg" />;
  }
  return (
    <ResponsiveContainer width="100%" height={192}>
      <BarChart data={data} barSize={18} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted) / 0.4)' }} />
        <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
        <Bar dataKey="newHires"   name="New Hires"   fill="hsl(var(--chart-2))" radius={[4,4,0,0]} fillOpacity={0.85} />
        <Bar dataKey="departures" name="Departures"  fill="hsl(var(--chart-4))" radius={[4,4,0,0]} fillOpacity={0.85} />
      </BarChart>
    </ResponsiveContainer>
  );
}
