import { useState } from "react";
import {
  Inbox as InboxIcon,
  Clock,
  Building2,
  Star,
  StarOff,
  X,
  Globe,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Portal = "todos" | "comprasgov" | "bll" | "comprassp";

interface Edital {
  id: string;
  org: string;
  object: string;
  value: string;
  deadline: string;
  modalidade: string;
  status: "novo" | "lido" | "favorito";
  risk: "green" | "yellow" | "red";
  portal: Portal;
  url: string;
}

const portals: { key: Portal; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "comprasgov", label: "Compras.gov" },
  { key: "bll", label: "BLL" },
  { key: "comprassp", label: "ComprasSP" },
];

const portalBadge: Record<string, string> = {
  comprasgov: "bg-primary/15 text-primary",
  bll: "bg-accent/15 text-accent",
  comprassp: "bg-warning/15 text-warning",
};

const portalLabel: Record<string, string> = {
  comprasgov: "Compras.gov",
  bll: "BLL",
  comprassp: "ComprasSP",
};

const editais: Edital[] = [
  {
    id: "PE 90007/2025",
    org: "FNDE",
    object: "Registro de preço nacional para aquisição de dispositivos de tecnologia da informação para uso educacional",
    value: "R$ 2.800.000",
    deadline: "28 Mar 2025",
    modalidade: "Pregão Eletrônico",
    status: "novo",
    risk: "green",
    portal: "comprasgov",
    url: "https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/acoes/compras-governamentais/licitacoes/pregao-para-registro-de-preco-nacional/2025/pregao-eletronico-no-90007-2025-registro-de-preco-nacional-para-aquisicao-de-dispositivos-de-tecnologia-da-informacao-para-uso-educacional",
  },
  {
    id: "PE 90151/2025",
    org: "INSS - Administração Central",
    object: "Locação de sistema integrado de vigilância eletrônica, equipamentos e softwares",
    value: "R$ 1.450.000",
    deadline: "30 Mar 2025",
    modalidade: "Pregão Eletrônico",
    status: "novo",
    risk: "yellow",
    portal: "comprasgov",
    url: "https://www.gov.br/inss/pt-br/acesso-a-informacao/licitacoes-e-contratos/licitacoes-administracao-central-em-brasilia-df/pregao-eletronico/2025/pregao-eletronico-no-90151-2025",
  },
  {
    id: "SPE 036/2025",
    org: "Fundação de Apoio à Pesquisa e à Extensão",
    object: "Processo público com documentos, mensagens e impugnações no portal BLL Compras",
    value: "R$ 890.000",
    deadline: "01 Abr 2025",
    modalidade: "Pregão Eletrônico",
    status: "lido",
    risk: "green",
    portal: "bll",
    url: "https://bllcompras.com/Process/ProcessView?param1=%5Bgkz%5Dlgl5maJ3xIDLH55O6ax0AqIoeNcVuZhXcau3U_qD_IfGGTIP57UXuKExpLgg7zhDuhrSJSh7vQgbGIwo1jiN0C2ocgRAYReit6Nxu_o8LEw%3D",
  },
  {
    id: "OC 010101000012015OC00029",
    org: "Assembleia Legislativa de SP",
    object: "Oferta de compra com itens negociados pelo valor total no portal BEC",
    value: "R$ 3.200.000",
    deadline: "03 Abr 2025",
    modalidade: "Pregão Eletrônico",
    status: "favorito",
    risk: "red",
    portal: "comprassp",
    url: "https://www.bec.sp.gov.br/bec_pregao_UI/OC/Pregao_OC_Item.aspx?OC=010101000012015OC00029&chave=",
  },
  {
    id: "PE 90002/2025",
    org: "Pagadoria de Pessoal da Marinha",
    object: "Serviço de TIC para desenvolvimento, manutenção e sustentação de software para o SISPAG",
    value: "R$ 420.000",
    deadline: "05 Abr 2025",
    modalidade: "Pregão Eletrônico",
    status: "lido",
    risk: "green",
    portal: "comprasgov",
    url: "https://comprasnet.gov.br/ConsultaLicitacoes/download/download_editais_detalhe.asp?coduasg=773202&modprp=5&numprp=900022025",
  },
  {
    id: "PESRP011-25",
    org: "Consórcio Público Interfederativo de Saúde do Extremo Sul da Bahia",
    object: "Processo público com informações, lotes e documentos no portal BLL Compras",
    value: "R$ 780.000",
    deadline: "07 Abr 2025",
    modalidade: "Pregão Eletrônico",
    status: "novo",
    risk: "yellow",
    portal: "bll",
    url: "https://bllcompras.com/Process/ProcessView?param1=%5Bgkz%5DjeWgKZZY1jIVQzz_MZLZrC4X2X03Fl6H6c6Kw8tv0jhucnl0iKSnYwtVZ22m1aS712_i2gUQVZJdkDJaB05Mc1Hbz_m2tpYidtw42ItMBs4%3D",
  },
  {
    id: "OC 102128100582023OC00111",
    org: "Secretaria de Desenvolvimento Econômico - SP",
    object: "Oferta de compra com itens negociados pelo valor total no portal BEC",
    value: "R$ 5.100.000",
    deadline: "10 Abr 2025",
    modalidade: "Pregão Eletrônico",
    status: "novo",
    risk: "green",
    portal: "comprassp",
    url: "https://www.bec.sp.gov.br/bec_pregao_UI/OC/Pregao_OC_Item.aspx?OC=102128100582023OC00111&a=10211&chave=",
  },
];

const riskColors = {
  green: "bg-accent/20 text-accent",
  yellow: "bg-warning/20 text-warning",
  red: "bg-destructive/20 text-destructive",
};

const riskLabels = { green: "Baixo", yellow: "Médio", red: "Alto" };

export default function Inbox() {
  const [items, setItems] = useState(editais);
  const [activePortal, setActivePortal] = useState<Portal>("todos");

  const toggleFav = (id: string) => {
    setItems(prev => prev.map(e =>
      e.id === id ? { ...e, status: e.status === "favorito" ? "lido" : "favorito" } : e
    ));
  };

  const filtered = activePortal === "todos" ? items : items.filter(e => e.portal === activePortal);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Inbox de Editais</h1>
          <p className="text-sm text-muted-foreground mt-1">Editais recebidos filtrados por palavras-chave</p>
        </div>
      </div>

      {/* Portal Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <Globe className="w-4 h-4 text-muted-foreground mr-1" />
        {portals.map((p) => (
          <button
            key={p.key}
            onClick={() => setActivePortal(p.key)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
              activePortal === p.key
                ? "bg-primary/15 text-primary border-primary/30"
                : "bg-secondary text-muted-foreground border-border hover:text-foreground hover:border-muted-foreground"
            )}
          >
            {p.label}
          </button>
        ))}
        {activePortal !== "todos" && (
          <button
            onClick={() => setActivePortal("todos")}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 ml-1"
          >
            <X className="w-3 h-3" /> Limpar
          </button>
        )}
        <span className="text-xs text-muted-foreground ml-auto">
          {filtered.length} edital(is)
        </span>
      </div>

      <div className="space-y-3">
        {filtered.map((e) => (
          <div
            key={e.id}
            onClick={() => window.open(e.url, "_blank", "noopener,noreferrer")}
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
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-xs font-mono text-primary">{e.id}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-secondary text-secondary-foreground">{e.modalidade}</span>
                <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", riskColors[e.risk])}>
                  Risco {riskLabels[e.risk]}
                </span>
                <span className={cn("text-[10px] px-2 py-0.5 rounded font-medium", portalBadge[e.portal])}>
                  {portalLabel[e.portal]}
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
              <TooltipProvider delayDuration={150}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={(ev) => { ev.stopPropagation(); toggleFav(e.id); }}
                      className="text-muted-foreground hover:text-warning transition-colors"
                      aria-label="Favoritar edital"
                    >
                      {e.status === "favorito" ? <Star className="w-4 h-4 text-warning fill-warning" /> : <StarOff className="w-4 h-4" />}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="left">{e.status === "favorito" ? "Remover dos favoritos" : "Favoritar"}</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      onClick={(ev) => { ev.stopPropagation(); window.open(e.url, "_blank", "noopener,noreferrer"); }}
                      className="h-8 px-2.5 gap-1.5 bg-accent/15 text-accent hover:bg-accent/25 border border-accent/30"
                      variant="ghost"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium">Participar</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">Abrir no portal {portalLabel[e.portal]}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
