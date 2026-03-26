import { useState } from "react";
import {
  Inbox as InboxIcon,
  Clock,
  Building2,
  ArrowUpRight,
  Star,
  StarOff,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Edital {
  id: string;
  org: string;
  object: string;
  value: string;
  deadline: string;
  modalidade: string;
  status: "novo" | "lido" | "favorito";
  risk: "green" | "yellow" | "red";
}

const editais: Edital[] = [
  { id: "PE 045/2025", org: "Ministério da Saúde", object: "Aquisição de equipamentos de TI - Servidores e Storage", value: "R$ 2.800.000", deadline: "28 Mar 2025", modalidade: "Pregão Eletrônico", status: "novo", risk: "green" },
  { id: "PE 038/2025", org: "INSS - Superintendência Regional", object: "Contratação de serviços de limpeza e conservação", value: "R$ 1.450.000", deadline: "30 Mar 2025", modalidade: "Pregão Eletrônico", status: "novo", risk: "yellow" },
  { id: "PE 041/2025", org: "TRF - 3ª Região", object: "Fornecimento de mobiliário corporativo", value: "R$ 890.000", deadline: "01 Abr 2025", modalidade: "Pregão Eletrônico", status: "lido", risk: "green" },
  { id: "CC 012/2025", org: "Universidade Federal de SP", object: "Serviços de desenvolvimento de software", value: "R$ 3.200.000", deadline: "03 Abr 2025", modalidade: "Concorrência", status: "favorito", risk: "red" },
  { id: "PE 052/2025", org: "Marinha do Brasil", object: "Material de expediente e suprimentos de informática", value: "R$ 420.000", deadline: "05 Abr 2025", modalidade: "Pregão Eletrônico", status: "lido", risk: "green" },
];

const riskColors = {
  green: "bg-accent/20 text-accent",
  yellow: "bg-warning/20 text-warning",
  red: "bg-destructive/20 text-destructive",
};

const riskLabels = { green: "Baixo", yellow: "Médio", red: "Alto" };

export default function Inbox() {
  const [items, setItems] = useState(editais);

  const toggleFav = (id: string) => {
    setItems(prev => prev.map(e =>
      e.id === id ? { ...e, status: e.status === "favorito" ? "lido" : "favorito" } : e
    ));
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Inbox de Editais</h1>
          <p className="text-sm text-muted-foreground mt-1">Editais recebidos filtrados por palavras-chave</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" /> Filtros
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((e) => (
          <div
            key={e.id}
            className={cn(
              "glass-card p-4 flex items-start gap-4 hover:border-primary/30 transition-colors cursor-pointer group",
              e.status === "novo" && "border-l-2 border-l-primary"
            )}
          >
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              {e.status === "novo" ? (
                <InboxIcon className="w-4 h-4 text-primary" />
              ) : (
                <Building2 className="w-4 h-4 text-muted-foreground" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-primary">{e.id}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-secondary text-secondary-foreground">{e.modalidade}</span>
                <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", riskColors[e.risk])}>
                  Risco {riskLabels[e.risk]}
                </span>
              </div>
              <p className="text-sm font-medium text-foreground truncate">{e.object}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{e.org}</p>
            </div>

            <div className="text-right shrink-0 space-y-1">
              <p className="text-sm font-semibold text-foreground">{e.value}</p>
              <div className="flex items-center gap-1 text-muted-foreground justify-end">
                <Clock className="w-3 h-3" />
                <span className="text-xs">{e.deadline}</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 shrink-0">
              <button onClick={() => toggleFav(e.id)} className="text-muted-foreground hover:text-warning transition-colors">
                {e.status === "favorito" ? <Star className="w-4 h-4 text-warning fill-warning" /> : <StarOff className="w-4 h-4" />}
              </button>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
