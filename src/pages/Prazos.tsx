import { CalendarClock, AlertCircle, MessageCircleQuestion, Gavel, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Prazo {
  id: string;
  licitacao: string;
  orgao: string;
  tipo: "impugnacao" | "esclarecimento" | "lance";
  data: string;
  diasRestantes: number;
  status: "urgente" | "proximo" | "ok";
}

const prazos: Prazo[] = [
  { id: "1", licitacao: "PE 045/2025", orgao: "Ministério da Saúde", tipo: "impugnacao", data: "26/03/2025", diasRestantes: 1, status: "urgente" },
  { id: "2", licitacao: "PE 038/2025", orgao: "INSS", tipo: "esclarecimento", data: "27/03/2025", diasRestantes: 2, status: "urgente" },
  { id: "3", licitacao: "PE 045/2025", orgao: "Ministério da Saúde", tipo: "lance", data: "28/03/2025", diasRestantes: 3, status: "proximo" },
  { id: "4", licitacao: "PE 041/2025", orgao: "TRF 3ª Região", tipo: "impugnacao", data: "29/03/2025", diasRestantes: 4, status: "proximo" },
  { id: "5", licitacao: "PE 050/2025", orgao: "UNIFESP", tipo: "esclarecimento", data: "30/03/2025", diasRestantes: 5, status: "ok" },
  { id: "6", licitacao: "PE 041/2025", orgao: "TRF 3ª Região", tipo: "lance", data: "01/04/2025", diasRestantes: 7, status: "ok" },
  { id: "7", licitacao: "PE 050/2025", orgao: "UNIFESP", tipo: "lance", data: "03/04/2025", diasRestantes: 9, status: "ok" },
  { id: "8", licitacao: "PE 052/2025", orgao: "Marinha do Brasil", tipo: "impugnacao", data: "04/04/2025", diasRestantes: 10, status: "ok" },
];

const tipoConfig = {
  impugnacao: { label: "Impugnação", icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10" },
  esclarecimento: { label: "Esclarecimento", icon: MessageCircleQuestion, color: "text-warning", bg: "bg-warning/10" },
  lance: { label: "Data do Lance", icon: Gavel, color: "text-primary", bg: "bg-primary/10" },
};

const statusColor = {
  urgente: "border-l-destructive",
  proximo: "border-l-warning",
  ok: "border-l-accent",
};

export default function Prazos() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Gestão de Prazos</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Timeline de prazos críticos — Impugnação, Esclarecimento e Lance
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {Object.entries(tipoConfig).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-2">
            <cfg.icon className={cn("w-4 h-4", cfg.color)} />
            <span className="text-xs text-muted-foreground">{cfg.label}</span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[23px] top-0 bottom-0 w-px bg-border" />

        <div className="space-y-4">
          {prazos.map((p, i) => {
            const cfg = tipoConfig[p.tipo];
            return (
              <div key={p.id} className="relative flex items-start gap-4 animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                {/* Dot */}
                <div className={cn("relative z-10 w-[47px] flex justify-center pt-4")}>
                  <div className={cn(
                    "w-3 h-3 rounded-full border-2",
                    p.status === "urgente" ? "border-destructive bg-destructive/30" :
                    p.status === "proximo" ? "border-warning bg-warning/30" :
                    "border-accent bg-accent/30"
                  )} />
                </div>

                {/* Card */}
                <div className={cn(
                  "flex-1 glass-card p-4 border-l-2 hover:border-primary/30 transition-colors cursor-pointer group",
                  statusColor[p.status]
                )}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", cfg.bg, cfg.color)}>
                        {cfg.label}
                      </span>
                      <span className="text-xs font-mono text-primary">{p.licitacao}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {p.diasRestantes <= 2 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/20 text-destructive font-medium animate-pulse">
                          URGENTE
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <p className="text-sm text-foreground mt-1.5">{p.orgao}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CalendarClock className="w-3 h-3" /> {p.data}
                    </span>
                    <span className={cn(
                      "font-medium",
                      p.diasRestantes <= 2 ? "text-destructive" :
                      p.diasRestantes <= 5 ? "text-warning" : "text-accent"
                    )}>
                      {p.diasRestantes === 1 ? "Amanhã" : `${p.diasRestantes} dias restantes`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
