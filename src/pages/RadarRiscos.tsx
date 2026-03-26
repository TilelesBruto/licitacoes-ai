import {
  AlertTriangle,
  ShieldAlert,
  Scale,
  Building2,
  FileWarning,
  Ban,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RiscoAlerta {
  titulo: string;
  descricao: string;
  fundamentacao: string;
  severidade: "alta" | "media" | "baixa";
  icon: React.ComponentType<{ className?: string }>;
}

const alertas: RiscoAlerta[] = [
  {
    titulo: "Exigência de Marca Específica",
    descricao: "O edital PE 045/2025 exige marca específica de equipamentos sem justificativa técnica, violando o princípio da competitividade.",
    fundamentacao: "Art. 41, I da Lei 14.133/2021 — Acórdão TCU 2.401/2006",
    severidade: "alta",
    icon: Ban,
  },
  {
    titulo: "Capital Social Excessivo",
    descricao: "Exigência de capital social mínimo de 30% do valor estimado do contrato, acima do limite legal de 10%.",
    fundamentacao: "Art. 69, §4° da Lei 14.133/2021 — Súmula TCU 275",
    severidade: "alta",
    icon: Building2,
  },
  {
    titulo: "Prazo de Impugnação Reduzido",
    descricao: "Edital publicado com prazo inferior ao mínimo legal para interposição de impugnação.",
    fundamentacao: "Art. 164, §1° da Lei 14.133/2021",
    severidade: "media",
    icon: FileWarning,
  },
  {
    titulo: "Cláusula de Subcontratação Vedada",
    descricao: "Edital veda completamente a subcontratação sem justificativa, podendo restringir a competitividade.",
    fundamentacao: "Art. 122 da Lei 14.133/2021 — Acórdão TCU 1.045/2019",
    severidade: "media",
    icon: Scale,
  },
  {
    titulo: "Atestado com Quantitativo Desproporcional",
    descricao: "Exigência de atestado de capacidade técnica com 70% do quantitativo licitado.",
    fundamentacao: "Art. 67, §1° da Lei 14.133/2021 — Recomendação: máx. 50%",
    severidade: "alta",
    icon: ShieldAlert,
  },
];

const severidadeConfig = {
  alta: { label: "Alta", border: "border-l-destructive", badge: "bg-destructive/15 text-destructive" },
  media: { label: "Média", border: "border-l-warning", badge: "bg-warning/15 text-warning" },
  baixa: { label: "Baixa", border: "border-l-accent", badge: "bg-accent/15 text-accent" },
};

export default function RadarRiscos() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Radar de Oportunidades & Riscos</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Alertas de cláusulas abusivas com base na jurisprudência do TCU
        </p>
      </div>

      <div className="glass-card p-4 flex items-center gap-3 border-l-4 border-l-primary">
        <AlertTriangle className="w-5 h-5 text-primary shrink-0" />
        <p className="text-sm text-foreground">
          <strong>{alertas.filter(a => a.severidade === "alta").length} alertas de alta severidade</strong> detectados nos editais em análise. Recomenda-se ação imediata.
        </p>
      </div>

      <div className="space-y-4">
        {alertas.map((alerta) => {
          const config = severidadeConfig[alerta.severidade];
          return (
            <div key={alerta.titulo} className={cn("glass-card p-5 border-l-4", config.border)}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <alerta.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-foreground">{alerta.titulo}</h3>
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", config.badge)}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">{alerta.descricao}</p>
                  <p className="text-xs text-primary font-mono">{alerta.fundamentacao}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
