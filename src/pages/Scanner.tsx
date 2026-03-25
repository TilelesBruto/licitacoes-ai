import { useState, useCallback } from "react";
import {
  Upload,
  FileText,
  ScanSearch,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Scale,
  DollarSign,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type RiskLevel = "green" | "yellow" | "red";

interface AnalysisResult {
  objeto: string;
  valorEstimado: string;
  dataSessao: string;
  criterioJulgamento: string;
  modalidade: string;
  riscos: { label: string; level: RiskLevel; detail: string }[];
  overallRisk: RiskLevel;
}

const mockAnalysis: AnalysisResult = {
  objeto: "Contratação de empresa especializada para prestação de serviços de infraestrutura de TI, incluindo fornecimento de servidores, storage e switches de rede, conforme especificações do Termo de Referência.",
  valorEstimado: "R$ 2.840.000,00",
  dataSessao: "28/03/2025 às 09:00 (Horário de Brasília)",
  criterioJulgamento: "Menor Preço por Item",
  modalidade: "Pregão Eletrônico - Lei 14.133/2021",
  riscos: [
    { label: "Qualificação Técnica", level: "green", detail: "Exigências compatíveis com o objeto" },
    { label: "Garantia Contratual", level: "yellow", detail: "Exigência de 5% do valor - avaliar impacto financeiro" },
    { label: "Prazo de Entrega", level: "green", detail: "30 dias corridos - prazo factível" },
    { label: "Atestado de Capacidade", level: "red", detail: "Exige 50% do quantitativo - possível restrição à competitividade" },
    { label: "Habilitação Fiscal", level: "green", detail: "Documentação padrão exigida" },
    { label: "Amostra/Prova de Conceito", level: "yellow", detail: "POC obrigatória em 15 dias - prazo apertado" },
  ],
  overallRisk: "yellow",
};

const riskIcon = {
  green: CheckCircle2,
  yellow: AlertTriangle,
  red: XCircle,
};

const riskColor = {
  green: "text-accent",
  yellow: "text-warning",
  red: "text-destructive",
};

const riskBg = {
  green: "bg-accent/10 border-accent/20",
  yellow: "bg-warning/10 border-warning/20",
  red: "bg-destructive/10 border-destructive/20",
};

const riskLabel = {
  green: "GO — Baixo Risco",
  yellow: "AVALIAR — Risco Moderado",
  red: "NO GO — Alto Risco",
};

export default function Scanner() {
  const [stage, setStage] = useState<"upload" | "scanning" | "result">("upload");
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFile = useCallback((name: string) => {
    setFileName(name);
    setStage("scanning");
    setTimeout(() => setStage("result"), 3000);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file.name);
    },
    [handleFile]
  );

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file.name);
    },
    [handleFile]
  );

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Scanner de Edital</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Upload do PDF para análise automatizada com IA
        </p>
      </div>

      {stage === "upload" && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={cn(
            "glass-card border-2 border-dashed rounded-xl p-16 flex flex-col items-center justify-center transition-all cursor-pointer",
            dragOver ? "border-primary bg-primary/5 glow-cobalt" : "border-border hover:border-muted-foreground"
          )}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input id="file-input" type="file" accept=".pdf" className="hidden" onChange={handleInput} />
          <Upload className={cn("w-12 h-12 mb-4", dragOver ? "text-primary" : "text-muted-foreground")} />
          <p className="text-sm font-medium text-foreground mb-1">
            Arraste o edital aqui ou clique para selecionar
          </p>
          <p className="text-xs text-muted-foreground">PDF até 50MB — Análise em ~30 segundos</p>
        </div>
      )}

      {stage === "scanning" && (
        <div className="glass-card rounded-xl p-16 flex flex-col items-center justify-center space-y-6">
          <div className="relative w-20 h-24 bg-secondary rounded-lg flex items-center justify-center overflow-hidden">
            <FileText className="w-8 h-8 text-muted-foreground" />
            <div className="absolute inset-x-0 h-0.5 bg-primary animate-scan" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Analisando {fileName}...</p>
            <p className="text-xs text-muted-foreground mt-1">Extraindo cláusulas e identificando riscos</p>
          </div>
          <div className="flex gap-2">
            {["Lendo PDF", "Classificando cláusulas", "Avaliando riscos"].map((step, i) => (
              <span
                key={step}
                className="text-[10px] px-3 py-1 rounded-full bg-secondary text-muted-foreground"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                {step}
              </span>
            ))}
          </div>
        </div>
      )}

      {stage === "result" && (
        <div className="space-y-6 animate-slide-up">
          {/* Overall verdict */}
          <div className={cn("rounded-xl border p-6", riskBg[mockAnalysis.overallRisk])}>
            <div className="flex items-center gap-3 mb-3">
              {(() => { const Icon = riskIcon[mockAnalysis.overallRisk]; return <Icon className={cn("w-6 h-6", riskColor[mockAnalysis.overallRisk])} />; })()}
              <span className={cn("text-lg font-bold", riskColor[mockAnalysis.overallRisk])}>
                {riskLabel[mockAnalysis.overallRisk]}
              </span>
            </div>
            <p className="text-sm text-secondary-foreground">
              Encontramos cláusulas que requerem atenção. Revise os itens em amarelo e vermelho antes de prosseguir.
            </p>
            <div className="flex gap-3 mt-4">
              <Button className="gradient-cobalt text-primary-foreground glow-cobalt">
                <ThumbsUp className="w-4 h-4 mr-1" /> GO — Participar
              </Button>
              <Button variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive/10">
                <ThumbsDown className="w-4 h-4 mr-1" /> NO GO — Descartar
              </Button>
            </div>
          </div>

          {/* Key Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard icon={Target} label="Objeto" value={mockAnalysis.objeto} />
            <InfoCard icon={DollarSign} label="Valor Estimado" value={mockAnalysis.valorEstimado} highlight />
            <InfoCard icon={Clock} label="Data da Sessão" value={mockAnalysis.dataSessao} />
            <InfoCard icon={Scale} label="Critério / Modalidade" value={`${mockAnalysis.criterioJulgamento} • ${mockAnalysis.modalidade}`} />
          </div>

          {/* Risk Semaphore */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Semáforo de Risco — Cláusulas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mockAnalysis.riscos.map((r) => {
                const Icon = riskIcon[r.level];
                return (
                  <div key={r.label} className="glass-card p-4 flex items-start gap-3">
                    <Icon className={cn("w-5 h-5 mt-0.5 shrink-0", riskColor[r.level])} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{r.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{r.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reset */}
          <Button variant="outline" onClick={() => setStage("upload")} className="mt-4">
            <ScanSearch className="w-4 h-4 mr-1" /> Analisar outro edital
          </Button>
        </div>
      )}
    </div>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-primary" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <p className={cn("text-sm leading-relaxed", highlight ? "text-accent font-semibold" : "text-foreground")}>
        {value}
      </p>
    </div>
  );
}
