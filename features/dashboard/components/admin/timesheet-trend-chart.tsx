'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  type TooltipProps,
} from 'recharts';
import { Skeleton } from '@/components/shared/loading-skeleton';
import type { TimesheetTrendData } from '../../types/admin';

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  const labelMap: Record<string, string> = {
    submitted: 'Submitted',
    approved: 'Approved',
    pending: 'Pending',
  };

  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-md text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {labelMap[entry.name as string] ?? entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

interface TimesheetTrendChartProps {
  data: TimesheetTrendData[];
  loading?: boolean;
}

export function TimesheetTrendChart({ data, loading }: TimesheetTrendChartProps) {
  if (loading) return <Skeleton className="h-48 w-full rounded-lg" />;

  return (
    <ResponsiveContainer width="100%" height={192}>
      <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />

        <XAxis
          dataKey="week"
          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip content={<CustomTooltip />} />

        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 11 }}
        />

        <Line
          type="monotone"
          dataKey="submitted"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          dot={{ r: 3, strokeWidth: 0, fill: 'hsl(var(--chart-1))' }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="approved"
          stroke="hsl(var(--chart-2))"
          strokeWidth={2}
          dot={{ r: 3, strokeWidth: 0, fill: 'hsl(var(--chart-2))' }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="pending"
          stroke="hsl(var(--chart-3))"
          strokeWidth={2}
          dot={{ r: 3, strokeWidth: 0, fill: 'hsl(var(--chart-3))' }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
