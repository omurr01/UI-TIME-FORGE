'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  type TooltipProps,
} from 'recharts';
import { Skeleton } from '@/components/shared/loading-skeleton';
import type { WeeklyProductivityData } from '../../types/admin';

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-md text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name === 'productivity' ? 'Productivity' : 'Target'}: {entry.value}%
        </p>
      ))}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

interface WeeklyProductivityChartProps {
  data: WeeklyProductivityData[];
  loading?: boolean;
}

export function WeeklyProductivityChart({ data, loading }: WeeklyProductivityChartProps) {
  if (loading) return <Skeleton className="h-48 w-full rounded-lg" />;

  return (
    <ResponsiveContainer width="100%" height={192}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="prodGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />

        <XAxis
          dataKey="day"
          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[50, 100]}
          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
        />

        <Tooltip content={<CustomTooltip />} />

        <ReferenceLine
          y={90}
          stroke="hsl(var(--warning))"
          strokeDasharray="4 4"
          strokeWidth={1.5}
          label={{ value: 'Target', position: 'right', fontSize: 10, fill: 'hsl(var(--warning))' }}
        />

        <Area
          type="monotone"
          dataKey="productivity"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          fill="url(#prodGradient)"
          dot={{ r: 3, fill: 'hsl(var(--primary))', strokeWidth: 0 }}
          activeDot={{ r: 5, fill: 'hsl(var(--primary))', strokeWidth: 2, stroke: 'hsl(var(--background))' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
