import {
  FileSearch,
  Gavel,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const metrics = [
  {
    label: "Licitações em Análise",
    value: "24",
    change: "+3 hoje",
    icon: FileSearch,
    variant: "cobalt" as const,
  },
  {
    label: "Próximos Pregões",
    value: "8",
    change: "Próximos 7 dias",
    icon: Gavel,
    variant: "emerald" as const,
  },
  {
    label: "Valor Total em Disputa",
    value: "R$ 12,4M",
    change: "+18% vs mês anterior",
    icon: DollarSign,
    variant: "cobalt" as const,
  },
  {
    label: "Taxa de Conversão",
    value: "34%",
    change: "+5pp vs trimestre",
    icon: TrendingUp,
    variant: "emerald" as const,
  },
];

const opportunities = [
  {
    id: "PE 045/2025",
    org: "Ministério da Saúde",
    object: "Aquisição de equipamentos de TI - Servidores e Storage",
    value: "R$ 2.800.000",
    deadline: "28 Mar 2025",
    risk: "green" as const,
    keywords: ["TI", "Servidores"],
  },
  {
    id: "PE 038/2025",
    org: "INSS - Superintendência Regional",
    object: "Contratação de serviços de limpeza e conservação",
    value: "R$ 1.450.000",
    deadline: "30 Mar 2025",
    risk: "yellow" as const,
    keywords: ["Serviços", "Limpeza"],
  },
  {
    id: "PE 041/2025",
    org: "Tribunal Regional Federal - 3ª Região",
    object: "Fornecimento de mobiliário corporativo",
    value: "R$ 890.000",
    deadline: "01 Abr 2025",
    risk: "green" as const,
    keywords: ["Mobiliário", "Corporativo"],
  },
  {
    id: "PE 050/2025",
    org: "Universidade Federal de São Paulo",
    object: "Serviços de desenvolvimento de software sob demanda",
    value: "R$ 3.200.000",
    deadline: "03 Abr 2025",
    risk: "red" as const,
    keywords: ["Software", "Desenvolvimento"],
  },
  {
    id: "PE 052/2025",
    org: "Marinha do Brasil",
    object: "Material de expediente e suprimentos de informática",
    value: "R$ 420.000",
    deadline: "05 Abr 2025",
    risk: "green" as const,
    keywords: ["Suprimentos", "Informática"],
  },
];

const riskColors = {
  green: "bg-accent/20 text-accent",
  yellow: "bg-warning/20 text-warning",
  red: "bg-destructive/20 text-destructive",
};

const riskLabels = {
  green: "Baixo Risco",
  yellow: "Atenção",
  red: "Alto Risco",
};

export default function Dashboard() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Visão geral das licitações — Lei 14.133/2021
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="glass-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {m.label}
              </span>
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  m.variant === "cobalt" ? "bg-primary/10" : "bg-accent/10"
                )}
              >
                <m.icon
                  className={cn(
                    "w-4 h-4",
                    m.variant === "cobalt" ? "text-primary" : "text-accent"
                  )}
                />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">{m.value}</span>
              <p className="text-xs text-muted-foreground mt-1">{m.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Opportunities Feed */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Últimas Oportunidades</h2>
          <span className="text-xs text-muted-foreground">Filtradas por palavras-chave</span>
        </div>

        <div className="space-y-3">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className="glass-card p-4 flex items-start gap-4 hover:border-primary/30 transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4 text-muted-foreground" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-primary">{opp.id}</span>
                  <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", riskColors[opp.risk])}>
                    {riskLabels[opp.risk]}
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground truncate">{opp.object}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{opp.org}</p>
                <div className="flex gap-1.5 mt-2">
                  {opp.keywords.map((kw) => (
                    <span key={kw} className="text-[10px] px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-foreground">{opp.value}</p>
                <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">{opp.deadline}</span>
                </div>
              </div>

              <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
