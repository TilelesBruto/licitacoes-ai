import { ShieldCheck, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CertStatus = "valida" | "vence_breve" | "vencida";

interface Certidao {
  nome: string;
  orgao: string;
  emissao: string;
  validade: string;
  status: CertStatus;
}

const certidoes: Certidao[] = [
  { nome: "CND Federal", orgao: "Receita Federal / PGFN", emissao: "15/01/2026", validade: "15/07/2026", status: "valida" },
  { nome: "CND Estadual", orgao: "Secretaria da Fazenda - SP", emissao: "10/02/2026", validade: "10/08/2026", status: "valida" },
  { nome: "CND Municipal", orgao: "Prefeitura de São Paulo", emissao: "01/03/2026", validade: "28/03/2026", status: "vence_breve" },
  { nome: "CRF - FGTS", orgao: "Caixa Econômica Federal", emissao: "20/02/2026", validade: "20/03/2026", status: "vence_breve" },
  { nome: "CNDT - Trabalhista", orgao: "TST - Tribunal Superior do Trabalho", emissao: "05/01/2026", validade: "05/03/2026", status: "vencida" },
];

const statusConfig = {
  valida: { label: "Válida", bg: "bg-accent/15 text-accent border-accent/20" },
  vence_breve: { label: "Vence em 7 dias", bg: "bg-warning/15 text-warning border-warning/20" },
  vencida: { label: "Vencida", bg: "bg-destructive/15 text-destructive border-destructive/20" },
};

export default function Certidoes() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Minhas Certidões</h1>
          <p className="text-sm text-muted-foreground mt-1">Gerenciamento de compliance documental</p>
        </div>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" /> Atualizar Todas
        </Button>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Certidão</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Órgão Emissor</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Emissão</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Validade</th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Status</th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {certidoes.map((c) => {
              const st = statusConfig[c.status];
              return (
                <tr key={c.nome} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className={cn("w-4 h-4", c.status === "valida" ? "text-accent" : c.status === "vence_breve" ? "text-warning" : "text-destructive")} />
                      <span className="text-sm font-medium text-foreground">{c.nome}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{c.orgao}</td>
                  <td className="px-6 py-4 text-sm text-foreground font-mono text-xs">{c.emissao}</td>
                  <td className="px-6 py-4 text-sm text-foreground font-mono text-xs">{c.validade}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={cn("text-[11px] px-3 py-1 rounded-full font-medium border", st.bg)}>
                      {st.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
