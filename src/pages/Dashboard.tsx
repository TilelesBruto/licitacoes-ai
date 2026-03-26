import {
  FileSearch,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Trophy,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const metrics = [
  {
    label: "Licitações de Hoje",
    value: "12",
    change: "+4 novas",
    icon: FileSearch,
    variant: "cobalt" as const,
  },
  {
    label: "Prazos Críticos (24h)",
    value: "3",
    change: "Ação imediata",
    icon: AlertTriangle,
    variant: "warning" as const,
  },
  {
    label: "Valor Total em Disputa",
    value: "R$ 18,7M",
    change: "+22% vs mês anterior",
    icon: DollarSign,
    variant: "cobalt" as const,
  },
  {
    label: "Taxa de Vitórias",
    value: "38%",
    change: "+6pp vs trimestre",
    icon: TrendingUp,
    variant: "emerald" as const,
  },
];

const winLossData = [
  { month: "Jan", vitorias: 5, derrotas: 3 },
  { month: "Fev", vitorias: 7, derrotas: 4 },
  { month: "Mar", vitorias: 4, derrotas: 5 },
  { month: "Abr", vitorias: 8, derrotas: 2 },
  { month: "Mai", vitorias: 6, derrotas: 3 },
  { month: "Jun", vitorias: 9, derrotas: 1 },
];

const variantStyles = {
  cobalt: { bg: "bg-primary/10", text: "text-primary" },
  emerald: { bg: "bg-accent/10", text: "text-accent" },
  warning: { bg: "bg-warning/10", text: "text-warning" },
};

export default function Dashboard() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Resumo executivo — Detail Licitações
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const style = variantStyles[m.variant];
          return (
            <div key={m.label} className="glass-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {m.label}
                </span>
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", style.bg)}>
                  <m.icon className={cn("w-4 h-4", style.text)} />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold text-foreground">{m.value}</span>
                <p className="text-xs text-muted-foreground mt-1">{m.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Win/Loss Chart */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Vitórias vs Derrotas</h2>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <Trophy className="w-3 h-3 text-accent" /> Vitórias
            </span>
            <span className="flex items-center gap-1.5">
              <XCircle className="w-3 h-3 text-destructive" /> Derrotas
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={winLossData} barGap={4}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215 12% 50%)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215 12% 50%)", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(220 18% 10%)",
                border: "1px solid hsl(220 14% 18%)",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Bar dataKey="vitorias" radius={[4, 4, 0, 0]}>
              {winLossData.map((_, i) => (
                <Cell key={i} fill="hsl(155 60% 45%)" />
              ))}
            </Bar>
            <Bar dataKey="derrotas" radius={[4, 4, 0, 0]}>
              {winLossData.map((_, i) => (
                <Cell key={i} fill="hsl(0 72% 50%)" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
