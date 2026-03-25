import { useState } from "react";
import { FileCheck2, Download, CheckSquare, Square, Package, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DocItem {
  id: string;
  category: string;
  label: string;
  description: string;
}

const documents: { category: string; items: DocItem[] }[] = [
  {
    category: "Habilitação Jurídica",
    items: [
      { id: "hj1", category: "juridica", label: "Ato Constitutivo / Contrato Social", description: "Última alteração consolidada e registrada" },
      { id: "hj2", category: "juridica", label: "Documento de Identidade do Representante Legal", description: "RG e CPF ou CNH do sócio/procurador" },
      { id: "hj3", category: "juridica", label: "Procuração (se aplicável)", description: "Com poderes específicos para o certame" },
    ],
  },
  {
    category: "Qualificação Técnica",
    items: [
      { id: "qt1", category: "tecnica", label: "Atestado de Capacidade Técnica", description: "Emitido por pessoa jurídica de direito público ou privado" },
      { id: "qt2", category: "tecnica", label: "Registro no CREA/CAU (se aplicável)", description: "Certidão válida do conselho profissional" },
      { id: "qt3", category: "tecnica", label: "Declaração de Equipe Técnica", description: "Profissionais disponíveis para execução" },
    ],
  },
  {
    category: "Regularidade Fiscal e Trabalhista",
    items: [
      { id: "rf1", category: "fiscal", label: "Certidão Negativa de Débitos Federais", description: "CND conjunta RFB/PGFN" },
      { id: "rf2", category: "fiscal", label: "Certidão de Regularidade do FGTS", description: "CRF emitida pela Caixa" },
      { id: "rf3", category: "fiscal", label: "Certidão Negativa de Débitos Trabalhistas", description: "CNDT emitida pelo TST" },
      { id: "rf4", category: "fiscal", label: "Certidão de Regularidade Estadual", description: "ICMS e tributos estaduais" },
      { id: "rf5", category: "fiscal", label: "Certidão de Regularidade Municipal", description: "ISS e tributos municipais" },
    ],
  },
  {
    category: "Proposta Comercial",
    items: [
      { id: "pc1", category: "proposta", label: "Planilha de Formação de Preços", description: "Composição detalhada de custos" },
      { id: "pc2", category: "proposta", label: "Carta Proposta", description: "Modelo conforme edital, com validade mínima de 60 dias" },
      { id: "pc3", category: "proposta", label: "Declarações Obrigatórias", description: "ME/EPP, inexistência de fatos impeditivos, etc." },
    ],
  },
];

export default function Documentos() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [generating, setGenerating] = useState(false);

  const allIds = documents.flatMap((g) => g.items.map((i) => i.id));
  const allSelected = allIds.every((id) => selected.has(id));

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setSelected(allSelected ? new Set() : new Set(allIds));
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Gerador de Documentos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Selecione os documentos para montar o Kit de Proposta
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={toggleAll}>
            {allSelected ? <CheckSquare className="w-4 h-4 mr-1" /> : <Square className="w-4 h-4 mr-1" />}
            {allSelected ? "Desmarcar todos" : "Selecionar todos"}
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={selected.size === 0 || generating}
            className="gradient-cobalt text-primary-foreground glow-cobalt"
          >
            {generating ? (
              <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Gerando...</>
            ) : (
              <><Package className="w-4 h-4 mr-1" /> Gerar Kit de Proposta ({selected.size})</>
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {documents.map((group) => (
          <div key={group.category}>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-primary" />
              {group.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {group.items.map((doc) => {
                const checked = selected.has(doc.id);
                return (
                  <button
                    key={doc.id}
                    onClick={() => toggle(doc.id)}
                    className={cn(
                      "glass-card p-4 text-left flex items-start gap-3 transition-all",
                      checked ? "border-primary/40 glow-cobalt" : "hover:border-muted-foreground/30"
                    )}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                      checked ? "bg-primary border-primary" : "border-muted-foreground/30"
                    )}>
                      {checked && <CheckSquare className="w-3.5 h-3.5 text-primary-foreground" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{doc.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{doc.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Generated Kit Banner */}
      {generating === false && selected.size > 0 && (
        <div className="glass-card p-4 flex items-center justify-between border-accent/30 glow-emerald">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Download className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Kit de Proposta pronto para download</p>
              <p className="text-xs text-muted-foreground">{selected.size} documentos selecionados</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-accent/30 text-accent hover:bg-accent/10">
            <Download className="w-4 h-4 mr-1" /> Baixar ZIP
          </Button>
        </div>
      )}
    </div>
  );
}
