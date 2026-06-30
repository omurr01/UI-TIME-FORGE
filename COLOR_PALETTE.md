# TimeForge — UI Color Palette

> All colors are defined as CSS custom properties (HSL format) in `app/globals.css`.

---

## Light Mode

| Token | HSL Value | Hex Approx | Usage |
|---|---|---|---|
| `--primary` | `214 89% 52%` | `#1a7fe8` | Brand blue, CTAs, active nav |
| `--primary-foreground` | `0 0% 100%` | `#ffffff` | Text on primary |
| `--background` | `210 20% 98%` | `#f7f9fb` | Page background |
| `--foreground` | `215 25% 10%` | `#141d2b` | Primary text |
| `--card` | `0 0% 100%` | `#ffffff` | Card surfaces |
| `--card-foreground` | `215 25% 10%` | `#141d2b` | Text on cards |
| `--popover` | `0 0% 100%` | `#ffffff` | Popovers / dropdowns |
| `--popover-foreground` | `215 25% 10%` | `#141d2b` | Text on popovers |
| `--secondary` | `210 16% 93%` | `#e8edf2` | Secondary backgrounds |
| `--secondary-foreground` | `215 25% 20%` | `#293548` | Text on secondary |
| `--muted` | `210 16% 93%` | `#e8edf2` | Subtle backgrounds |
| `--muted-foreground` | `215 16% 47%` | `#6b7e97` | Secondary / hint text |
| `--accent` | `210 16% 93%` | `#e8edf2` | Hover states |
| `--accent-foreground` | `215 25% 20%` | `#293548` | Text on accent |
| `--destructive` | `0 84% 60%` | `#f03a3a` | Errors, danger |
| `--destructive-foreground` | `0 0% 100%` | `#ffffff` | Text on destructive |
| `--success` | `142 71% 45%` | `#22c55e` | Success states |
| `--success-foreground` | `0 0% 100%` | `#ffffff` | Text on success |
| `--warning` | `38 92% 50%` | `#f59e0b` | Warnings |
| `--warning-foreground` | `0 0% 100%` | `#ffffff` | Text on warning |
| `--border` | `214 20% 88%` | `#d0daea` | Borders, dividers |
| `--input` | `214 20% 88%` | `#d0daea` | Input borders |
| `--ring` | `214 89% 52%` | `#1a7fe8` | Focus rings |
| `--radius` | `0.625rem` | `10px` | Base border radius |

---

## Dark Mode

| Token | HSL Value | Hex Approx | Usage |
|---|---|---|---|
| `--primary` | `214 89% 60%` | `#3d94f0` | Brand blue (brighter) |
| `--primary-foreground` | `0 0% 100%` | `#ffffff` | Text on primary |
| `--background` | `222 47% 7%` | `#080e1a` | Page background |
| `--foreground` | `210 20% 95%` | `#eef2f7` | Primary text |
| `--card` | `222 40% 10%` | `#0f1929` | Card surfaces |
| `--card-foreground` | `210 20% 95%` | `#eef2f7` | Text on cards |
| `--popover` | `222 40% 10%` | `#0f1929` | Popovers / dropdowns |
| `--popover-foreground` | `210 20% 95%` | `#eef2f7` | Text on popovers |
| `--secondary` | `222 35% 15%` | `#172030` | Secondary backgrounds |
| `--secondary-foreground` | `210 20% 85%` | `#c5d1de` | Text on secondary |
| `--muted` | `222 35% 15%` | `#172030` | Subtle backgrounds |
| `--muted-foreground` | `215 16% 55%` | `#7f94ab` | Secondary / hint text |
| `--accent` | `222 35% 15%` | `#172030` | Hover states |
| `--accent-foreground` | `210 20% 85%` | `#c5d1de` | Text on accent |
| `--destructive` | `0 72% 51%` | `#d93535` | Errors, danger |
| `--destructive-foreground` | `0 0% 100%` | `#ffffff` | Text on destructive |
| `--success` | `142 71% 45%` | `#22c55e` | Success states |
| `--success-foreground` | `0 0% 100%` | `#ffffff` | Text on success |
| `--warning` | `38 92% 50%` | `#f59e0b` | Warnings |
| `--warning-foreground` | `0 0% 100%` | `#ffffff` | Text on warning |
| `--border` | `222 30% 18%` | `#1e2d42` | Borders, dividers |
| `--input` | `222 30% 18%` | `#1e2d42` | Input borders |
| `--ring` | `214 89% 60%` | `#3d94f0` | Focus rings |

---

## Chart Colors

| Token | Light HSL | Dark HSL | Color |
|---|---|---|---|
| `--chart-1` | `214 89% 52%` | `214 89% 60%` | Blue |
| `--chart-2` | `142 71% 45%` | `142 71% 45%` | Green |
| `--chart-3` | `38 92% 50%` | `38 92% 50%` | Amber |
| `--chart-4` | `0 84% 60%` | `0 72% 51%` | Red |
| `--chart-5` | `270 60% 60%` | `270 60% 65%` | Purple |

---

## Role Badge Colors

| Role | Background | Text (Light) | Text (Dark) |
|---|---|---|---|
| Employee | `bg-blue-500/10` | `text-blue-600` | `text-blue-400` |
| Supervisor | `bg-purple-500/10` | `text-purple-600` | `text-purple-400` |
| HR & Finance | `bg-amber-500/10` | `text-amber-600` | `text-amber-400` |
| Administrator | `bg-red-500/10` | `text-red-600` | `text-red-400` |

---

## Usage in Code

```tsx
// CSS variable (Tailwind utility)
className="bg-primary text-primary-foreground"
className="text-muted-foreground"
className="border-border"

// CSS variable (inline)
style={{ color: 'hsl(var(--primary))' }}

// Success / warning (manual utilities in globals.css)
className="text-success"
className="bg-warning/10"
className="border-success"
```

> `success` and `warning` are defined as manual utility classes in `globals.css`,
> not as Tailwind config tokens. Use the class names above directly.
