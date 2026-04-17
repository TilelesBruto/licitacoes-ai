import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileSearch,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Trophy,
  XCircle,
  ArrowUpRight,
  Clock,
  Inbox,
  ShieldCheck,
  Zap,
  FileCheck2,
  Gavel,
  RefreshCw,
  Activity,
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
  LineChart,
  Line,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Variant = "cobalt" | "emerald" | "warning";

const metrics: {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: typeof FileSearch;
  variant: Variant;
  spark: { v: number }[];
}[] = [
  {
    label: "Licitações de Hoje",
    value: "12",
    change: "+4 novas",
    trend: "up",
    icon: FileSearch,
    variant: "cobalt",
    spark: [4, 6, 5, 7, 8, 6, 12].map((v) => ({ v })),
  },
  {
    label: "Prazos Críticos (24h)",
    value: "3",
    change: "Ação imediata",
    trend: "up",
    icon: AlertTriangle,
    variant: "warning",
    spark: [1, 1, 2, 2, 3, 2, 3].map((v) => ({ v })),
  },
  {
    label: "Valor em Disputa",
    value: "R$ 18,7M",
    change: "+22% vs mês",
    trend: "up",
    icon: DollarSign,
    variant: "cobalt",
    spark: [10, 12, 11, 14, 15, 17, 18.7].map((v) => ({ v })),
  },
  {
    label: "Taxa de Vitórias",
    value: "38%",
    change: "+6pp vs trimestre",
    trend: "up",
    icon: TrendingUp,
    variant: "emerald",
    spark: [28, 30, 29, 32, 34, 36, 38].map((v) => ({ v })),
  },
];

const winLoss12 = [
  { month: "Jul", vitorias: 4, derrotas: 4 },
  { month: "Ago", vitorias: 6, derrotas: 3 },
  { month: "Set", vitorias: 5, derrotas: 4 },
  { month: "Out", vitorias: 7, derrotas: 2 },
  { month: "Nov", vitorias: 6, derrotas: 3 },
  { month: "Dez", vitorias: 8, derrotas: 2 },
  { month: "Jan", vitorias: 5, derrotas: 3 },
  { month: "Fev", vitorias: 7, derrotas: 4 },
  { month: "Mar", vitorias: 4, derrotas: 5 },
  { month: "Abr", vitorias: 8, derrotas: 2 },
  { month: "Mai", vitorias: 6, derrotas: 3 },
  { month: "Jun", vitorias: 9, derrotas: 1 },
];

const portalData = [
  { name: "Compras.gov", value: 42, color: "hsl(215 80% 55%)" },
  { name: "BLL", value: 24, color: "hsl(155 60% 45%)" },
  { name: "BEC SP", value: 18, color: "hsl(40 90% 55%)" },
  { name: "ComprasNet", value: 16, color: "hsl(280 60% 60%)" },
];

const prazos = [
  { id: "PE 90007/2025", orgao: "FNDE", valor: "R$ 2,4M", horas: 8, urgencia: "critica" as const },
  { id: "OC 010101/2025", orgao: "BEC SP", valor: "R$ 890k", horas: 36, urgencia: "alta" as const },
  { id: "PE 12/2025", orgao: "Marinha", valor: "R$ 5,1M", horas: 120, urgencia: "media" as const },
];

const atividades = [
  { icon: FileCheck2, text: "Edital PE 90007/2025 analisado", time: "há 12 min", color: "text-primary" },
  { icon: ShieldCheck, text: "Certidão CND Federal renovada", time: "há 1h", color: "text-accent" },
  { icon: Gavel, text: "Impugnação gerada — OC 010101", time: "há 3h", color: "text-warning" },
  { icon: Trophy, text: "Vitória registrada — PE 88/2024", time: "há 5h", color: "text-accent" },
  { icon: AlertTriangle, text: "Risco alto detectado em PE 45/2025", time: "ontem", color: "text-destructive" },
];

const variantStyles = {
  cobalt: { bg: "bg-primary/10", text: "text-primary", stroke: "hsl(215 80% 55%)" },
  emerald: { bg: "bg-accent/10", text: "text-accent", stroke: "hsl(155 60% 45%)" },
  warning: { bg: "bg-warning/10", text: "text-warning", stroke: "hsl(40 90% 55%)" },
};

const urgenciaStyles = {
  critica: { label: "< 24h", cls: "bg-destructive/15 text-destructive border-destructive/30" },
  alta: { label: "< 72h", cls: "bg-warning/15 text-warning border-warning/30" },
  media: { label: "< 7d", cls: "bg-primary/15 text-primary border-primary/30" },
};

function formatCountdown(h: number) {
  if (h < 24) return `${h}h restantes`;
  const d = Math.floor(h / 24);
  return `${d}d ${h % 24}h`;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [periodo, setPeriodo] = useState<"3" | "6" | "12">("6");

  const sliced = winLoss12.slice(-parseInt(periodo, 10));
  const totalVit = sliced.reduce((a, b) => a + b.vitorias, 0);
  const totalDer = sliced.reduce((a, b) => a + b.derrotas, 0);
  const taxaVit = Math.round((totalVit / (totalVit + totalDer)) * 100);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header + Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Resumo executivo — Detail Licitações
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => navigate("/analisador")} className="gap-2">
            <Zap className="w-4 h-4" /> Analisar Edital
          </Button>
          <Button onClick={() => navigate("/inbox")} variant="secondary" className="gap-2">
            <Inbox className="w-4 h-4" /> Ver Inbox
          </Button>
          <Button onClick={() => navigate("/certidoes")} variant="outline" className="gap-2">
            <ShieldCheck className="w-4 h-4" /> Renovar Certidões
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => {
          const style = variantStyles[m.variant];
          const TrendIcon = m.trend === "up" ? TrendingUp : TrendingDown;
          return (
            <Card
              key={m.label}
              className="group p-5 space-y-3 border-border hover:border-primary/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_hsl(215_80%_55%/0.3)] animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {m.label}
                </span>
                <div
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110",
                    style.bg,
                  )}
                >
                  <m.icon className={cn("w-4 h-4", style.text)} />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold text-foreground">{m.value}</span>
                <p className="text-xs mt-1 flex items-center gap-1">
                  <TrendIcon
                    className={cn(
                      "w-3 h-3",
                      m.trend === "up" ? "text-accent" : "text-destructive",
                    )}
                  />
                  <span className="text-muted-foreground">{m.change}</span>
                </p>
              </div>
              <div className="h-10 -mx-1 -mb-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={m.spark}>
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke={style.stroke}
                      strokeWidth={2}
                      dot={false}
                      isAnimationActive
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Win/Loss */}
        <Card className="lg:col-span-2 p-6 animate-fade-in" style={{ animationDelay: "240ms" }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Vitórias vs Derrotas</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Taxa de vitória: <span className="text-accent font-semibold">{taxaVit}%</span> · {totalVit}V / {totalDer}D
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-accent" /> Vitórias
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-destructive" /> Derrotas
                </span>
              </div>
              <Tabs value={periodo} onValueChange={(v) => setPeriodo(v as "3" | "6" | "12")}>
                <TabsList className="h-8">
                  <TabsTrigger value="3" className="text-xs px-2.5">3M</TabsTrigger>
                  <TabsTrigger value="6" className="text-xs px-2.5">6M</TabsTrigger>
                  <TabsTrigger value="12" className="text-xs px-2.5">12M</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={sliced} barGap={4}>
              <defs>
                <linearGradient id="gradVit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(155 70% 55%)" />
                  <stop offset="100%" stopColor="hsl(155 60% 35%)" />
                </linearGradient>
                <linearGradient id="gradDer" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(0 72% 55%)" />
                  <stop offset="100%" stopColor="hsl(0 70% 38%)" />
                </linearGradient>
              </defs>
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
                cursor={{ fill: "hsl(220 14% 14% / 0.5)" }}
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const v = payload.find((p) => p.dataKey === "vitorias")?.value as number;
                  const d = payload.find((p) => p.dataKey === "derrotas")?.value as number;
                  const t = v + d > 0 ? Math.round((v / (v + d)) * 100) : 0;
                  return (
                    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-lg">
                      <p className="font-semibold text-foreground mb-1">{label}</p>
                      <p className="text-accent">Vitórias: {v}</p>
                      <p className="text-destructive">Derrotas: {d}</p>
                      <p className="text-muted-foreground mt-1 pt-1 border-t border-border">
                        Taxa: <span className="text-foreground font-medium">{t}%</span>
                      </p>
                    </div>
                  );
                }}
              />
              <Bar dataKey="vitorias" radius={[4, 4, 0, 0]} fill="url(#gradVit)" isAnimationActive />
              <Bar dataKey="derrotas" radius={[4, 4, 0, 0]} fill="url(#gradDer)" isAnimationActive />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Portal Distribution */}
        <Card className="p-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground">Distribuição por Portal</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Editais ativos no período</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={portalData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                stroke="hsl(220 18% 10%)"
                strokeWidth={2}
              >
                {portalData.map((p) => (
                  <Cell key={p.name} fill={p.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220 18% 10%)",
                  border: "1px solid hsl(220 14% 18%)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {portalData.map((p) => (
              <div key={p.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: p.color }} />
                  <span className="text-foreground">{p.name}</span>
                </span>
                <span className="text-muted-foreground font-medium">{p.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom row: Prazos + Atividade */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Próximos Prazos */}
        <Card className="p-6 animate-fade-in" style={{ animationDelay: "360ms" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-warning" /> Próximos Prazos
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Atenção imediata necessária</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate("/inbox")} className="gap-1 text-xs">
              Ver todos <ArrowUpRight className="w-3 h-3" />
            </Button>
          </div>
          <div className="space-y-2">
            {prazos.map((p) => {
              const u = urgenciaStyles[p.urgencia];
              return (
                <button
                  key={p.id}
                  onClick={() => navigate("/inbox")}
                  className="w-full text-left flex items-center justify-between gap-3 p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 hover:border-primary/30 transition-all"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{p.id}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {p.orgao} · {p.valor}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge variant="outline" className={cn("text-[10px]", u.cls)}>
                      {u.label}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">{formatCountdown(p.horas)}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Atividade Recente */}
        <Card className="p-6 animate-fade-in" style={{ animationDelay: "420ms" }}>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" /> Atividade Recente
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">Últimos eventos da plataforma</p>
          </div>
          <ol className="relative border-l border-border ml-2 space-y-4">
            {atividades.map((a, i) => (
              <li key={i} className="ml-4">
                <span className="absolute -left-[9px] flex items-center justify-center w-4 h-4 rounded-full bg-card border border-border">
                  <a.icon className={cn("w-2.5 h-2.5", a.color)} />
                </span>
                <p className="text-sm text-foreground">{a.text}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  );
}
