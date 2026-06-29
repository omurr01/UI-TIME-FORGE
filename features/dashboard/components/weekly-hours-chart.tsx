'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { WeeklyHoursData } from '../types';

interface WeeklyHoursChartProps {
  data: WeeklyHoursData[];
  loading?: boolean;
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const hours = payload[0]?.value ?? 0;
  const target = payload[0]?.payload?.target ?? 8;
  return (
    <div className="rounded-lg border border-border bg-popover shadow-md px-3 py-2">
      <p className="text-xs font-semibold text-foreground mb-1">{label}</p>
      <p className="text-xs text-muted-foreground">
        Logged:{' '}
        <span className="text-foreground font-medium">{hours}h</span>
      </p>
      {target > 0 && (
        <p className="text-xs text-muted-foreground">
          Target:{' '}
          <span className="text-foreground font-medium">{target}h</span>
        </p>
      )}
    </div>
  );
}

export function WeeklyHoursChart({ data, loading }: WeeklyHoursChartProps) {
  if (loading) {
    return (
      <div className="h-48 flex items-end gap-2 px-2 animate-pulse">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-muted rounded-sm"
            style={{ height: `${20 + Math.random() * 60}%` }}
          />
        ))}
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={192}>
      <BarChart data={data} barSize={28} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="hsl(var(--border))"
        />
        <XAxis
          dataKey="day"
          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
          axisLine={false}
          tickLine={false}
          domain={[0, 10]}
          tickCount={6}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted) / 0.5)' }} />
        <ReferenceLine
          y={8}
          stroke="hsl(var(--primary))"
          strokeDasharray="4 4"
          strokeOpacity={0.5}
          label={{ value: '8h', position: 'right', fontSize: 10, fill: 'hsl(var(--primary))' }}
        />
        <Bar
          dataKey="hours"
          fill="hsl(var(--primary))"
          radius={[4, 4, 0, 0]}
          fillOpacity={0.85}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
